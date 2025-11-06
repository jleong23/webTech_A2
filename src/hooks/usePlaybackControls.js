import { useCallback } from "react";
import { buildAndEvaluate } from "./useProcessedEditor";
import { toggleDrums, toggleArp, toggleBass } from "../utils/editorHelpers";

export default function usePlaybackControls({
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
        hush,
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
    hush,
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

  const syncMuteStates = useCallback(() => {
    if (!editor) return;
    toggleDrums(editor, hush.drums);
    toggleBass(editor, hush.bass);
    toggleArp(editor, hush.arps);
  }, [editor, hush]);

  return {
    handleProcAndPlay,
    handlePlay,
    handleStop,
    syncMuteStates,
  };
}
