import { Lineup } from '../types';

interface ReadOnlyDiamondProps {
  lineup: Lineup;
  roster: string[];
}

export default function ReadOnlyDiamond({ lineup, roster }: ReadOnlyDiamondProps) {
  const playersOnField = Object.values(lineup.positions).filter(Boolean);
  const sittingPlayers = roster.filter((p) => !playersOnField.includes(p));

  return (
    <div className="border-2 border-gray-300 rounded-lg p-3 print:break-inside-avoid">
      <h3 className="text-base font-bold text-gray-900 mb-2 text-center">Inning {lineup.inning}</h3>
      <div className="relative aspect-square mb-2">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="100,40 160,100 100,160 40,100" fill="#86efac" stroke="#22c55e" strokeWidth="2" />
          <circle cx="100" cy="100" r="15" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="100" cy="160" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="160" cy="100" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="100" cy="40" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="40" cy="100" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
          <rect x="85" y="175" width="30" height="15" fill="#94a3b8" stroke="#64748b" strokeWidth="1" rx="2" />
        </svg>

        <DiamondLabel topClass="top-0 left-1/2 -translate-x-1/2 -translate-y-2" pos="CF" name={lineup.positions['CF']} />
        <DiamondLabel topClass="top-[12%] left-[12%]" pos="LF" name={lineup.positions['LF']} />
        <DiamondLabel topClass="top-[12%] right-[12%]" pos="RF" name={lineup.positions['RF']} />
        <DiamondLabel topClass="top-[20%] left-1/2 -translate-x-1/2" pos="2B" name={lineup.positions['2B']} />
        <DiamondLabel topClass="top-[38%] left-[20%]" pos="SS" name={lineup.positions['SS']} />
        <DiamondLabel topClass="top-[38%] right-[20%]" pos="1B" name={lineup.positions['1B']} />
        <DiamondLabel topClass="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" pos="P" name={lineup.positions['P']} />
        <DiamondLabel topClass="top-[62%] left-[20%]" pos="3B" name={lineup.positions['3B']} />
        <DiamondLabel topClass="bottom-[8%] left-1/2 -translate-x-1/2" pos="C" name={lineup.positions['C']} />
      </div>

      <div className="mt-2 pt-2 border-top-2 border-gray-200">
        <h4 className="text-xs font-bold text-gray-700 mb-1">Sitting:</h4>
        <div className="text-xs text-gray-600">
          {sittingPlayers.length > 0 ? sittingPlayers.join(', ') : <span className="text-gray-400 italic">All players on field</span>}
        </div>
      </div>
    </div>
  );
}

function DiamondLabel({ topClass, pos, name }: { topClass: string; pos: string; name?: string }) {
  return (
    <div className={`absolute ${topClass} text-center`}>
      <div className="text-[10px] font-bold text-gray-700">{pos}</div>
      <div className="text-[10px] font-semibold text-red-600">{name || '-'}</div>
    </div>
  );
}