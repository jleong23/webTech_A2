import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function DataGraph() {
  const maxItems = 50; // number of bars
  const maxValue = 3; // max value for y-axis
  const [data, setData] = useState([]);

  // Generate random data on mount
  useEffect(() => {
    const randomData = Array.from(
      { length: maxItems },
      () => Math.random() * maxValue
    );
    setData(randomData);
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select("#graph-svg");
    svg.selectAll("*").remove();

    const { width, height } = svg.node().getBoundingClientRect();
    const barWidth = width / data.length;
    const yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (_, i) => i * barWidth)
      .attr("y", (d) => yScale(d))
      .attr("width", barWidth - 2)
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "limegreen");
  }, [data]);

  return (
    <div className="mt-4 p-2 border rounded bg-gray-800">
      <h5 className="text-white mb-2">Random D3 Bar Graph</h5>
      <svg
        id="graph-svg"
        className="w-full h-64"
        style={{ height: "256px" }}
      ></svg>
    </div>
  );
}
