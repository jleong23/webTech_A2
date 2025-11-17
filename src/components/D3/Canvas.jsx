/**
 * Canvas:
 * Renders main D3 visualtization components.
 * Displays:
 * 1. Piano Roll on the left
 * 2. Data Graph on the right
 */
import DataGraph from "./Visualizers/DataGraph";
import PianoRollCanvas from "./Visualizers/PianoRoll";

export default function Canvas({ canvasRef, d3Data }) {
  return (
    <div className="flex gap-4">
      {/* Piano Roll on the left */}
      <div className="flex-1">
        <label className="block font-accent font-semibold text-red-500 mb-2">
          Live Piano Roll
        </label>
        <PianoRollCanvas canvasRef={canvasRef} />
      </div>

      {/* Data Graph on the right */}
      <div className="flex-1">
        <label className="block font-accent font-semibold text-red-500 mb-2">
          Live Music Visualizer
        </label>
        <DataGraph data={d3Data} />
      </div>
    </div>
  );
}
