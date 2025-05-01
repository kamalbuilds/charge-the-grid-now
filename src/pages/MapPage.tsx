
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/map/SearchFilters';
import ChargerMap from '@/components/map/ChargerMap';
import ChargerList from '@/components/map/ChargerList';
import { mockChargers } from '@/data/mockChargers';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0.07]);
  const [chargerType, setChargerType] = useState('all');
  const [selectedCharger, setSelectedCharger] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call to search for chargers
    console.log('Searching for:', searchQuery);
  };

  const handleChargerSelect = (id: string) => {
    setSelectedCharger(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-8">
        <h1 className="mb-6">Find EV <span className="gradient-text">Chargers</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              chargerType={chargerType}
              setChargerType={setChargerType}
              handleSearch={handleSearch}
            />
          </div>
          
          <div className="lg:col-span-2">
            <ChargerMap />
            
            <ChargerList 
              chargers={mockChargers}
              selectedCharger={selectedCharger}
              onChargerSelect={handleChargerSelect}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MapPage;
