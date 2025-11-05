export default function ReverbControl({ reverb = 0, setReverb }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500">
        Reverb: {reverb.toFixed(2)}
      </label>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={reverb}
        onChange={(e) => setReverb(parseFloat(e.target.value))}
        className="w-full accent-red-600 cursor-pointer"
      />
    </div>
  );
}
