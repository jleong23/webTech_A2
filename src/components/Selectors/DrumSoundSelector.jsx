export default function DrumSoundSelector({ drumBank, setDrumBank }) {
  const kits = [
    "RolandTR808",
    "RolandTR909",
    "KorgDDM110",
    "ElektronAnalogRytm",
  ];

  return (
    <div className="flex items-center gap-3">
      <label>Drum Kit</label>
      <select
        value={drumBank}
        onChange={(e) => setDrumBank(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded"
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
