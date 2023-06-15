import React from 'react';
import { RoundRobinTournament } from '@/components/Tournament';
import { DevCharacterData } from '@/data/characterdata';
const DevsetPage = () => {
  return (
    <div>
      <RoundRobinTournament 
        Characters={DevCharacterData} 
        PresetName={'Dev preset Characters'}
      />
    </div>
  );
};

export default DevsetPage;