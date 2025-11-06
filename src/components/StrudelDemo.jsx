/**
 * Main Container
 */
import { useRef, useEffect, useState } from "react";
import useStrudelEditor from "../hooks/useStrudelEditor";
import PreProessTextArea from "./Editor/PreProessTextArea";
import ControlsPanel from "./Controls/ControlsPanel";
import PianoRollCanvas from "./Canvas/PianoRollCanvas";
import console_monkey_patch from "../console-monkey-patch";
import { stranger_tune } from "../tunes";
import SelectorPanel from "./Selectors/SelectorPanel";
import { buildAndEvaluate } from "../hooks/useProcessedEditor";
import usePlaybackControls from "../hooks/usePlaybackControls";

export default function StrudelDemo() {
  // Refs to DOM elements used by the Strudel editor
  const editorRootRef = useRef(null);
  const outputRootRef = useRef(null);
  const canvasRef = useRef(null);
  const procRef = useRef(null);

  const [procValue, setProcValue] = useState(stranger_tune || "");

  const [hush, setHush] = useState({
    // state for mute instruments
    drums: false,
    bass: false,
    arps: false,
  });

  const [tempo, setTempo] = useState(140); // State for tempo ( 140bpm as default )

  const [pattern, setPattern] = useState(0); // state for drum pattern ( pattern 0 as default )

  const [reverb, setReverb] = useState(0.6); // state for reverb control ( 0.6 as default reverb )

  const [volume, setVolume] = useState(1); // stat for volume control

  const [drumBank, setDrumBank] = useState("RolandTR808"); // state for select drum bank

  // Hook that mounts Strudel editor
  const { evaluate, stop, setCode, ready, getReplState, editor } =
    useStrudelEditor({
      editorRootRef,
      outputRootRef,
      canvasRef,
      initialCode: procValue,
    });

  const { handleProcAndPlay, handlePlay, handleStop, syncMuteStates } =
    usePlaybackControls({
      editor,
      setCode,
      evaluate,
      stop,
      getReplState,
      procValue,
      hush,
      reverb,
      volume,
      pattern,
      drumBank,
      tempo,
    });

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
   * 6. volume
   * 7. procValue (main Strudel code)
   */
  useEffect(() => {
    if (!editor) return;

    // Use a timeout to avoid triggering updates while the user is typing
    const timer = setTimeout(() => {
      buildAndEvaluate(
        {
          editor,
          setCode,
          evaluate,
          getReplState,
          procValue,
          hush,
          reverb,
          volume,
          pattern,
          drumBank,
          tempo,
        },
        { evaluateIfPlaying: true } // evaluate immediately if already playing
      );

      // Sync drum mute/unmute according to p1Hush
      syncMuteStates();
    }, 150);

    return () => clearTimeout(timer); // cleanup timeout if dependencies change
  }, [
    editor,
    setCode,
    evaluate,
    getReplState,
    procValue,
    hush,
    reverb,
    volume,
    pattern,
    drumBank,
    tempo,
  ]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-5xl font-bold text-red-500 text-center">
        Strudel Mixer
      </h2>

      <ControlsPanel
        onPlay={handlePlay}
        onStop={handleStop}
        onProcPlay={handleProcAndPlay}
        hush={hush}
        setHush={setHush}
        tempo={tempo}
        setTempo={setTempo}
        pattern={pattern}
        setPattern={setPattern}
        reverb={reverb}
        setReverb={setReverb}
        volume={volume}
        setVolume={setVolume}
      />

      <SelectorPanel
        drumBank={drumBank}
        setDrumBank={setDrumBank}
        pattern={pattern}
        setPattern={setPattern}
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
