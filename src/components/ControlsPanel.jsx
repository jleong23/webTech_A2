/**
 * ControlPanel:
 * 1. Slider controls to set Tempo
 * 2. Play / Stop / Proc controls
 * 3. Hush radio buttons to mute drums
 */

import MuteDrum from "./MuteDrum";
import PlayStopButtons from "./PlayStopButtons";
import ProcAndPlay from "./ProcAndPlay";
import TempoControl from "./TempoControl";
import DrumPatternSelector from "./DrumPatternSelector";

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
}) {
  return (
    <div className="space-y-3">
      {/* Process text and Play Song */}
      <ProcAndPlay onProcPlay={onProcPlay} />

      {/* Play / Stop */}
      <PlayStopButtons onPlay={onPlay} onStop={onStop} />

      {/* Mute drums Button */}
      <MuteDrum p1Hush={p1Hush} setP1Hush={setP1Hush} />

      {/* Tempo Change slider */}
      <TempoControl tempo={tempo} setTempo={setTempo} />

      <DrumPatternSelector pattern={pattern} setPattern={setPattern} />
    </div>
  );
}
