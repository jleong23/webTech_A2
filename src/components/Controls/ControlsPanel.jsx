/**
 * ControlsPanel:
 * Renders a control panel with various audio controls.
 * This component includes playback buttons, mute toggles, and sliders for
 * tempo, reverb, and volume. It aggregates several smaller control components
 * into a single, unified panel.
 */

import MuteControls from "./MuteControls";
import PlayStopButtons from "../Controls/PlayStopButtons";
import ProcAndPlay from "../Controls/ProcAndPlay";
import TempoControl from "../Controls/TempoControl";
import ReverbControl from "../Controls/ReverbControl";
import VolumeSlider from "./VolumeSlider";

export default function ControlsPanel({
  onPlay,
  onStop,
  onProcPlay,
  hush,
  setHush,
  tempo,
  setTempo,
  volume,
  setVolume,
  reverb,
  setReverb,
  isPlaying,
}) {
  return (
    <div className="p-5 space-y-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-xl mx-auto">
      <ProcAndPlay onProcPlay={onProcPlay} />

      {/* Play / Stop */}
      <PlayStopButtons onPlay={onPlay} onStop={onStop} isPlaying={isPlaying} />

      {/* Mute drums Button */}
      <MuteControls hush={hush} setHush={setHush} />

      {/* Tempo Change slider */}
      <TempoControl tempo={tempo} setTempo={setTempo} />

      {/* Reverb Control slider */}
      <ReverbControl reverb={reverb} setReverb={setReverb} />

      {/* Volume Control slider */}
      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  );
}
