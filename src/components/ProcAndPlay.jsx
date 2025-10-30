export default function ProcAndPlay({ onProcPlay }) {
  return (
    <div className="flex gap-3">
      {/* Proc & Play Button */}
      <button
        onClick={onProcPlay}
        className="flex items-center justify-center px-4 py-2 rounded-md bg-green-700 hover:bg-green-800 text-white font-medium shadow-md transition-colors duration-200"
      >
        Proc & Play
      </button>
    </div>
  );
}
