/**
 * Main Container
 */
import { useRef, useEffect, useState, useCallback } from "react";
import useStrudelEditor from "../hooks/useStrudelEditor";
import PreProessTextArea from "./PreProessTextArea";
import ControlsPanel from "./Controls/ControlsPanel";
import PianoRollCanvas from "./PianoRollCanvas";
import console_monkey_patch from "../console-monkey-patch";
import { stranger_tune } from "../tunes";
import { processText } from "../utils/processText";
import SelectorPanel from "./Selectors/SelectorPanel";

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

/**
 * function to change drum sound by replacing .bank(..)
 */
function changeDrumBank(code, bankName) {
  return code.replace(/\.bank\([^)]*\)/g, `.bank("${bankName}")`);
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
  // state for select drum bank
  const [drumBank, setDrumBank] = useState("RolandTR808");
  // state for select drum beat
  const [beat, setBeat] = useState(0);

  // Hook that mounts Strudel editor
  const { evaluate, stop, setCode, ready, getReplState, editor } =
    useStrudelEditor({
      editorRootRef,
      outputRootRef,
      canvasRef,
      initialCode: procValue,
    });

  /**
   * BuildAndEvaluate:
   * - Applying HUSH
   * - Select drum kick pattern
   * - Current tempo
   * - Select drum bank.
   * - Reverb value
   * After processing the code, it updates the editor via setCode.
   * useCallBack: prevent useEffect from trigger unnecessarily.
   */
  const buildAndEvaluate = useCallback(
    (opts = { evaluateIfPlaying: true }) => {
      if (!editor) return;
      let replaced = processText(procValue, { p1Hush, reverb }); // apply HUSH & reverb effect
      replaced = replaced.replaceAll(
        "const pattern = 0",
        `const pattern = ${pattern}`
      ); // Update drum pattern
      replaced = changeDrumBank(replaced, drumBank); // Update drumBank
      const replacedTempo = applyTempo(replaced, tempo); // Update tempo
      setCode(replacedTempo); // update editor with processed code
      // If music is currently playing, re-evaluate to update playback
      if (opts.evaluateIfPlaying && getReplState().started) {
        evaluate();
      }
    },
    [
      procValue,
      p1Hush,
      reverb,
      pattern,
      drumBank,
      tempo,
      editor,
      evaluate,
      getReplState,
      setCode,
    ]
  );

  // Handler for "Proc & Play" button: calls buildAndEvalute function to ensure everything is runnable.
  const handleProcAndPlay = () => {
    buildAndEvaluate({ evaluateIfPlaying: false });
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
   * Update editor when changes made:
   * 1. p1Hush (mute/unmute drums)
   * 2. tempo
   * 3. pattern
   * 4. reverb
   * 5. drumBank
   * .6 procValue (main Strudel code)
   */
  useEffect(() => {
    if (!editor) return;
    // Timeout ensures smooth updates without interrupting user typing.
    const timer = setTimeout(() => {
      buildAndEvaluate({ evaluateIfPlaying: true });
      // Sync drum mute/unmute according to p1Hush
      toggleDrums(editor, p1Hush);
    }, 150);
    return () => clearTimeout(timer);
  }, [
    p1Hush,
    procValue,
    tempo,
    pattern,
    editor,
    reverb,
    drumBank,
    buildAndEvaluate,
  ]);

  // Re-evaluate when drumBank changes when music is playing to ensure drumKit updates sound immediately
  useEffect(() => {
    if (!editor) return;
    if (getReplState().started) {
      buildAndEvaluate({ evaluateIfPlaying: true });
    }
  }, [drumBank, editor, buildAndEvaluate, getReplState]);

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

      <SelectorPanel
        drumBank={drumBank}
        setDrumBank={setDrumBank}
        pattern={pattern}
        setPattern={setPattern}
        beat={beat}
        setBeat={setBeat}
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
        <div>
          <PianoRollCanvas canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}
