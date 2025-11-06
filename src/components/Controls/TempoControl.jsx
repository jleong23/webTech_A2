import { useState } from "react";
import { TiTick } from "react-icons/ti";

export default function TempoControl({ tempo, setTempo }) {
  const [inputValue, setInputValue] = useState(tempo); // local input state

  // Apply only when tick is clicked
  const applyTempo = () => {
    const newTempo = Number(inputValue);
    if (!isNaN(newTempo) && newTempo > 0) {
      setTempo(newTempo);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-red-500">Tempo: {tempo} BPM</label>

      {/* Slider updates immediately */}
      <input
        type="range"
        min="50"
        max="200"
        value={tempo}
        onChange={(e) => setTempo(Number(e.target.value))}
        className="w-full accent-red-600 cursor-pointer"
      />

      {/* Input box with apply button */}
      <div className="flex items-center gap-2 self-center">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-20 bg-gray-800 border border-gray-700 text-center rounded-md text-white p-1"
        />
        <button
          onClick={applyTempo}
          className="bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
        >
          <TiTick size={18} />
        </button>
      </div>
    </div>
  );
}
