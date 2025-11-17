/**
 * Main Container: StrudelDemo.
 * This component orchestrates the logic of EchoLab:
 *  - Playback controls (play, stop, proc play)
 *  - Audio effect controls (volume, reverb, tempo, mute states)
 *  - Drum kit and pattern selection
 *  - Live visualizations (piano roll and music line/bar charts)
 *  - Strudel code editor and output
 *  - Save/Load functionality via JSON
 *
 * Responsibilities:
 *  1. Manage all states for playback, effects, and editor content
 *  2. Mount and control the Strudel editor via custom hooks
 *  3. Handle live D3 visualizations and REPL state
 *  4. Provide a unified layout and UI for the mixer
 */
import { useRef, useEffect, useState } from "react";
import useStrudelEditor from "../hooks/useStrudelEditor";
import PreProessTextArea from "./Editor/PreProessTextArea";
import ControlsPanel from "./Controls/ControlsPanel";
import console_monkey_patch from "../console-monkey-patch";
import { stranger_tune } from "../tunes";
import SelectorPanel from "./Selectors/SelectorPanel";
import { buildAndEvaluate } from "../hooks/useProcessedEditor";
import usePlaybackControls from "../hooks/usePlaybackControls";
import useSaveJSON from "../hooks/useSaveJSON";
import SaveJSON from "./SaveChanges/SaveJSON";
import Canvas from "./D3/Canvas";

export default function StrudelDemo() {
  // Refs to DOM elements used by the Strudel editor
  const editorRootRef = useRef(null);
  const outputRootRef = useRef(null);
  const canvasRef = useRef(null);
  const procRef = useRef(null);

  // return current global state of playback controls
  function getCurrentState() {
    return {
      hush,
      tempo,
      pattern,
      reverb,
      volume,
      drumBank,
      procValue,
    };
  }
  // --- State Hooks ---
  const [procValue, setProcValue] = useState(stranger_tune || "");
  const [hush, setHush] = useState({
    // state for mute instruments
    drums: false,
    bass: false,
    arps: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const [tempo, setTempo] = useState(140); // ( 140bpm as default )

  const [pattern, setPattern] = useState(0); // ( pattern 0 as default )

  const [reverb, setReverb] = useState(0.6); // ( 0.6 as default reverb )

  const [volume, setVolume] = useState(1); // state for volume control

  const [drumBank, setDrumBank] = useState("RolandTR808"); // state for select drum bank

  const [statusMessage, setStatusMessage] = useState("");

  const [d3Data, setD3Data] = useState(null);

  const { saveToJson, loadFromJson } = useSaveJSON({
    getCurrentState,
    setHush,
    setTempo,
    setPattern,
    setReverb,
    setVolume,
    setDrumBank,
    setProcValue,
    setStatusMessage,
  });

  // Hook that mounts Strudel editor
  const { evaluate, stop, setCode, ready, getReplState, editor } =
    useStrudelEditor({
      editorRootRef,
      outputRootRef,
      canvasRef,
      initialCode: procValue,
    });
  // Playback control hooks
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
      isPlaying,
      setIsPlaying,
    });

  useEffect(() => {
    console_monkey_patch(); // Call monkey patch for strudel editor output

    const handleD3Data = (e) => {
      // Listen to D3 data events for visualizations
      setD3Data(e.detail);
    };
    document.addEventListener("d3Data", handleD3Data);

    return () => {
      document.removeEventListener("d3Data", handleD3Data);
    };
  }, []);

  // Effects to rebuild and evaluate Strudel code on state changes
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
          syncMuteStates,
        },
        { evaluateIfPlaying: true } // evaluate immediately if already playing
      );

      // Sync drum mute/unmute according to hush state
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
    syncMuteStates,
  ]);

  /**
   * Manages the visibility of the status message for save/load operations.
   * The message automatically disappears after 2 seconds.
   */
  useEffect(() => {
    if (!statusMessage) return;
    const timer = setTimeout(() => setStatusMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-5xl font-heading font-bold text-red-500 text-center">
        EchoLab
      </h2>

      {/* 
        The main panel for all playback and audio effect controls.
      */}
      <ControlsPanel
        onPlay={handlePlay}
        onStop={handleStop}
        onProcPlay={handleProcAndPlay}
        isPlaying={isPlaying}
        hush={hush}
        setHush={setHush}
        tempo={tempo}
        setTempo={setTempo}
        volume={volume}
        setVolume={setVolume}
        reverb={reverb}
        setReverb={setReverb}
        saveToJson={saveToJson}
        loadFromJson={loadFromJson}
      />

      {/* 
        Panel for selecting drum kits and patterns.
      */}
      <SelectorPanel
        drumBank={drumBank}
        setDrumBank={setDrumBank}
        pattern={pattern}
        setPattern={setPattern}
      />
      {/* Editor and REPL status indicators */}
      <div className="mt-2  text-gray-200 flex justify-center gap-6">
        <div>Editor ready: {ready ? "yes" : "no"}</div>

        {/* 
          'getReplState().started' is true when the audio engine (REPL) is active.
        */}
        <div>Repl started: {getReplState().started ? "yes" : "no"}</div>
      </div>

      {/* Save / Load JSON panel */}
      <div className="mt-4 flex justify-end">
        <SaveJSON
          saveToJson={saveToJson}
          loadFromJson={loadFromJson}
          statusMessage={statusMessage}
        />
      </div>

      {/* Visualization Canvas */}
      <div className="mt-6 space-y-6">
        <div className="">
          <Canvas canvasRef={canvasRef} d3Data={d3Data} />
        </div>
        {/* 
        The collapsible section containing the code editor and the Strudel output/visualization.
      */}
        <PreProessTextArea
          procValue={procValue}
          onProcChange={setProcValue}
          procRef={procRef}
          editorRootRef={editorRootRef}
          outputRootRef={outputRootRef}
        />{" "}
      </div>
    </div>
  );
}
