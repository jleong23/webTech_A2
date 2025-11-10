export default function ProcAndPlay({ onProcPlay, isPlaying }) {
  return (
    <div className="flex justify-center">
      {/* Proc & Play Button */}
      <button
        onClick={onProcPlay}
        className={`
          px-8 py-3 rounded-2xl font-accent text-lg font-bold 
          transition-all duration-300 shadow-2xl
          ${
            isPlaying
              ? "bg-red-500 shadow-red-400/50 animate-pulse"
              : "bg-red-600 hover:bg-red-700"
          }
          text-white
        `}
      >
        PROC & PLAY
      </button>
    </div>
  );
}
