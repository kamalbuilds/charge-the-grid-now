
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
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

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  chargerType: string;
  setChargerType: (type: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  chargerType,
  setChargerType,
  handleSearch,
}) => {
  return (
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
  );
};

export default SearchFilters;
