import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function DataGraph({ data }) {
  const lineRef = useRef(null);
  const barRef = useRef(null);
  const maxPoints = 50;

  // Split data into top 1/3 = bass, bottom 1/3 = drums
  const numericData = data ? data.map((v) => parseFloat(v) || 0) : [];
  const third = Math.ceil(numericData.length / 3);
  const bassData = numericData.slice(0, third).slice(-maxPoints);
  const drumData = numericData.slice(third, 2 * third).slice(-maxPoints);

  /*** LINE CHART (Bass) ***/
  useEffect(() => {
    if (!bassData.length) return;
    const svg = d3.select(lineRef.current);
    const { width, height } = svg.node().getBoundingClientRect();
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, maxPoints - 1])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bassData) || 1])
      .range([height, 0]);
    const line = d3
      .line()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(bassData)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#ff4d4d")
      .attr("stroke-width", 2);
  }, [bassData]);

  /*** BAR CHART (Drums) ***/
  useEffect(() => {
    if (!drumData.length) return;
    const svg = d3.select(barRef.current);
    const { width, height } = svg.node().getBoundingClientRect();
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(d3.range(drumData.length))
      .range([0, width])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(drumData) || 1])
      .range([height, 0]);

    svg
      .selectAll("rect")
      .data(drumData)
      .join("rect")
      .attr("x", (_, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "#4dd2ff");
  }, [drumData]);

  return (
    <div>
      <div className="mt-3 h-96 p-2 border rounded bg-black space-y-4">
        <svg ref={lineRef} className="w-full h-32" />
        <svg ref={barRef} className="w-full h-32" />
      </div>
    </div>
  );
}
