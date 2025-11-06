export default function MuteControls({ hush, setHush }) {
  const toggle = (key) => setHush((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full max-w-sm mx-auto">
      <h3 className="text-lg font-bold text-red-500 mb-3">Hush (Mute)</h3>

      <div className="flex flex-col gap-3">
        {["drums", "bass", "arps"].map((key) => (
          <div
            key={key}
            className="flex items-center justify-between bg-gray-700 rounded-md px-3 py-2"
          >
            <span className="text-white font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hush[key]}
                onChange={() => toggle(key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-red-600 transition-colors duration-200"></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  hush[key] ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
