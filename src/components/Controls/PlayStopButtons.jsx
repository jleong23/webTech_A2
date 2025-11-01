import { FaPlay, FaPause } from "react-icons/fa";

function PlayStopButtons({ onPlay, onStop }) {
  return (
    <>
      <div className="flex gap-3">
        {/* Play Button */}
        <button
          onClick={onPlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 text-white shadow-md transition-colors duration-200"
        >
          <FaPlay className="w-5 h-5" />
        </button>

        {/* Stop Button */}
        <button
          onClick={onStop}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white shadow-md transition-colors duration-200"
        >
          <FaPause className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default PlayStopButtons;
