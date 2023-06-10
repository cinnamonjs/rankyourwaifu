import React from 'react';
import RoundRobinTournament from '@/components/example';

const Page = () => {
  const teams = ['A', 'B', 'C', 'D'];

  return (
    <div>
      <RoundRobinTournament teams={teams} />
    </div>
  );
};

export default Page;