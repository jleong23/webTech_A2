export default function DrumPatternSelector({ pattern, setPattern }) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-bold text-red-500">Drum Pattern:</label>
      <select
        value={pattern}
        onChange={(e) => setPattern(Number(e.target.value))}
        className="bg-gray-800 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        <option value={0}>Pattern 0</option>
        <option value={1}>Pattern 1</option>
        <option value={2}>Pattern 2</option>
      </select>
    </div>
  );
}
