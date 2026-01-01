import { useState } from 'react';
import { Printer } from 'lucide-react';
import GameInfo from './components/GameInfo';
import RosterManager from './components/RosterManager';
import InningDiamonds from './components/InningDiamonds';
import PrintView from './components/PrintView';
import { GameData, Lineup } from './types';

function App() {
  const [gameData, setGameData] = useState<GameData>({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    availablePitchers: '',
  });

  const [roster, setRoster] = useState<string[]>([
    'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5',
    'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10'
  ]);

  // Print-only for now; later you can wire this to an editor
  const [battingOrder, setBattingOrder] = useState<string[]>(
    Array(10).fill('')
  );

  const [lineups, setLineups] = useState<Lineup[]>([
    { inning: 1, positions: {} },
    { inning: 2, positions: {} },
    { inning: 3, positions: {} },
    { inning: 4, positions: {} },
    { inning: 5, positions: {} },
    { inning: 6, positions: {} },
  ]);

  const handlePrint = () => {
    window.print();
  };

  const updateLineup = (inning: number, position: string, player: string) => {
    setLineups(prev => prev.map(lineup =>
      lineup.inning === inning
        ? { ...lineup, positions: { ...lineup.positions, [position]: player } }
        : lineup
    ));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR: Management Tools (hidden on print) */}
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto p-4 md:p-6 print:hidden">
        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Coach's Console</h1>
        </div>
        <div className="space-y-6">
          <GameInfo gameData={gameData} setGameData={setGameData} />
          <RosterManager roster={roster} setRoster={setRoster} />
          {/* You can add a BattingOrder editor here later and bind setBattingOrder */}
        </div>
      </aside>

      {/* MAIN: Interactive content (hidden on print) */}
      <main className="flex-1 overflow-y-auto min-w-0 print:hidden">
        <div className="max-w-7xl mx-auto p-4 md:p-6 print:p-8">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 print:shadow-none">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0 mb-6 md:mb-8 print:mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Baseball Gameplan</h1>
                <p className="text-gray-600 print:hidden">Plan your lineup for each inning</p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 text-white text-sm md:text-base px-3 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors print:hidden self-start md:self-auto"
              >
                <Printer size={18} />
                Print Gameplan
              </button>
            </div>

            <InningDiamonds
              lineups={lineups}
              roster={roster}
              updateLineup={updateLineup}
            />
          </div>
        </div>
      </main>

      {/* PRINT-ONLY VIEW */}
      <div className="hidden print:block flex-1">
        <PrintView
          gameData={gameData}
          battingOrder={battingOrder}
          lineups={lineups}
          roster={roster}
        />
      </div>
    </div>
  );
}

export default App;