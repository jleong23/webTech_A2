export default function DrumPatternSelector({ pattern, setPattern }) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="drumPattern" className="text-sm font-medium">
        Drum Pattern:
      </label>
      <select
        id="drumPattern"
        value={pattern}
        onChange={(e) => setPattern(Number(e.target.value))}
        className="form-select text-sm"
      >
        <option value={0}>Pattern 0</option>
        <option value={1}>Pattern 1</option>
        <option value={2}>Pattern 2</option>
      </select>
    </div>
  );
}
