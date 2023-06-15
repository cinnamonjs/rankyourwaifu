import React from 'react';
import { RoundRobinTournament } from '@/components/Tournament';
import { FullCharacterData } from '@/data/characterdata';
const FullsetPage = () => {
  return (
    <div>
      <RoundRobinTournament 
        Characters={FullCharacterData} 
        PresetName={'Full set (30) Characters'}
      />
    </div>
  );
};

export default Page;