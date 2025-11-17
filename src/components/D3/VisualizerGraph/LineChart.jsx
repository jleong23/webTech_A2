import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function LineChart({ data }) {
  const svgRef = useRef(null);

  const gradientId = `lineGrad-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    if (!data.length) return;
    const svg = d3.select(svgRef.current);
    const { width, height } = svg.node().getBoundingClientRect();
    const xScale = d3
      .scaleLinear()
      .domain([0, Math.max(1, data.length - 1)])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 1])
      .range([height, 0]);

    const lineGenerator = d3
      .line()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    // Gradient
    const defs = svg.selectAll("defs").data([0]).join("defs");
    const lineGrad = defs
      .selectAll(`#${gradientId}`)
      .data([0])
      .join("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    lineGrad
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#ff7e5f", opacity: 0.95 },
        { offset: "60%", color: "#feb47b", opacity: 0.95 },
        { offset: "100%", color: "#ffd89b", opacity: 0.85 },
      ])
      .join("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color)
      .attr("stop-opacity", (d) => d.opacity);

    // Bind path
    svg
      .selectAll("path.visual-line")
      .data([data])
      .join("path")
      .classed("visual-line", true)
      .attr("fill", "none")
      .attr("stroke", `url(#${gradientId})`)
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .transition()
      .duration(350)
      .ease(d3.easeCubicOut)
      .attr("d", lineGenerator);
  }, [data, gradientId]);

  return <svg ref={svgRef} className="w-full h-40" />;
}
