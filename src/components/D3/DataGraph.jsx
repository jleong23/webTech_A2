import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function DataGraph({ data }) {
  const lineRef = useRef(null);
  const barRef = useRef(null);

  // Define the maximum number of data points to display in the charts at any given time.
  const maxPoints = 50;

  // --- Data Processing ---
  // This section prepares the raw `data` prop for visualization.

  // 1. Convert the incoming data array (which may contain non-numeric values) into an array of numbers.
  //    Invalid values are converted to 0.
  const numericData = data ? data.map((v) => parseFloat(v) || 0) : [];

  // 2. Split the numeric data into thirds. We'll use the first third for the bass chart
  //    and the second third for the drum chart.
  const third = Math.ceil(numericData.length / 3);
  const bassData = numericData.slice(0, third).slice(-maxPoints);
  const drumData = numericData.slice(third, 2 * third).slice(-maxPoints);

  /*** LINE CHART (Bass) ***/
  useEffect(() => {
    if (!bassData.length) return;
    const svg = d3.select(lineRef.current);
    const { width, height } = svg.node().getBoundingClientRect();
    // Clear any previous rendering before drawing the new chart.
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

    // Append a 'path' element to the SVG and use the line generator to set its 'd' attribute.
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

    // A band scale is used for the x-axis to position the bars with proper spacing.
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
        {/* The ref attributes connect the useRef hooks to these specific SVG elements. */}
        <svg ref={barRef} className="w-full h-32" />
      </div>
    </div>
  );
}
