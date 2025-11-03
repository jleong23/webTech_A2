import DrumSoundSelector from "./DrumSoundSelector";
import DrumKickSelector from "./DrumKickSelector";
import DrumBeatSelector from "./DrumBeatSelector";
export default function SelectorPanel({
  drumBank,
  setDrumBank,
  pattern,
  setPattern,
  beat,
  setBeat,
}) {
  return (
    <div className="mt-4 p-5 bg-gray-800 rounded-2xl shadow-md border border-gray-700">
      <h3 className="text-lg font-bold text-red-400 mb-3 tracking-wide uppercase">
        Drum Controls
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DrumSoundSelector drumBank={drumBank} setDrumBank={setDrumBank} />
        <DrumKickSelector pattern={pattern} setPattern={setPattern} />
        <DrumBeatSelector beat={beat} setBeat={setBeat} />
      </div>
    </div>
  );
}
