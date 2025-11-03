export default function DrumBeatSelector({ beat, setBeat }) {
  const beats = ["Beat 1", "Beat 2", "Beat 3"]; // your drum beat names

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-300 tracking-wide">
        Drum Beat
      </label>
      <select
        value={beat}
        onChange={(e) => setBeat(parseInt(e.target.value))}
        className="bg-gray-900 text-white px-3 py-2 rounded-lg border border-gray-700 
                   hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600
                   transition-all duration-150 ease-in-out"
      >
        {beats.map((p, i) => (
          <option key={i} value={i}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
