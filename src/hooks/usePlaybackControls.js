import { useCallback } from "react";
import { buildAndEvaluate } from "./useProcessedEditor";
import { toggleDrums } from "../utils/editorHelpers";

export default function usePlaybackControls({
  editor,
  setCode,
  evaluate,
  stop,
  getReplState,
  procValue,
  p1Hush,
  reverb,
  volume,
  pattern,
  drumBank,
  tempo,
}) {
  // Proc & Play handler
  const handleProcAndPlay = useCallback(() => {
    buildAndEvaluate(
      {
        editor,
        setCode,
        evaluate,
        getReplState,
        procValue,
        p1Hush,
        reverb,
        volume,
        pattern,
        drumBank,
        tempo,
      },
      { evaluateIfPlaying: false }
    );
    evaluate();
  }, [
    editor,
    setCode,
    evaluate,
    getReplState,
    procValue,
    p1Hush,
    reverb,
    volume,
    pattern,
    drumBank,
    tempo,
  ]);

  // Play handler
  const handlePlay = useCallback(() => {
    evaluate();
  }, [evaluate]);

  // Stop handler
  const handleStop = useCallback(() => {
    stop();
  }, [stop]);

  // Optional: toggle drums immediately on Hush change
  const syncDrums = useCallback(() => {
    toggleDrums(editor, p1Hush);
  }, [editor, p1Hush]);

  return {
    handleProcAndPlay,
    handlePlay,
    handleStop,
    syncDrums,
  };
}
