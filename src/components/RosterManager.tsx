import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface RosterManagerProps {
  roster: string[];
  setRoster: (roster: string[]) => void;
}

export default function RosterManager({ roster, setRoster }: RosterManagerProps) {
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = () => {
    if (newPlayer.trim()) {
      setRoster([...roster, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const removePlayer = (index: number) => {
    setRoster(roster.filter((_, i) => i !== index));
  };

  const updatePlayer = (index: number, value: string) => {
    const updated = [...roster];
    updated[index] = value;
    setRoster(updated);
  };

  return (
        <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <h2 className="text-sm md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Team Roster</h2>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))] gap-2 md:gap-3 mb-3 md:mb-4">
        {roster.map((player, index) => (
          <div key={index} className="flex items-center gap-2 min-w-0 w-full">
            <input
              type="text"
              value={player}
              onChange={(e) => updatePlayer(index, e.target.value)}
              className="flex-1 px-2 md:px-3 py-1.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-xs md:text-sm min-w-[8rem] sm:min-w-[10rem]"
            />
            <button
              onClick={() => removePlayer(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              aria-label={`Remove ${player}`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          placeholder="Add new player"
          className="flex-1 min-w-[10rem] px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
        />
        <button
          onClick={addPlayer}
          className="flex items-center justify-center gap-2 bg-green-600 text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          Add Player
        </button>
      </div>
    </div>
  );
}
