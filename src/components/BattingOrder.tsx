interface BattingOrderProps {
  roster: string[];
  order: string[];
  onChange: (index: number, player: string) => void;
  }
  
  export default function BattingOrder({ roster, order, onChange }: BattingOrderProps) {
  return (
  <div className="mb-8 p-4 border-2 border-gray-800 rounded-lg">
  <h2 className="text-lg font-bold uppercase mb-4 border-b-2 border-gray-800">Batting Order</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
  {order.map((selectedPlayer, index) => (
  <div key={index} className="flex items-center border-b border-gray-200 py-1">
  <span className="w-6 font-bold text-gray-400 text-sm">{index + 1}.</span>
  <select
  value={selectedPlayer}
  onChange={(e) => onChange(index, e.target.value)}
  className="flex-1 bg-transparent text-sm focus:outline-none print:appearance-none print:text-red-600 print:font-bold"
  >
  <option value="">Select Player</option>
  {roster.map((player, i) => (
  <option key={i} value={player}>{player}</option>
  ))}
  </select>
  </div>
  ))}
  </div>
  </div>
  );
  }
  