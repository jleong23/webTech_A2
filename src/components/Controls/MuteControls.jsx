export default function MuteControls({ hush, setHush }) {
  const toggle = (key) => setHush((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-4 bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-md w-full max-w-xl mx-auto">
      <h3 className="text-xl font-semibold text-red-400 mb-4 text-center">
        Hush (Mute)
      </h3>

      <div className="flex justify-around">
        {["drums", "bass", "arps"].map((key) => (
          <div key={key} className="flex flex-col items-center gap-2">
            {/* Instrument Name */}
            <span className="capitalize text-lg font-semibold">{key}</span>

            {/* Toggle Switch */}
            <label className="relative inline-block w-14 h-6">
              <input
                type="checkbox"
                checked={hush[key]}
                onChange={() => toggle(key)}
                className="sr-only peer"
              />
              {/* Track */}
              <span className="absolute inset-0 bg-gray-500/80 rounded-full peer-checked:bg-red-500 transition-colors"></span>
              {/* Thumb */}
              <span
                className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  hush[key] ? "translate-x-8" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
