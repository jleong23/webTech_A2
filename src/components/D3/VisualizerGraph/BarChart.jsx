import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function BarChart({ data }) {
  const svgRef = useRef(null);
  const gradientId = `barGrad-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    if (!data.length) return;
    const svg = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.12);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 1])
      .range([height, 0]);

    // Gradient
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

    // Bind bars
    const bars = svg.selectAll("rect.visual-bar").data(data, (_, i) => i);
    bars
      .join("rect")
      .classed("visual-bar", true)
      .attr("x", (_, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.max(1, height - yScale(d)))
      .attr("rx", 2)
      .attr("fill", `url(#${gradientId})`)
      .attr("opacity", 0.98);
  }, [data, gradientId]);

  return <svg ref={svgRef} className="w-full h-40" />;
}
