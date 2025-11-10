export default function MuteControls({ hush, setHush }) {
  const toggle = (key) => setHush((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-6 bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-panel w-full max-w-xl mx-auto font-body">
      <h3 className="text-2xl font-heading text-red-400 mb-4">Hush (Mute)</h3>

      <div className="flex flex-col gap-4">
        {["drums", "bass", "arps"].map((key) => (
          <div
            key={key}
            className="flex items-center justify-between bg-gray-700/80 rounded-xl px-4 py-3 hover:bg-gray-700/90 transition-colors duration-200"
          >
            <span className="text-white font-medium capitalize">{key}</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hush[key]}
                onChange={() => toggle(key)}
                className="sr-only peer"
              />
              {/* Track */}
              <div className="w-14 h-7 bg-gray-500/80 rounded-full peer-checked:bg-red-500 transition-colors duration-300"></div>
              {/* Thumb */}
              <div
                className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  hush[key] ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
