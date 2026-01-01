interface PositionSelectorProps {
  position: string;
  selectedPlayer: string;
  roster: string[];
  onChange: (player: string) => void;
}

export default function PositionSelector({
  position,
  selectedPlayer,
  roster,
  onChange
}: PositionSelectorProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs font-bold text-gray-700 mb-1">{position}</div>
      <select
        value={selectedPlayer}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs px-2 py-1 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0 print:bg-transparent print:text-red-600 print:font-semibold print:appearance-none print:text-center"
      >
        <option value="">-</option>
        {roster.map((player, index) => (
          <option key={index} value={player}>
            {player}
          </option>
        ))}
      </select>
    </div>
  );
}
