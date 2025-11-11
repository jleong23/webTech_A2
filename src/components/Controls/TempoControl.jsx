import { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";

/**
 * Renders a slider and a number input to control the tempo (BPM).
 * It allows for both quick adjustments through the slider and precise input via the text box.
 */

export default function TempoControl({ tempo, setTempo }) {
  const [inputValue, setInputValue] = useState(tempo); // local input state

  // Keep local input synced if tempo changes externally
  useEffect(() => {
    setInputValue(tempo);
  }, [tempo]);

  // Apply only when tick is clicked
  const applyTempo = () => {
    const newTempo = Number(inputValue);
    if (!isNaN(newTempo) && newTempo > 0) {
      setTempo(newTempo);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
      <label className="flex justify-between font-bold text-gray-200">
        <span>Tempo</span>
        <span className="text-red-400 font-mono">{tempo} BPM</span>
      </label>

      {/* Slider */}
      <input
        type="range"
        min="50"
        max="200"
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
        className="w-full h-3 rounded-lg accent-red-600 cursor-pointer 
                   bg-gradient-to-r from-red-500/50 to-red-700/50 shadow-inner"
      />

      {/* Input box with apply button */}
      <div className="flex items-center gap-2 justify-center mt-1">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-20 bg-gray-800 border border-gray-700 text-center rounded-md text-white p-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={applyTempo}
          className="bg-red-600 hover:bg-red-700 text-white rounded-md p-2 shadow-md transition-all duration-200 active:scale-95"
        >
          <TiTick size={20} />
        </button>
      </div>
    </div>
  );
}
