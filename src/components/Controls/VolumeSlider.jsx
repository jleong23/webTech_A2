export default function VolumeSlider({ volume, setVolume }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500">Volume: {volume}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-full accent-red-600 cursor-pointer"
      />
    </div>
  );
}
