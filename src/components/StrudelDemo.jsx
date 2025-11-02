/**
 * Main Container
 */
import { useRef, useEffect, useState } from "react";
import useStrudelEditor from "../hooks/useStrudelEditor";
import PreProessTextArea from "./PreProessTextArea";
import ControlsPanel from "./Controls/ControlsPanel";
import PianoRollCanvas from "./PianoRollCanvas";
import console_monkey_patch from "../console-monkey-patch";
import { stranger_tune } from "../tunes";
import { processText } from "../utils/processText";

/**
 * - Toggles (mute/unmute) drum by adjusting postgain
 * - Accepts the 'editor' instance and a boolean 'mute'
 */
function toggleDrums(editor, mute) {
  if (!editor?.repl) return;
  const drums = editor.repl.state.scope?.drums;
  const drums2 = editor.repl.state.scope?.drums2;
  if (drums) drums.postgain(mute ? 0 : 1);
  if (drums2) drums2.postgain(mute ? 0 : 1);
}
/**
 * function to apply tempo to track
 */
function applyTempo(code, tempo) {
  const lines = code.split("\n"); // Split code by each line
  return lines
    .map(
      (line) =>
        line.startsWith("setcps(") // find lines starting with setcps
          ? `setcps(${tempo}/60/4)` // replace it with your tempo calculation
          : line // leave other lines unchanged
    )
    .join("\n"); // rejoin the lines back into one string
}

export default function StrudelDemo() {
  // Refs to DOM elements used by the Strudel editor
  const editorRootRef = useRef(null);
  const outputRootRef = useRef(null);
  const canvasRef = useRef(null);
  const procRef = useRef(null);

  const [procValue, setProcValue] = useState(stranger_tune || "");
  // Hush toggle for drums
  const [p1Hush, setP1Hush] = useState(false);
  // State for tempo ( 140bpm as default )
  const [tempo, setTempo] = useState(140);
  // state for drum pattern ( pattern 0 as default )
  const [pattern, setPattern] = useState(0);
  // state for reverb control ( 0.6 as default reverb )
  const [reverb, setReverb] = useState(0.6);

  // Hook that mounts Strudel editor
  const { evaluate, stop, setCode, ready, getReplState, editor } =
    useStrudelEditor({
      editorRootRef,
      outputRootRef,
      canvasRef,
      initialCode: procValue,
    });

  // Handler for "Proc & Play" button: preprocess, apply temppo, and update into editor.
  const handleProcAndPlay = () => {
    let replaced = processText(procValue, { p1Hush, reverb });

    replaced = replaced.replaceAll(
      "const pattern = 0",
      `const pattern = ${pattern}`
    );
    const replacedTempo = applyTempo(replaced, tempo);
    setCode(replacedTempo);
    evaluate();
  };

  // Play handler
  const handlePlay = () => {
    evaluate();
  };

  // Stop handler
  const handleStop = () => {
    stop();
  };

  // Run console monkey patch and d3Date listener once
  useEffect(() => {
    console_monkey_patch();

    const handleD3Data = (e) => {
      console.log("D3 data event: ", e.detail);
    };
    document.addEventListener("d3Data", handleD3Data);

    return () => {
      document.removeEventListener("d3Data", handleD3Data);
    };
  }, []);

  /**
   * When p1Hush, procValue or tempo changes, it:
   * 1. Process the text ( to apply HUSH )
   * 2. Apply tempo changes
   * 3. Set it into editor
   * 4. If music is playing, it re-evaluate to update playback and toggle drums as needed
   */
  useEffect(() => {
    if (!editor) return;

    // Use timeOuts to debounce tempo changes to prevent choppy playbacks
    const timer = setTimeout(() => {
      let replaced = processText(procValue, { p1Hush, reverb });

      replaced = replaced.replaceAll(
        "const pattern = 0",
        `const pattern = ${pattern}`
      );
      const replacedTempo = applyTempo(replaced, tempo);
      setCode(replacedTempo);
      // Apply immediately if music is already playing
      if (getReplState().started) {
        evaluate(); // re-evaluate code
        toggleDrums(editor, p1Hush); // mute/unmute drums
      }
    }, 200);

    // Clean up to cancel previous timer if slider is used again
    return () => clearTimeout(timer);
  }, [p1Hush, procValue, tempo, pattern, editor, reverb]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-5xl font-bold text-red-500 text-center">
        Strudel Mixer
      </h2>

      <ControlsPanel
        onPlay={handlePlay}
        onStop={handleStop}
        onProcPlay={handleProcAndPlay}
        p1Hush={p1Hush}
        setP1Hush={setP1Hush}
        tempo={tempo}
        setTempo={setTempo}
        pattern={pattern}
        setPattern={setPattern}
        reverb={reverb}
        setReverb={setReverb}
      />
      {/* Status info */}
      <div className="mt-2  text-gray-200 flex justify-center gap-6">
        <div>Editor ready: {ready ? "yes" : "no"}</div>
        <div>Repl started: {getReplState().started ? "yes" : "no"}</div>
      </div>

      {/* Editor  */}
      <div className="mt-6 space-y-6">
        <PreProessTextArea
          procValue={procValue}
          onProcChange={setProcValue}
          procRef={procRef}
          editorRootRef={editorRootRef}
          outputRootRef={outputRootRef}
        />{" "}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-2">
          <PianoRollCanvas canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}
