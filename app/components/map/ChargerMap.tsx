'use client';

import { useEffect, useRef } from 'react';

// Import mapboxgl dynamically to avoid SSR issues in Next.js
let mapboxgl;
if (typeof window !== 'undefined') {
  mapboxgl = require('mapbox-gl');
}

export default function MapBox({ 
  chargers = [],
  selectedCharger = null,
  onChargerSelect = (id) => {}
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;
    
    // Import mapbox CSS
    require('mapbox-gl/dist/mapbox-gl.css');
    
    // Setup map only once
    if (!map.current && mapContainer.current) {
      // Set access token
      mapboxgl.accessToken = '';
      
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [chargers[0]?.lng || -74.5, chargers[0]?.lat || 40],
        zoom: 9
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
    
    // Return cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || typeof window === 'undefined') return;
    
    // Wait for map to load before adding markers
    const handleMapLoad = () => {
      // Clear any existing markers
      Object.values(markers.current).forEach(marker => marker.remove());
      markers.current = {};
      
      // Add markers for each charger
      chargers.forEach(charger => {
        // Create marker element
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.background = charger.status === 'Available' ? '#10B981' : '#F97316';
        el.style.border = selectedCharger === charger.id ? '3px solid #3B82F6' : '1px solid white';
        el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        
        // Create mapbox marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([charger.lng, charger.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <strong>${charger.name}</strong><br>
                ${charger.status} - ${charger.type}<br>
                ${charger.price} $CHARGE/kWh
              `)
          )
          .addTo(map.current);
        
        // Add click event
        el.addEventListener('click', () => {
          onChargerSelect(charger.id);
        });
        
        // Store marker reference
        markers.current[charger.id] = marker;
      });
      
      // Focus on selected charger if exists
      if (selectedCharger && markers.current[selectedCharger]) {
        const charger = chargers.find(c => c.id === selectedCharger);
        if (charger) {
          map.current.flyTo({
            center: [charger.lng, charger.lat],
            zoom: 15,
            speed: 1,
          });
          markers.current[selectedCharger].togglePopup();
        }
      }
    };
    
    // Check if map is already loaded
    if (map.current.loaded()) {
      handleMapLoad();
    } else {
      map.current.on('load', handleMapLoad);
    }
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.off('load', handleMapLoad);
      }
    };
  }, [chargers, selectedCharger, onChargerSelect]);

  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <div ref={mapContainer} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
    </div>
  );
}