export default function ControlsPanel({
  onPlay,
  onStop,
  onPreProcess,
  onProcPlay,
  p1Hush,
  setP1Hush,
}) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={onPreProcess}
          className="bg-slate-800 text-white hover:bg-blue-700 p-2 border rounded-md"
        >
          PreProcess
        </button>
        <button
          onClick={onProcPlay}
          className="bg-slate-800 text-white p-2 border rounded-md hover:bg-blue-700"
        >
          Proc & Play
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={onPlay} className="btn btn-outline">
          Play
        </button>
        <button onClick={onStop} className="btn btn-outline">
          Stop
        </button>
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">p1:</label>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="p1"
              checked={!p1Hush}
              onChange={() => setP1Hush(false)}
            />
            <span className="ml-2">ON</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="p1"
              checked={p1Hush}
              onChange={() => setP1Hush(true)}
            />
            <span className="ml-2">HUSH</span>
          </label>
        </div>
      </div>
    </div>
  );
}
