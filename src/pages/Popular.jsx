import React from 'react';
import { RoundRobinTournament } from '@/components/Tournament';
import { PopularCharacterData } from '@/data/characterdata';
const PopularPage = () => {
  return (
    <div>
      <RoundRobinTournament 
        Characters={PopularCharacterData} 
        PresetName={'Popular manga Characters'}
      />
    </div>
  );
};

export default PopularPage;