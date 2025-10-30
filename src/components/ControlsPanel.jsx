/**
 * ControlPanel:
 * 1. Slider controls to set Tempo
 * 2. Play / Stop / Proc controls
 * 3. Hush radio buttons to mute drums
 */
import MuteDrum from "./MuteDrum";
import PlayStopButtons from "./PlayStopButtons";
import TempoControl from "./TempoControl";

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

      {/* Play / Stop */}
      <PlayStopButtons onPlay={onPlay} onStop={onStop} />

      {/* Mute drums Button */}
      <MuteDrum p1Hush={p1Hush} setP1Hush={setP1Hush} />

      <TempoControl tempo={tempo} setTempo={setTempo} />
    </div>
  );
}
