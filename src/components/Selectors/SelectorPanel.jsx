import DrumSoundSelector from "./DrumSoundSelector";
import DrumPatternSelector from "./DrumPatternSelector";

export default function SelectorPanel({
  drumBank,
  setDrumBank,
  pattern,
  setPattern,
}) {
  return (
    <div className="mt-4 p-5 bg-gray-800/70 rounded-2xl shadow-panel border border-gray-600 backdrop-blur-xl">
      <h3 className="text-lg font-accent text-red-400 mb-4 tracking-wide uppercase">
        Drum Controls
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DrumSoundSelector drumBank={drumBank} setDrumBank={setDrumBank} />
        <DrumPatternSelector pattern={pattern} setPattern={setPattern} />
      </div>
    </div>
  );
}
