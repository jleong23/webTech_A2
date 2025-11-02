/**
 * ControlPanel:
 * 1. Slider controls to set Tempo
 * 2. Play / Stop / Proc controls
 * 3. Hush radio buttons to mute drums
 */

import MuteDrum from "../Controls/MuteDrum";
import PlayStopButtons from "../Controls/PlayStopButtons";
import ProcAndPlay from "../Controls/ProcAndPlay";
import TempoControl from "../Controls/TempoControl";
import DrumPatternSelector from "../Controls/DrumPatternSelector";
import ReverbControl from "../Controls/ReverbControl";

export default function ControlsPanel({
  onPlay,
  onStop,
  onProcPlay,
  p1Hush,
  setP1Hush,
  tempo,
  setTempo,
  volume,
  setVolume,
  pattern,
  setPattern,
  reverb,
  setReverb,
}) {
  return (
    <div className="p-5 space-y-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      {/* Process text and Play Song */}
      <ProcAndPlay onProcPlay={onProcPlay} />

      {/* Play / Stop */}
      <PlayStopButtons onPlay={onPlay} onStop={onStop} />

      {/* Mute drums Button */}
      <MuteDrum p1Hush={p1Hush} setP1Hush={setP1Hush} />

      {/* Tempo Change slider */}
      <TempoControl tempo={tempo} setTempo={setTempo} />

      <DrumPatternSelector pattern={pattern} setPattern={setPattern} />

      <ReverbControl reverb={reverb} setReverb={setReverb} />
    </div>
  );
}
