export default function TempoControl({ tempo, setTempo }) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium mb-2 text-gray-600">
        Tempo (BPM): {tempo}
      </label>
      <input
        type="range"
        min="50"
        max="200"
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
        className="w-full accent-blue-600 cursor-pointer"
      />
    </div>
  );
}
