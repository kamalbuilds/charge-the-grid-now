
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Charger } from './ChargerCard';

interface ChargerMapProps {
  chargers: Charger[];
  selectedCharger: string | null;
  onChargerSelect: (id: string) => void;
}

const ChargerMap: React.FC<ChargerMapProps> = ({ 
  chargers, 
  selectedCharger,
  onChargerSelect
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    // In production, this should come from Supabase secrets or env variables
    const tokenInput = document.getElementById('mapbox-token') as HTMLInputElement;
    if (tokenInput) {
      setMapboxToken(tokenInput.value);
    }
  }, []);

  // Initialize map when token is available
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [chargers[0]?.lng || -80.1918, chargers[0]?.lat || 25.7617], // Default to first charger or Miami
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      // Cleanup
      map.current?.remove();
    };
  }, [mapboxToken, chargers]);

  // Add markers when map is loaded and update when chargers change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Clear all existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};
    
    // Add new markers
    chargers.forEach(charger => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.background = charger.status === 'Available' ? '#10B981' : '#F97316';
      el.style.border = selectedCharger === charger.id ? '3px solid #3B82F6' : '1px solid white';
      el.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      
      // Add marker to map
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
      
      // Add click event to marker
      el.addEventListener('click', () => {
        onChargerSelect(charger.id);
      });
      
      markers.current[charger.id] = marker;
    });
    
    // If a charger is selected, fly to it
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
  }, [chargers, mapLoaded, selectedCharger, onChargerSelect]);

  // If no token exists yet, show a token input field
  if (!mapboxToken) {
    return (
      <div className="bg-muted h-[400px] rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground mb-4">Please enter your Mapbox token to load the map</p>
          <input 
            type="text" 
            id="mapbox-token" 
            placeholder="pk.eyJ1Ijoi..." 
            className="w-full max-w-md p-2 border rounded"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            You can get a token at <a href="https://mapbox.com/account/access-tokens" className="text-primary" target="_blank" rel="noreferrer">mapbox.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-lg mb-6 relative overflow-hidden shadow-md">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default ChargerMap;
