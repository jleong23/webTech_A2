/**
 * Main Container
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

  /**
   * Sets up global configurations on initial component mount.
   * This includes a console monkey-patch for Strudel's output and
   * an event listener for D3.js data visualizations.
   */
  useEffect(() => {
    console_monkey_patch();

    const handleD3Data = (e) => {
      setD3Data(e.detail);
    };
    document.addEventListener("d3Data", handleD3Data);

    return () => {
      document.removeEventListener("d3Data", handleD3Data);
    };
  }, []);

  /**
   * This is the main effect that reacts to any change in the audio controls or editor code.
   * It rebuilds the Strudel code with the current state (tempo, volume, etc.)
   * and re-evaluates it in the audio engine. A debounce timer is used to prevent
   * excessive updates while the user is actively changing values.
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
          syncMuteStates,
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
        Strudel Mixer
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
        A panel dedicated to selecting drum kits and patterns.
      */}
      <SelectorPanel
        drumBank={drumBank}
        setDrumBank={setDrumBank}
        pattern={pattern}
        setPattern={setPattern}
      />
      {/* 
        Displays the initialization status of the Strudel editor and its audio engine (REPL).
        Useful for debugging and understanding the system's state.
      */}
      <div className="mt-2  text-gray-200 flex justify-center gap-6">
        <div>Editor ready: {ready ? "yes" : "no"}</div>

        {/* 
          'getReplState().started' is true when the audio engine (REPL) is active.
          This happens after playback is initiated and becomes false when playback is stopped.
        */}
        <div>Repl started: {getReplState().started ? "yes" : "no"}</div>
      </div>

      {/* 
        Component providing buttons to save the current state to a JSON file or load from one.
      */}
      <div className="mt-4 flex justify-end">
        <SaveJSON
          saveToJson={saveToJson}
          loadFromJson={loadFromJson}
          statusMessage={statusMessage}
        />
      </div>

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
