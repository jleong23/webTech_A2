/**
 * Renders a slider to control the reverb level.
 * It displays the current reverb value and allows the user to adjust it.
 */

export default function ReverbControl({ reverb = 0, setReverb }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
      <label className="flex justify-between font-bold text-gray-200">
        <span>Reverb</span>
        <span className="text-red-400 font-mono">{reverb.toFixed(2)}</span>
      </label>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={reverb}
        onChange={(e) => setReverb(parseFloat(e.target.value))}
        className="w-full h-3 rounded-lg accent-red-600 cursor-pointer 
                   bg-gradient-to-r from-red-500/50 to-red-700/50 shadow-inner"
      />
    </div>
  );
}
