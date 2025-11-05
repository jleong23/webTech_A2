import { FaPlay, FaPause } from "react-icons/fa";

function PlayStopButtons({ onPlay, onStop }) {
  return (
    <>
      <div className="flex justify-center gap-6">
        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg"
        >
          <FaPlay className="w-6 h-6" />
        </button>

        {/* Stop Button */}
        <button
          onClick={onStop}
          className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center shadow-lg"
        >
          <FaPause className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default PlayStopButtons;
