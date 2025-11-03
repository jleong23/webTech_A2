import DrumSoundSelector from "./DrumSoundSelector";
export default function SelectorPanel({ drumBank, setDrumBank }) {
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded">
      <DrumSoundSelector drumBank={drumBank} setDrumBank={setDrumBank} />
    </div>
  );
}
