export default function VolumeSlider({ volume, setVolume }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500">Volume: {volume}</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-full accent-red-600 cursor-pointer"
      />
    </div>
  );
}
