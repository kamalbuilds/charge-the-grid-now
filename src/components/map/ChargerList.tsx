
import React from 'react';
import ChargerCard, { Charger } from './ChargerCard';

interface ChargerListProps {
  chargers: Charger[];
  selectedCharger: string | null;
  onChargerSelect: (id: string) => void;
}

const ChargerList: React.FC<ChargerListProps> = ({ 
  chargers, 
  selectedCharger, 
  onChargerSelect 
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Available Chargers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chargers.map((charger) => (
          <ChargerCard
            key={charger.id}
            charger={charger}
            isSelected={selectedCharger === charger.id}
            onSelect={onChargerSelect}
          />
        ))}
      </div>
    </>
  );
};

export default ChargerList;
