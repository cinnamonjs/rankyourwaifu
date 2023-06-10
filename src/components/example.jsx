import React, { useState, useEffect } from 'react';

const RoundRobinTournament = ({ teams }) => {
  const [schedule, setSchedule] = useState([]);
  const [points, setPoints] = useState({});
  const [isTiebreakerRound, setIsTiebreakerRound] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [showNext, setShowNext] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    generateSchedule();
  }, []);

  const generateSchedule = () => {
    const matches = [];

    // Initialize points for each team
    const initialPoints = {};
    teams.forEach((team) => {
      initialPoints[team] = 0;
    });
    setPoints(initialPoints);

    // Generate matches for the initial rounds
    for (let i = 0; i < teams.length - 1; i++) {
      for (let j = 0; j < teams.length / 2; j++) {
        const Left = teams[j];
        const Right = teams[teams.length - 1 - j];
        matches.push({ Left, Right });
      }
      // Rotate teams for the next round
      teams.splice(1, 0, teams.pop());
    }
    setSchedule(matches);
  };

  // handle calculation on result button
  const handleResult = (roundIndex, winner) => {
    const updatedSchedule = [...schedule];
    const match = updatedSchedule[roundIndex];
    // Update points
    const updatedPoints = { ...points };
    updatedPoints[winner] = (updatedPoints[winner] || 0) + 1;
    setPoints(updatedPoints);

    // Mark the winner in the match
    match.winner = winner;

    setSchedule(updatedSchedule);
  };

  const rankTeams = () => {
    const teamsWithPoints = Object.entries(points).map(([team, point]) => ({ team, point }));

    // Sort teams by points in descending order
    const rankedTeams = teamsWithPoints.sort((a, b) => b.point - a.point);

    // Assign ranks to teams
    rankedTeams.forEach((team, index) => {
      team.rank = index + 1;
    });

    return rankedTeams;
  };

  const rankedTeams = rankTeams();

  // find tie teams by points
  const findTiedTeams = () => {
    if (rankedTeams.length > 0) {
      const pointsMap = new Map();
      rankedTeams.forEach(team => {
        const { point } = team;
        if (pointsMap.has(point)) {
          pointsMap.get(point).push(team);
        } else {
          pointsMap.set(point, [team]);
        }
      });

      const tiedTeams = Array.from(pointsMap.values())
        .filter(teams => teams.length > 1)
        .flatMap(teams => teams);

      return tiedTeams;
    } else {
      return [];
    }
  };

  const generateTiebreakerMatches = () => {
    const tiedTeams = findTiedTeams();
  
    if (tiedTeams.length > 1) {
      const tiebreakerMatches = [];
  
      // Group tied teams based on their points
      const teamsByPoints = {};
      tiedTeams.forEach(team => {
        const { point } = team;
        if (!teamsByPoints[point]) {
          teamsByPoints[point] = [team];
        } else {
          teamsByPoints[point].push(team);
        }
      });
  
      // Generate tiebreaker matches for teams with the same points
      Object.values(teamsByPoints).forEach(teams => {
        for (let i = 0; i < teams.length - 1; i++) {
          for (let j = i + 1; j < teams.length; j++) {
            const Left = teams[i].team;
            const Right = teams[j].team;
            tiebreakerMatches.push({ Left, Right });
          }
        }
      });
      const randomIndex = Math.floor(Math.random() * tiebreakerMatches.length);
      return [tiebreakerMatches[randomIndex]];
    }
  
    return [];
  };

  // function to add tiebreaker round to schedule
  const addTiebreakerRound = () => {
    const tiebreakerMatches = generateTiebreakerMatches();
    if (tiebreakerMatches.length > 0) {
      const updatedSchedule = [...schedule, ...tiebreakerMatches];
      setSchedule(updatedSchedule);
      setIsTiebreakerRound(true);
    }
  };

  useEffect(() => {
    if (!isAllPointsUnique()) {
      setIsTiebreakerRound(true);
    }
  }, [points]);

  useEffect(() => {
    if (isAllPointsUnique()) {
      setIsTiebreakerRound(false);
    }
  }, [rankedTeams]);

  const isAllPointsUnique = () => {
    const uniquePoints = [...new Set(Object.values(points))];
    return uniquePoints.length === rankedTeams.length;
  };

  // handle current rounds
  const handleShowNextRound = () => {
    if (!isAllPointsUnique()) {
      if (currentRound >= schedule.length) {
        addTiebreakerRound();
        setIsTiebreakerRound(true);
      }
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    } else {
      setShowNext(false);
      setShowResult(true);
    }
  }

  return (
    <div>
      <h1>Round-Robin Tournament Schedule</h1>
      <h2>Matches</h2>
      {schedule.map((match, index) => {
        if (index === currentRound - 1) return (
        <div key={index}>
          <p>Round {index + 1}</p>
          <p>{match.Left} vs {match.Right}</p>
          {match.winner ? (
            <p>Win: {match.winner}</p>
          ) : (
            <>
              <button onClick={() => handleResult(index, match.Left)}>Select {match.Left} as winner</button>
              <button onClick={() => handleResult(index, match.Right)}>Select {match.Right} as winner</button>
            </>
          )}
        </div>
      )}
      )}
      {showNext && (
        <button onClick={handleShowNextRound}>Next Round</button>
      )}
      <h2>Points</h2>
      {rankedTeams.map((team, index) => (
        <p key={index}>{team.team}: {team.point} points</p>
      ))}
      {showResult && (
        <p>we got final answer</p>
      )}
    </div>
  );
};

export default RoundRobinTournament;