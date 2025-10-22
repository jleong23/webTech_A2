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

export default function StrudelDemo() {
  const editorRootRef = useRef(null);
  const outputRootRef = useRef(null);
  const canvasRef = useRef(null);
  const procRef = useRef(null);

  const [procValue, setProcValue] = useState(stranger_tune || "");
  const [p1Hush, setP1Hush] = useState(false);

  const { evaluate, stop, setCode, ready, getReplState } = useStrudelEditor({
    editorRootRef,
    outputRootRef,
    canvasRef,
    initialCode: procValue,
  });

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

  // PreProcess function (proc)
  const handlePreProcess = () => {
    const raw = procValue;
    const replaced = processText(raw, { p1Hush });
    //set the code into editor
    setCode(replaced);
  };

  const handleProcAndPlay = () => {
    handlePreProcess();
    evaluate();
  };

  const handlePlay = () => {
    evaluate();
  };

  const handleStop = () => {
    stop();
  };

  return (
    <div className="p-4">
      <h2 className="text-slate-500 text-center my-3 font-bold">
        Strudel Demo
      </h2>

      <ControlsPanel
        onPlay={handlePlay}
        onStop={handleStop}
        onPreprocess={handlePreProcess}
        onProcPlay={handleProcAndPlay}
        p1Hush={p1Hush}
        setP1Hush={setP1Hush}
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
          />
        </div>

        <PianoRollCanvas canvasRef={canvasRef} />
      </div>
    </div>
  );
}
