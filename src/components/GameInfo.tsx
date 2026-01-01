import { GameData } from '../types';

interface GameInfoProps {
  gameData: GameData;
  setGameData: (data: GameData) => void;
}

export default function GameInfo({ gameData, setGameData }: GameInfoProps) {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))] gap-3 md:gap-6 mb-6 md:mb-8 print:mb-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          value={gameData.date}
          onChange={(e) => setGameData({ ...gameData, date: e.target.value })}
          className="w-full px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm print:border-0 print:p-0 print:text-red-600 print:font-semibold"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Opponent
        </label>
        <input
          type="text"
          value={gameData.opponent}
          onChange={(e) => setGameData({ ...gameData, opponent: e.target.value })}
          placeholder="Enter opponent team"
          className="w-full px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm print:border-0 print:p-0 print:text-red-600 print:font-semibold"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Available Pitchers
        </label>
        <input
          type="text"
          value={gameData.availablePitchers}
          onChange={(e) => setGameData({ ...gameData, availablePitchers: e.target.value })}
          placeholder="List available pitchers"
          className="w-full px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm print:border-0 print:p-0 print:text-red-600 print:font-semibold"
        />
      </div>
    </div>
  );
}
