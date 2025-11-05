export default function TempoControl({ tempo, setTempo }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500">Tempo: {tempo} BPM</label>
      <input
        type="range"
        min="50"
        max="200"
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
        className="w-full accent-red-600 cursor-pointer"
      />
    </div>
  );
}
