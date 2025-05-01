
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Battery, Settings } from 'lucide-react';

// Mock data for charger stations
const mockChargers = [
  {
    id: '1',
    name: 'Downtown Fast Charger',
    address: '123 Main St, Miami, FL',
    price: '0.05',
    type: 'DC Fast',
    power: '150 kW',
    status: 'Available',
    lat: 25.7617,
    lng: -80.1918
  },
  {
    id: '2',
    name: 'Green Hills Station',
    address: '456 Oak Ave, Miami, FL',
    price: '0.04',
    type: 'Level 2',
    power: '22 kW',
    status: 'Available',
    lat: 25.7717,
    lng: -80.1818
  },
  {
    id: '3',
    name: 'Ocean View Charger',
    address: '789 Beach Blvd, Miami, FL',
    price: '0.06',
    type: 'DC Fast',
    power: '50 kW',
    status: 'In Use',
    lat: 25.7517,
    lng: -80.2018
  },
  {
    id: '4',
    name: 'Sunny Plaza Charging',
    address: '101 Palm St, Miami, FL',
    price: '0.03',
    type: 'Level 2',
    power: '11 kW',
    status: 'Available',
    lat: 25.7817,
    lng: -80.1718
  },
];

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
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Search Filters</CardTitle>
                <CardDescription>Find the perfect charger for your needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Max Price: {priceRange[0]} $CHARGE/kWh
                  </label>
                  <Slider
                    defaultValue={[0.07]}
                    max={0.20}
                    step={0.01}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Charger Type</label>
                  <Select value={chargerType} onValueChange={setChargerType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="dc-fast">DC Fast Charging</SelectItem>
                      <SelectItem value="level2">Level 2 AC</SelectItem>
                      <SelectItem value="level1">Level 1 AC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Chargers</SelectItem>
                      <SelectItem value="available">Available Now</SelectItem>
                      <SelectItem value="coming-soon">Available Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full bg-gradient-primary button-glow">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-muted h-[400px] rounded-lg mb-6 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map will be loaded here</p>
              </div>
              
              {/* This would be replaced with an actual map component like Google Maps or Mapbox */}
              <div className="absolute inset-0 opacity-20 bg-gradient-primary"></div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Available Chargers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockChargers.map((charger) => (
                <Card 
                  key={charger.id} 
                  className={`card-hover ${selectedCharger === charger.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleChargerSelect(charger.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{charger.name}</CardTitle>
                        <CardDescription>{charger.address}</CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        charger.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {charger.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Price:</span>{' '}
                        <span className="font-medium">{charger.price} $CHARGE/kWh</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>{' '}
                        <span className="font-medium">{charger.type}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Power:</span>{' '}
                        <span className="font-medium">{charger.power}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ID:</span>{' '}
                        <span className="font-mono text-xs">0x{Math.random().toString(16).substring(2, 8)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-sol-blue button-glow text-white">
                      <Battery className="mr-2 h-4 w-4" /> Start Charging
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
