import { audioProcess } from "../utils/audioProcess";
import { changeDrumBank, applyTempo } from "../utils/editorHelpers";
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
export function buildAndEvaluate(
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
  opts = { evaluateIfPlaying: true }
) {
  if (!editor) return;

  // Apply Hush & reverb effect
  let replaced = audioProcess(procValue, {
    p1Hush: hush.drums,
    p2Hush: hush.bass,
    p3Hush: hush.arps,
    reverb,
    volume,
  });

  // Update drum pattern
  replaced = replaced.replaceAll(
    "const pattern = 0",
    `const pattern = ${pattern}`
  );

  // Update drum bank
  replaced = changeDrumBank(replaced, drumBank);

  // Update tempo
  const replacedTempo = applyTempo(replaced, tempo);

  // Update editor code
  setCode(replacedTempo);

  // Re-evaluate if music is currently playing
  if (opts.evaluateIfPlaying && getReplState().started) {
    evaluate();
  }
}
