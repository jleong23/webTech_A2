import { useState, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function VolumeSlider({ volume, setVolume }) {
  const [muted, setMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  // Sync muted state if volume is set externally
  useEffect(() => {
    if (volume === 0 && !muted) setMuted(true);
    if (volume > 0 && muted) setMuted(false);
  }, [volume]);

  const toggleMute = () => {
    if (!muted) {
      setPrevVolume(volume);
      setVolume(0);
      setMuted(true);
    } else {
      setVolume(prevVolume || 1);
      setMuted(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
      {/* Label with current volume */}
      <label className="flex justify-between font-bold text-gray-200">
        <span>Volume</span>
        <span className="text-red-400 font-mono">
          {muted ? 0 : volume.toFixed(2)}
        </span>
      </label>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg shadow-md text-white font-semibold transition-all duration-200 
          ${muted ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-700"}`}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        {muted ? "Muted" : "Unmuted"}
      </button>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : volume}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          setVolume(val);
          setMuted(val === 0);
          if (val > 0) setPrevVolume(val);
        }}
        className="w-full h-3 rounded-lg accent-red-600 cursor-pointer 
                   bg-gradient-to-r from-red-500/50 to-red-700/50 shadow-inner"
      />
    </div>
  );
}
