import React from 'react';
import { RoundRobinTournament } from '@/components/Tournament';
import { CharacterData } from '@/data/characterdata';
const Page = () => {
  return (
    <div>
      <RoundRobinTournament Characters={CharacterData} />
    </div>
  );
};

export default Page;