/**
 * Main Container
 */
import { useRef, useEffect, useState } from "react";
import useStrudelEditor from "../hooks/useStrudelEditor";
import EditorPanel from "./EditorPanel";
import ControlsPanel from "./ControlsPanel";
import PianoRollCanvas from "./PianoRollCanvas";
import console_monkey_patch from "../console-monkey-patch";
import { stranger_tune } from "../tunes";
import { processText } from "../utils/processText";

function toggleDrums(editor, mute) {
  if (!editor?.repl) return;
  const drums = editor.repl.state.scope?.drums;
  const drums2 = editor.repl.state.scope?.drums2;
  if (drums) drums.postgain(mute ? 0 : 1);
  if (drums2) drums2.postgain(mute ? 0 : 1);
}
function applyTempo(code, tempo) {
  const cleaned = code.replace(/setcps\((.*?)\)/, "").trim();
  return `setcps(${tempo}/60/4)\n${cleaned}`;
}

export default function StrudelDemo() {
  const editorRootRef = useRef(null);
  const outputRootRef = useRef(null);
  const canvasRef = useRef(null);
  const procRef = useRef(null);

  const [procValue, setProcValue] = useState(stranger_tune || "");
  const [p1Hush, setP1Hush] = useState(false);

  const { evaluate, stop, setCode, ready, getReplState, editor } =
    useStrudelEditor({
      editorRootRef,
      outputRootRef,
      canvasRef,
      initialCode: procValue,
    });

  // State for tempo
  const [tempo, setTempo] = useState(140);

  const handleProcAndPlay = () => {
    const replaced = processText(procValue, { p1Hush });
    const replacedTempo = applyTempo(replaced, tempo);
    setCode(replacedTempo);
    evaluate();
  };

  const handlePlay = () => {
    evaluate();
  };

  const handleStop = () => {
    stop();
  };

  // run console monkey patch and d3Date listener once
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

  // Instant HUSH: replaces <p1_Radio> with _ and mutes drums immediately
  useEffect(() => {
    if (!editor) return;

    const replaced = processText(procValue, { p1Hush });
    const replacedTempo = applyTempo(replaced, tempo);
    setCode(replacedTempo);

    // Apply immediately if music is already playing
    if (getReplState().started) {
      evaluate(); // re-evaluate code
      toggleDrums(editor, p1Hush); // mute/unmute drums
    }
  }, [p1Hush, procValue, tempo]);

  return (
    <div className="p-4">
      <h2 className="text-slate-500 text-center my-3 font-bold">
        Strudel Demo
      </h2>

      <ControlsPanel
        onPlay={handlePlay}
        onStop={handleStop}
        onProcPlay={handleProcAndPlay}
        p1Hush={p1Hush}
        setP1Hush={setP1Hush}
        tempo={tempo}
        setTempo={setTempo}
      />

      <div className="space-y-4">
        <div className="mt-4 text-xs text-gray-500">
          <div>Editor ready: {ready ? "yes" : "no"}</div>
          <div>Repl started: {getReplState().started ? "yes" : "no"}</div>
        </div>
      </div>

      <div className=" w-full">
        <div className="space-y-3">
          <EditorPanel
            procValue={procValue}
            onProcChange={setProcValue}
            procRef={procRef}
            editorRootRef={editorRootRef}
            outputRootRef={outputRootRef}
          />{" "}
        </div>

        <PianoRollCanvas canvasRef={canvasRef} />
      </div>
    </div>
  );
}
