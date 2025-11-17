import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function DataGraph({ data }) {
  const lineRef = useRef(null);
  const barRef = useRef(null);

  // Unique IDs so multiple instances won't collide
  const idsRef = useRef({
    lineGradient: `lineGrad-${Math.random().toString(36).slice(2, 9)}`,
    barGradient: `barGrad-${Math.random().toString(36).slice(2, 9)}`,
  });

  const maxPoints = 50;

  // --- Data Processing ---
  const numericData = Array.isArray(data)
    ? data.map((v) => parseFloat(v) || 0)
    : [];
  const third = Math.ceil(numericData.length / 3);
  const bassData = numericData.slice(0, third).slice(-maxPoints);
  const drumData = numericData.slice(third, 2 * third).slice(-maxPoints);

  /*** LINE CHART (Bass) ***/
  useEffect(() => {
    if (!bassData.length) return;
    const svgEl = lineRef.current;
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    const { width, height } = svg.node().getBoundingClientRect();

    // Protect against zero-length domain
    const denom = Math.max(1, bassData.length - 1);

    const xScale = d3.scaleLinear().domain([0, denom]).range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bassData) || 1])
      .range([height, 0]);

    const lineGenerator = d3
      .line()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    // Ensure defs + gradient exist (joined once)
    const defs = svg.selectAll("defs").data([0]).join("defs");
    const lineGrad = defs
      .selectAll(`#${idsRef.current.lineGradient}`)
      .data([0])
      .join("linearGradient")
      .attr("id", idsRef.current.lineGradient)
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

    // Bind path data (single path)
    const paths = svg.selectAll("path.visual-line").data([bassData]);

    paths
      .join(
        // ENTER: start as a flat line at bottom (so it doesn't jump from top-left/right)
        (enter) =>
          enter
            .append("path")
            .classed("visual-line", true)
            .attr("fill", "none")
            .attr("stroke", `url(#${idsRef.current.lineGradient})`)
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("opacity", 0.98)
            .attr("d", (d) =>
              d3
                .line()
                .x((_, i) => xScale(i))
                .y(() => height)(
                // flat baseline (bottom)
                d
              )
            )
            .call((enterSel) =>
              enterSel
                .transition()
                .duration(450)
                .ease(d3.easeCubicOut)
                .attr("d", lineGenerator)
            ),
        // UPDATE: smoothly transition to new path
        (update) =>
          update.call((upd) =>
            upd
              .transition()
              .duration(350)
              .ease(d3.easeCubicOut)
              .attr("d", lineGenerator)
          )
      )
      // remove isn't necessary (we always have exactly one), but keep tidy:
      .exit?.()
      .remove();
  }, [bassData]); // re-run when bassData changes

  /*** BAR CHART (Drums) ***/
  useEffect(() => {
    if (!drumData.length) return;
    const svgEl = barRef.current;
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    const { width, height } = svg.node().getBoundingClientRect();

    // band scale for bars
    const xScale = d3
      .scaleBand()
      .domain(d3.range(drumData.length))
      .range([0, width])
      .padding(0.12);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(drumData) || 1])
      .range([height, 0]);

    // Ensure defs + gradient exist for bars
    const defs = svg.selectAll("defs").data([0]).join("defs");
    const barGrad = defs
      .selectAll(`#${idsRef.current.barGradient}`)
      .data([0])
      .join("linearGradient")
      .attr("id", idsRef.current.barGradient)
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

    // DATA JOIN for bars
    const bars = svg.selectAll("rect.visual-bar").data(drumData, (_, i) => i);

    bars
      .join(
        // ENTER: start with height 0 (bottom), then transition to value
        (enter) =>
          enter
            .append("rect")
            .classed("visual-bar", true)
            .attr("x", (_, i) => xScale(i))
            .attr("width", xScale.bandwidth())
            .attr("y", height) // bottom
            .attr("height", 0)
            .attr("rx", 2)
            .attr("fill", `url(#${idsRef.current.barGradient})`)
            .attr("opacity", 0.98)
            .call((enterSel) =>
              enterSel
                .transition()
                .duration(350)
                .ease(d3.easeCubicOut)
                .attr("y", (d) => yScale(d))
                .attr("height", (d) => Math.max(1, height - yScale(d)))
            ),
        // UPDATE: move and resize existing bars
        (update) =>
          update.call((upd) =>
            upd
              .transition()
              .duration(300)
              .ease(d3.easeCubicInOut)
              .attr("x", (_, i) => xScale(i))
              .attr("width", xScale.bandwidth())
              .attr("y", (d) => yScale(d))
              .attr("height", (d) => Math.max(1, height - yScale(d)))
          )
      )
      // REMOVE: fade out removed bars
      .exit?.()
      .transition()
      .duration(200)
      .attr("y", height)
      .attr("height", 0)
      .remove();
  }, [drumData]); // re-run when drumData changes

  return (
    <div>
      <div className="mt-3 h-96 p-2 border rounded bg-gray-900 space-y-4">
        {/* Give the SVGs some padding internally via viewBox is possible, but for simplicity we rely on container sizing */}
        <svg ref={lineRef} className="w-full h-40" />
        <svg ref={barRef} className="w-full h-40" />
      </div>
    </div>
  );
}
