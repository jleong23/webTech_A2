import { useState, useEffect } from "react";

export default function VolumeSlider({ volume, setVolume }) {
  const [muted, setMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  // Sync muted state if volume is set externally
  useEffect(() => {
    if (volume === 0 && !muted) setMuted(true);
    if (volume > 0 && muted) setMuted(false);
  }, [volume]);

  const handleMute = () => {
    if (!muted) setPrevVolume(volume);
    setVolume(0);
    setMuted(true);
  };

  const handleUnmute = () => {
    setVolume(prevVolume || 1);
    setMuted(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label className="font-bold text-gray-200">
        Volume: {muted ? 0 : volume.toFixed(2)}
      </label>

      {/* Radio Buttons */}
      <div className="flex gap-4 mb-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={muted}
            onChange={handleMute}
            className="w-6 h-6 accent-red-600 cursor-pointer"
          />
          Mute
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!muted}
            onChange={handleUnmute}
            className="w-6 h-6 accent-red-600 cursor-pointer"
          />
          Unmute
        </label>
      </div>

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
        className="w-full accent-red-600 cursor-pointer"
      />
    </div>
  );
}
