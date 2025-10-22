import { useEffect, useRef } from "react";

export default function PianoRollCanvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // getBoundingClientRect() returns the size of the canvas on screen
    const rect = canvas.getBoundingClientRect();
    // Get the device pixel ratio (for high-DPI / Retina displays)
    const dpr = window.devicePixelRatio || 1;
    // Set pixel dimension for the canvas (ensure clarity)
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
  }, []);

  return (
    <canvas
      id="roll"
      ref={(element) => {
        if (props.canvasRef) props.canvasRef.current = element;
        canvasRef.current = element;
      }}
      className="w-full h-96 border rounded bg-slate-900 mt-3"
    />
  );
}
