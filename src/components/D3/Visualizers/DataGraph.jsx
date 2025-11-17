/**
 * DataGraph:
 * Processes raw numeric audio data and renders bass frequencies and drum frequencies
 */
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default function DataGraph({ data }) {
  const maxPoints = 50;

  // ensure input data is Numeric
  const numericData = Array.isArray(data)
    ? data.map((v) => parseFloat(v) || 0) // ensure input data is Numeric , if not = 0
    : [];
  const third = Math.ceil(numericData.length / 3); //

  // maxPoints to limit chart width
  const bassData = numericData.slice(0, third).slice(-maxPoints);
  const drumData = numericData.slice(third, 2 * third).slice(-maxPoints);

  return (
    <div className="mt-3 h-96 p-2 border rounded bg-black space-y-4">
      <LineChart data={bassData} />
      <BarChart data={drumData} />
    </div>
  );
}
