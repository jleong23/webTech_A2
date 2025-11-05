/**
 * ControlsPanel:
 * Features:
 * 1. Process & play preprocessed text (ProcAndPlay)
 * 2. Play / Stop buttons for playback (PlayStopButtons)
 * 3. Mute/hush drums option (MuteDrum)
 * 4. Tempo adjustment slider (TempoControl)
 * 5. Reverb adjustment slider (ReverbControl)
 * 6. Volume adjustment slider (VolumeSlider)
 *
 * Props:
 * - onPlay: Callback to start playback
 * - onStop: Callback to stop playback
 * - onProcPlay: Callback to play processed text
 * - p1Hush / setP1Hush: State for muting drums
 * - tempo / setTempo: State for tempo value
 * - volume / setVolume: State for volume
 * - reverb / setReverb: State for reverb amount
 */

import MuteDrum from "../Controls/MuteDrum";
import PlayStopButtons from "../Controls/PlayStopButtons";
import ProcAndPlay from "../Controls/ProcAndPlay";
import TempoControl from "../Controls/TempoControl";
import ReverbControl from "../Controls/ReverbControl";
import VolumeSlider from "./VolumeSlider";

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

      {/* Reverb Control slider */}
      <ReverbControl reverb={reverb} setReverb={setReverb} />

      {/* Volume Control slider */}
      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  );
}
