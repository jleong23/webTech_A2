export default function ProcAndPlay({ onProcPlay }) {
  return (
    <div className="flex justify-center">
      {/* Proc & Play Button */}
      <button
        onClick={onProcPlay}
        className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 shadow-lg font-bold transition-colors duration-200"
      >
        Proc & Play
      </button>
    </div>
  );
}
