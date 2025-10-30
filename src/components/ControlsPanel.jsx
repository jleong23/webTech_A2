/**
 * ControlPanel:
 * 1. Slider controls to set Tempo
 * 2. Play / Stop / Proc controls
 * 3. Hush radio buttons to mute drums
 */

export default function ControlsPanel({
  onPlay,
  onStop,
  onProcPlay,
  p1Hush,
  setP1Hush,
  tempo,
  setTempo,
}) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        {/* Proc & Play Button */}
        <button
          onClick={onProcPlay}
          className="flex items-center justify-center px-4 py-2 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium shadow-md transition-colors duration-200"
        >
          Proc & Play
        </button>
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium mb-2 text-gray-600">
          Hush
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="p1"
              checked={!p1Hush}
              onChange={() => setP1Hush(false)}
              className="w-5 h-5 text-green-500 accent-green-500 focus:ring-2 focus:ring-green-400"
            />
            <span className="ml-2 text-gray-600 font-medium">ON</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="p1"
              checked={p1Hush}
              onChange={() => setP1Hush(true)}
              className="w-5 h-5 text-red-500 accent-red-500 focus:ring-2 focus:ring-red-400"
            />
            <span className="ml-2 text-gray-600 font-medium">HUSH</span>
          </label>
        </div>
      </div>

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
    </div>
  );
}
