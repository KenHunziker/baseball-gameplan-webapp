import { Lineup, POSITIONS } from '../types';
import PositionSelector from './PositionSelector';

interface BaseballDiamondProps {
  lineup: Lineup;
  roster: string[];
  updateLineup: (inning: number, position: string, player: string) => void;
}

export default function BaseballDiamond({ lineup, roster, updateLineup }: BaseballDiamondProps) {
  const playersOnField = Object.values(lineup.positions).filter(p => p);
  const sittingPlayers = roster.filter(player => !playersOnField.includes(player));

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white print:break-inside-avoid">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        Inning {lineup.inning}
      </h3>

      <div className="relative aspect-square mb-4">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,40 160,100 100,160 40,100"
            fill="#86efac"
            stroke="#22c55e"
            strokeWidth="2"
          />

          <circle cx="100" cy="100" r="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="100" cy="160" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="160" cy="100" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="100" cy="40" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="40" cy="100" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />

          <rect x="85" y="175" width="30" height="15" fill="#94a3b8" stroke="#64748b" strokeWidth="1" rx="2" />
        </svg>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
          <PositionSelector
            position="CF"
            selectedPlayer={lineup.positions['CF'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, 'CF', player)}
          />
        </div>

        <div className="absolute top-[12%] left-[12%]">
          <PositionSelector
            position="LF"
            selectedPlayer={lineup.positions['LF'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, 'LF', player)}
          />
        </div>

        <div className="absolute top-[12%] right-[12%]">
          <PositionSelector
            position="RF"
            selectedPlayer={lineup.positions['RF'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, 'RF', player)}
          />
        </div>

        <div className="absolute top-[20%] left-1/2 -translate-x-1/2">
          <PositionSelector
            position="2B"
            selectedPlayer={lineup.positions['2B'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, '2B', player)}
          />
        </div>

        <div className="absolute top-[38%] left-[20%]">
          <PositionSelector
            position="SS"
            selectedPlayer={lineup.positions['SS'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, 'SS', player)}
          />
        </div>

        <div className="absolute top-[38%] right-[20%]">
          <PositionSelector
            position="1B"
            selectedPlayer={lineup.positions['1B'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, '1B', player)}
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <PositionSelector
            position="P"
            selectedPlayer={lineup.positions['P'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, 'P', player)}
          />
        </div>

        <div className="absolute top-[62%] left-[20%]">
          <PositionSelector
            position="3B"
            selectedPlayer={lineup.positions['3B'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, '3B', player)}
          />
        </div>

        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2">
          <PositionSelector
            position="C"
            selectedPlayer={lineup.positions['C'] || ''}
            roster={roster}
            onChange={(player) => updateLineup(lineup.inning, 'C', player)}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-gray-200">
        <h4 className="text-sm font-bold text-gray-700 mb-2">Sitting:</h4>
        <div className="text-sm text-gray-600">
          {sittingPlayers.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {sittingPlayers.map((player, index) => (
                <span key={index} className="inline-block bg-gray-100 px-2 py-1 rounded print:text-red-600 print:font-semibold print:bg-transparent">
                  {player}{index < sittingPlayers.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 italic">All players on field</span>
          )}
        </div>
      </div>
    </div>
  );
}
