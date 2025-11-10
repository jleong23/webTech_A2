import { FaSave } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
export default function SaveJSON({ saveToJson, loadFromJson, statusMessage }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-3">
        <button
          onClick={saveToJson}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
        >
          <span className="flex gap-2">
            Save
            <FaSave size={25} />
          </span>
        </button>

        <label className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-colors duration-150">
          <span className="flex gap-2">
            Load
            <CiSaveDown2 size={25} />
          </span>

          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) loadFromJson(file);
              e.target.value = ""; // dont trigger onChange again if same file selected.
            }}
            className="hidden"
          />
        </label>
      </div>

      {statusMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-fadeInOut">
          <div
            className={`px-3 py-2 rounded-xl shadow-2xl text-lg font-medium text-white backdrop-blur-xl transition-all duration-500 ${
              statusMessage.startsWith("Succesfully")
                ? "bg-green-500/60 shadow-green-400/70"
                : "bg-red-500/60 shadow-red-400/70"
            }`}
          >
            {statusMessage}
          </div>
        </div>
      )}
    </div>
  );
}
