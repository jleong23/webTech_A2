export default function MuteControls({ hush, setHush }) {
  const toggle = (key) => setHush((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-red-500">Hush (Mute)</span>

      {["drums", "bass", "arps"].map((key) => (
        <label key={key} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hush[key]}
            onChange={() => toggle(key)}
            className="w-5 h-5 accent-red-600"
          />
          {hush[key]
            ? `${key.charAt(0).toUpperCase() + key.slice(1)} Muted`
            : `${key.charAt(0).toUpperCase() + key.slice(1)} On`}
        </label>
      ))}
    </div>
  );
}
