
import React from 'react';
import { Battery } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Charger {
  id: string;
  name: string;
  address: string;
  price: string;
  type: string;
  power: string;
  status: string;
  lat: number;
  lng: number;
}

interface ChargerCardProps {
  charger: Charger;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ChargerCard: React.FC<ChargerCardProps> = ({ charger, isSelected, onSelect }) => {
  return (
    <Card 
      key={charger.id} 
      className={`card-hover ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect(charger.id)}
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
  );
};

export default ChargerCard;
