import { FaSave } from "react-icons/fa";
import { CiSaveUp2 } from "react-icons/ci";
export default function SaveJSON({ saveToJson, loadFromJson }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={saveToJson}
        className="bg-gray-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
      >
        <FaSave size={25} />
      </button>

      <label className="bg-gray-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-colors duration-150">
        <CiSaveUp2 size={25} />
        <input
          type="file"
          accept="application/json"
          onChange={(e) => e.target.files[0] && loadFromJson(e.target.files[0])}
          className="hidden"
        />
      </label>
    </div>
  );
}
