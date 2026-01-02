import { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import GameInfo from './components/GameInfo';
import RosterManager from './components/RosterManager';
import InningDiamonds from './components/InningDiamonds';
import InteractiveBattingOrder from './components/InteractiveBattingOrder'; // Import this
import PrintView from './components/PrintView';
import { GameData, Lineup } from './types';

function App() {
  const [gameData, setGameData] = useState<GameData>({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    availablePitchers: '',
  });

  const [roster, setRoster] = useState<string[]>([
    'Player 1', 'Player 2', 'Player 3'
  ]);

  const [battingOrder, setBattingOrder] = useState<string[]>([]);

  // SYNC LOGIC: Keep batting order in lock-step with roster
  useEffect(() => {
    setBattingOrder((prevOrder) => {
      const stillInRoster = prevOrder.filter(name => roster.includes(name));
      const newPlayers = roster.filter(name => !stillInRoster.includes(name));
      return [...stillInRoster, ...newPlayers];
    });
  }, [roster]);

  const [lineups, setLineups] = useState<Lineup[]>(
    [1, 2, 3, 4, 5, 6].map(i => ({ inning: i, positions: {} }))
  );

  const updateLineup = (inning: number, position: string, player: string) => {
    setLineups(prev => prev.map(lineup =>
      lineup.inning === inning
        ? { ...lineup, positions: { ...lineup.positions, [position]: player } }
        : lineup
    ));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      <aside className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto p-6 print:hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Coach's Console</h1>
        <div className="space-y-6">
          <GameInfo gameData={gameData} setGameData={setGameData} />
          <RosterManager roster={roster} setRoster={setRoster} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto print:hidden">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gameplan</h1>
                <p className="text-gray-500">Drag players to set the order, then assign positions.</p>
              </div>
              <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                <Printer size={18} /> Print
              </button>
            </div>

            {/* THE NEW INTERACTIVE AREA */}
            <InteractiveBattingOrder 
              battingOrder={battingOrder} 
              setBattingOrder={setBattingOrder} 
            />

            <InningDiamonds
              lineups={lineups}
              roster={roster}
              updateLineup={updateLineup}
            />
          </div>
        </div>
      </main>

      <div className="hidden print:block">
        <PrintView gameData={gameData} battingOrder={battingOrder} lineups={lineups} roster={roster} />
      </div>
    </div>
  );
}

export default App;