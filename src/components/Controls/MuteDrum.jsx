export default function MuteDrum({ p1Hush, setP1Hush }) {
  return (
    <div className="mt-3">
      <label className="block text-sm font-medium mb-2 text-gray-600">
        Hush
      </label>
      <div className="flex items-center gap-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="p1"
            checked={!p1Hush}
            onChange={() => setP1Hush(false)}
            className="w-5 h-5 text-green-500 accent-green-500 focus:ring-2 focus:ring-green-400"
          />
          <span className="ml-2 text-gray-600 font-medium">ON</span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="p1"
            checked={p1Hush}
            onChange={() => setP1Hush(true)}
            className="w-5 h-5 text-red-500 accent-red-500 focus:ring-2 focus:ring-red-400"
          />
          <span className="ml-2 text-gray-600 font-medium">HUSH</span>
        </label>
      </div>
    </div>
  );
}
