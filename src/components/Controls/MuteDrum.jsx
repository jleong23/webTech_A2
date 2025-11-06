export default function MuteDrum({ p1Hush, setP1Hush }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-red-500">Hush</span>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="p1"
            checked={!p1Hush}
            onChange={() => setP1Hush(false)}
            className="w-5 h-5 accent-red-600"
          />
          ON
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="p1"
            checked={p1Hush}
            onChange={() => setP1Hush(true)}
            className="w-5 h-5 accent-red-600"
          />
          MUTE DRUMS
        </label>
      </div>
    </div>
  );
}
