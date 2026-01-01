import { GameData } from '../types';

interface PrintHeaderProps {
  gameData: GameData;
  battingOrder: string[];
}

export default function PrintHeader({ gameData, battingOrder }: PrintHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900">Game Information</h2>
          <div className="mt-2 text-sm">
            <div><span className="font-semibold">Date:</span> {gameData.date || '-'}</div>
            <div><span className="font-semibold">Opponent:</span> {gameData.opponent || '-'}</div>
            <div><span className="font-semibold">Available Pitchers:</span> {gameData.availablePitchers || '-'}</div>
          </div>
        </div>
        <div className="w-72">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Batting Order</h3>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {battingOrder.map((player, idx) => (
              <li key={idx} className="flex">
                <span className="w-6 font-semibold text-gray-400">{idx + 1}.</span>
                <span className="flex-1 text-red-600 font-semibold truncate">
                  {player || '-'}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <hr className="mt-4 border-gray-200" />
    </div>
  );
}