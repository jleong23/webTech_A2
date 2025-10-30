export default function ReverbControl({ reverb = 0, setReverb }) {
  return (
    <div>
      <label htmlFor="reverbControl">Reverb: {reverb.toFixed(2)}</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={reverb}
        onChange={(e) => setReverb(parseFloat(e.target.value))}
      />
    </div>
  );
}
