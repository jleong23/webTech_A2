export default function DrumBeatSelector({ beat, setBeat }) {
  const beats = ["Beat 1", "Beat 2", "Beat 3"]; // your drum beat names

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm">Drum Pattern</label>
      <select
        value={beat}
        onChange={(e) => setBeat(parseInt(e.target.value))}
        className="bg-gray-800 text-white p-2 rounded"
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
