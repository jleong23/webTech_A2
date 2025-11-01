export default function VolumeSlider({ volume, setVolume }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-2 text-gray-600">
        Volume: {volume}
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-full accent-red-500 cursor-pointer"
      />
    </div>
  );
}
