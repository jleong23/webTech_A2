import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function BarChart({ data }) {
  const svgRef = useRef(null);
  // A unique identifier for gradient to avoid conflicts if multiple charts exist
  const gradientId = `barGrad-${Math.random().toString(36).slice(2, 9)}`;

  //Triggers whenever data or gradientId changes.
  useEffect(() => {
    if (!data.length) return;
    const svg = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();

    // Maps data indices (0, 1, 2 …) to horizontal positions in the SVG.
    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.12);
    // Maps data values to vertical positions.
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 1])
      .range([height, 0]);

    // Smooth color gradient for line chart
    const defs = svg.selectAll("defs").data([0]).join("defs");
    const barGrad = defs
      .selectAll(`#${gradientId}`)
      .data([0])
      .join("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    barGrad
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#4facfe", opacity: 0.95 },
        { offset: "70%", color: "#00f2fe", opacity: 0.9 },
      ])
      .join("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color)
      .attr("stop-opacity", (d) => d.opacity);

    // Binds data array to rect elements
    const bars = svg.selectAll("rect.visual-bar").data(data, (_, i) => i);
    bars
      .join("rect")
      .classed("visual-bar", true)
      .attr("x", (_, i) => xScale(i)) // evenly spaced bars
      .attr("y", (d) => yScale(d)) // vertical start point
      .attr("width", xScale.bandwidth()) // width of each band
      .attr("height", (d) => Math.max(1, height - yScale(d)))
      .attr("rx", 2) // rounded corners
      .attr("fill", `url(#${gradientId})`) // applies gradient
      .attr("opacity", 0.98);
  }, [data, gradientId]);

  return <svg ref={svgRef} className="w-full h-40" />;
}
