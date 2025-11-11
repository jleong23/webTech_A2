/**
 * usePlaybackControls:
 * Manages playback controls for the Strudel editor.
 */
import { useCallback } from "react";
import { buildAndEvaluate } from "./useProcessedEditor";
import { toggleDrums, toggleArp, toggleBass } from "../utils/editorHelpers";
export default function usePlaybackControls({
  editor,
  setCode,
  evaluate,
  setIsPlaying,
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
  /**
   * handleProcAndPlay:
   * Processes the code and starts playback.
   * It uses useCallback to prevent unnecessary re-renders.
   */
  // Proc & Play handler
  const handleProcAndPlay = useCallback(() => {
    setIsPlaying(true);

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
    setIsPlaying,
  ]);

  /**
   * handlePlay:
   * Starts playback.
   * It uses useCallback to prevent unnecessary re-renders.
   */
  // Play handler
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    evaluate();
  }, [evaluate, setIsPlaying]);

  /**
   * handleStop:
   * Stops playback.
   * It uses useCallback to prevent unnecessary re-renders.
   */
  // Stop handler
  const handleStop = useCallback(() => {
    setIsPlaying(false);
    stop();
  }, [stop, setIsPlaying]);

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
