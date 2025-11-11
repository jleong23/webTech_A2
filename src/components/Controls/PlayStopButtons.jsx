/**
 * PlayStopButtons:
 * Renders Play and Stop buttons for controlling audio playback.
 * The `isPlaying` prop visually indicates the active playback state,
 * and `onPlay`/`onStop` props handle the click events.
 */

import { FaPlay, FaPause } from "react-icons/fa";

function PlayStopButtons({ onPlay, onStop, isPlaying }) {
  return (
    <div className="flex justify-center gap-6">
      {/* Play Button */}
      <button
        onClick={onPlay}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
          ${isPlaying ? "bg-red-500 animate-pulse" : "bg-red-600 hover:bg-red-700"}
          text-white`}
        title="Play"
      >
        <FaPlay className="w-7 h-7" />
      </button>

      {/* Stop Button */}
      <button
        onClick={onStop}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
          bg-gray-800 hover:bg-gray-700 text-white`}
        title="Stop"
      >
        <FaPause className="w-7 h-7" />
      </button>
    </div>
  );
}

export default PlayStopButtons;
