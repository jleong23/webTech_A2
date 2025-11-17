/**
 * DrumSoundSelector:
 * Renders a dropdown menu ( select element ) to allow users to choose a drum kit ( sound bank )
 * onChange event is triggered when user selects a new kit from the dropdown.
 */
export default function DrumSoundSelector({ drumBank, setDrumBank }) {
  const kits = [
    "RolandTR808",
    "RolandTR909",
    "KorgDDM110",
    "ElektronAnalogRytm",
  ];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-200 tracking-wide">
        Drum Kit
      </label>
      <select
        value={drumBank}
        onChange={(e) => setDrumBank(e.target.value)}
        className="bg-gray-700/70 text-white px-3 py-2 rounded-xl border border-gray-700
                   hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600
                   backdrop-blur-md transition-all duration-150 ease-in-out"
      >
        {kits.map((kit) => (
          <option key={kit} value={kit}>
            {kit}
          </option>
        ))}
      </select>
    </div>
  );
}
