import PrintHeader from './PrintHeader';
import ReadOnlyDiamond from './ReadOnlyDiamond';
import { GameData, Lineup } from '../types';

interface PrintViewProps {
  gameData: GameData;
  battingOrder: string[];
  lineups: Lineup[];
  roster: string[];
}

export default function PrintView({ gameData, battingOrder, lineups, roster }: PrintViewProps) {
  return (
    <div className="hidden print:block">
      <div className="max-w-7xl mx-auto print:p-6">
        <div className="bg-white print:bg-transparent">
          <PrintHeader gameData={gameData} battingOrder={battingOrder} />
          <h2 className="text-lg font-bold text-gray-900 mb-3">Innings</h2>
          <div className="grid grid-cols-3 gap-3">
            {lineups.map((l) => (
              <ReadOnlyDiamond key={l.inning} lineup={l} roster={roster} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}