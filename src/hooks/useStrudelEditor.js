/**
 * useStrudelEditor:
 * Custom hook that creates, manages and clean up strudel code editor(StudelMirror)
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { StrudelMirror } from "@strudel/codemirror"; // CodeMirror text editor component
import { transpiler } from "@strudel/transpiler"; // Converts strudel code -> executable Javascript
import { drawPianoroll } from "@strudel/draw"; // Used to draw visual notes
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
  initAudioOnFirstClick,
} from "@strudel/webaudio";
// Loads soundfont instruments
import { registerSoundfonts } from "@strudel/soundfonts";
import { evalScope } from "@strudel/core";

export default function useStrudelEditor({
  editorRootRef,
  canvasRef, // ref to <canvas> for drawing pianoRoll
  outputRootRef,
  initialCode = "", // empty code for start
}) {
  const editorRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!editorRootRef.current) return; // if editor div not ready, stop

    // Canvas for drawing piano roll
    const canvas = canvasRef.current;
    const context = canvas ? canvas.getContext("2d") : null;
    const drawTime = [-2, 2]; // Time range (seconds) shown on the pianoroll

    if (canvas) {
      canvas.width = (canvas.clientWidth || 400) * 2;
      canvas.height = (canvas.clientHeight || 150) * 2;
    }

    // Initialize strudel editor
    editorRef.current = new StrudelMirror({
      root: editorRootRef.current, // mount editor inside <div>
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime, // track playback time
      transpiler, // parse & execute code
      drawTime,
      onDraw: (haps, time) =>
        drawPianoroll({ haps, time, ctx: context, drawTime, fold: 0 }),

      // Run once before evaluation - loads all Strudel modules
      prebake: async () => {
        initAudioOnFirstClick(); // make sure browser allows audio
        const loadModules = evalScope(
          import("@strudel/core"),
          import("@strudel/draw"),
          import("@strudel/mini"),
          import("@strudel/tonal"),
          import("@strudel/webaudio")
        );

        // Use await to wait for everything to load ( modules + sounds )
        await Promise.all([
          loadModules,
          registerSynthSounds(),
          registerSoundfonts(),
        ]);
      },
      outputRoot: outputRootRef?.current ?? undefined,
    });

    if (initialCode) editorRef.current.setCode(initialCode); // Set initial code

    setReady(true);

    return () => {
      editorRef.current?.stop?.();
      // clear editor DOM
      if (editorRootRef.current) editorRootRef.current.innerHTML = "";
      editorRef.current = null;
      setReady(false);
    };
  }, [editorRootRef, canvasRef, outputRootRef, initialCode]);

  // Helper Functions
  const evaluate = useCallback(() => editorRef.current?.evaluate(), []); // Play
  const stop = useCallback(() => editorRef.current?.stop(), []); // Stop
  const setCode = useCallback((code) => editorRef.current?.setCode(code), []); // Set the text in the editor
  const getReplState = useCallback(
    () => editorRef.current?.repl?.state ?? {},
    []
  ); // Get the current REPL (interpreter) state - whether it's running

  return {
    editor: editorRef.current, // raw strudelMirror instance
    evaluate, // function to execute strudel code in editor
    stop, // stop all playback
    setCode, // set code in the editor
    ready, // set true when editor is initialised
    getReplState, // get current state
  };
}
