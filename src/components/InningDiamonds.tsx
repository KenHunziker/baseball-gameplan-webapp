import { Lineup } from '../types';
import BaseballDiamond from './BaseballDiamond';

interface InningDiamondsProps {
  lineups: Lineup[];
  roster: string[];
  updateLineup: (inning: number, position: string, player: string) => void;
}

export default function InningDiamonds({ lineups, roster, updateLineup }: InningDiamondsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 print:mb-4">Innings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:gap-6">
        {lineups.map((lineup) => (
          <BaseballDiamond
            key={lineup.inning}
            lineup={lineup}
            roster={roster}
            updateLineup={updateLineup}
          />
        ))}
      </div>
    </div>
  );
}
