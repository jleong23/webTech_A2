/**
 * useStrudelEditor: A custom Hook
 * - Creates and manage Strudel editor via StrudelMirror
 * - It set up audio and sound modules
 * - Draws a visual representation (pianoroll)
 * - Plays / stop music code
 * returns ( evaluate, stop, setCode )
 *
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
    if (canvas) {
      canvas.width = (canvas.clientWidth || 400) * 2;
      canvas.height = (canvas.clientHeight || 150) * 2;
    }

    //! ?
    const context = canvas ? canvas.getContext("2d") : null;
    const drawTime = [-2, 2];

    editorRef.current = new StrudelMirror({
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime, // track playback time
      transpiler, // parse & execute code
      root: editorRootRef.current, // mount editor inside <div>
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

    if (initialCode) editorRef.current.setCode(initialCode);

    setReady(true);

    return () => {
      try {
        editorRef.current?.stop?.();
        // clear editor DOM
        if (editorRootRef.current) {
          editorRootRef.current.innerHTML = "";
        }
      } finally {
        editorRef.current = null;
        setReady(false);
      }
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

  // Return everything to StrudelDemo
  return {
    editor: editorRef.current,
    evaluate,
    stop,
    setCode,
    ready,
    getReplState,
  };
}
