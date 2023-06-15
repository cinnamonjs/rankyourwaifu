import React, { useState, useEffect } from 'react';
import Selection from '@/components/Selection';
import Result from '@/components/result';

export const RoundRobinTournament = ({ Characters , PresetName }) => {
  // state variables
  const [schedule, setSchedule] = useState([]);
  const [points, setPoints] = useState({});
  const [currentRound, setCurrentRound] = useState(1);
  const [showNext, setShowNext] = useState(true);
  const [showResult, setShowResult] = useState(false);

  /** suffle array  */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  /**  generate the schedule */ 
  const generateSchedule = () => {
    const matches = [];

    // Initialize points for each item
    const initialPoints = {};
    Characters.forEach((item) => {
      initialPoints[item.name] = 0;
    });
    setPoints(initialPoints);

    // Generate matches for the initial rounds
    for (let i = 0; i < Characters.length - 1; i++) {
      for (let j = 0; j < Characters.length / 2; j++) {
        const Left = Characters[j];
        const Right = Characters[Characters.length - 1 - j];
        matches.push({ Left, Right });
      }
      // Rotate Characters for the next round
      Characters.splice(1, 0, Characters.pop());
    }
    setSchedule(shuffleArray(matches));
    console.log(matches);
  };
  
  useEffect(() => {
    generateSchedule();
  }, []);
 
  /** handle calculation on result button */
  const handleResult = (roundIndex, winner) => {
    const updatedSchedule = [...schedule];
    const match = updatedSchedule[roundIndex];
    // Update points
    const updatedPoints = { ...points };
    updatedPoints[winner.name] = (updatedPoints[winner.name] || 0) + 1;
    setPoints(updatedPoints);

    // Mark the winner in the match
    match.winner = winner;
    setSchedule(updatedSchedule);
  };

  /** ranking all characters */
  const rankCharacters = () => {
    const CharactersWithPoints = Object.entries(points).map(([item, point]) => ({ item, point }));

    // Sort Characters by points in descending order
    const rankedCharacters = CharactersWithPoints.sort((a, b) => b.point - a.point);

    // Assign ranks to Characters
    rankedCharacters.forEach((item, index) => {
      item.rank = index + 1;
    });
    return rankedCharacters;
  };

  const rankedCharacters = rankCharacters();

  /** find tie Characters by points */
  const findTiedCharacters = () => {
    if (rankedCharacters.length > 0) {
      const pointsMap = new Map();
      rankedCharacters.forEach(item => {
        const { point } = item;
        if (pointsMap.has(point)) {
          pointsMap.get(point).push({item: Characters.find(data => data.name === item.item), points: item.point});
        } else {
          pointsMap.set(point, [{ item: Characters.find(data => data.name === item.item), points: item.point }]);
        }
        
      });
      
      const tiedCharacters = Array.from(pointsMap.values())
        .filter(Characters => Characters.length > 1)
        .flatMap(Characters => Characters);

      return tiedCharacters;
    } else {
      return [];
    }
  };

  /** generate a list of tied characters */
  const generateTiebreakerMatches = () => {
    const tiedCharacters = findTiedCharacters();
  
    if (tiedCharacters.length > 1) {
      const tiebreakerMatches = [];
  
      // Group tied Characters based on their points
      const CharactersByPoints = {};
      tiedCharacters.forEach(item => {
        const { point } = item;
        if (!CharactersByPoints[point]) {
          CharactersByPoints[point] = [item];
        } else {
          CharactersByPoints[point].push(item);
        }
      });
  
      // Generate tiebreaker matches for Characters with the same points
      Object.values(CharactersByPoints).forEach(Characters => {
        for (let i = 0; i < Characters.length - 1; i++) {
          for (let j = i + 1; j < Characters.length; j++) {
            const Left = Characters[i].item;
            const Right = Characters[j].item;
            tiebreakerMatches.push({ Left, Right });
          }
        }
      });
      const randomIndex = Math.floor(Math.random() * tiebreakerMatches.length);
      return [tiebreakerMatches[randomIndex]];
    }
  
    return [];
  };

  /** function to add tiebreaker round to schedule */
  const addTiebreakerRound = () => {
    const tiebreakerMatches = generateTiebreakerMatches();
    if (tiebreakerMatches.length > 0) {
      const updatedSchedule = [...schedule, ...tiebreakerMatches];
      setSchedule(updatedSchedule);
    }
  };

  const isAllPointsUnique = () => {
    const uniquePoints = [...new Set(Object.values(points))];
    return uniquePoints.length === rankedCharacters.length;
  };

  /** handle current rounds */
  const handleShowNextRound = () => {
    if (!isAllPointsUnique()) {
      if (currentRound >= schedule.length) {
        addTiebreakerRound();
      }
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    } else {
      setShowNext(false);
      setShowResult(true);
    }
  }
  console.log('points')
  console.log(rankedCharacters) 
  console.log('numbers of selection')
  console.log(schedule)
  return (
    <> 
      { schedule.length > 0 && !showResult && <Selection 
        onclick={handleResult}
        nextRound={handleShowNextRound}
        object={schedule[currentRound - 1]}
        index={currentRound - 1}
        
      />}
      { showResult && <Result 
        RanksArray={rankedCharacters}
        Characters={Characters}
        PresetName={PresetName}
      />}
    </>
  );
};
