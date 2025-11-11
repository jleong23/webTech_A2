/**
 * Renders a dropdown menu ( select element ) to allow users to choose a drum pattern
 * onChange event is triggered when user selects a new pattern from the dropdown.
 */
export default function DrumPatternSelector({ pattern, setPattern }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-200 tracking-wide">
        Drum Pattern
      </label>
      <select
        value={pattern}
        onChange={(e) => setPattern(Number(e.target.value))}
        className="bg-gray-700/70 text-white px-3 py-2 rounded-xl border border-gray-700
                   hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600
                   backdrop-blur-md transition-all duration-150 ease-in-out"
      >
        <option value={0}>Pattern 0</option>
        <option value={1}>Pattern 1</option>
        <option value={2}>Pattern 2</option>
      </select>
    </div>
  );
}
