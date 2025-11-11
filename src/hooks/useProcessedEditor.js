/**
 * BuildAndEvaluate:
 * - Applying HUSH
 * - Select drum pattern
 * - Select drum bank.
 * - Current tempo
 * After processing the code, it updates the editor via setCode.
 */
import { audioProcess } from "../utils/audioProcess";
import { changeDrumBank, applyTempo } from "../utils/editorHelpers";
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

  // 1. Apply audio effects like hush (mute), reverb, and volume.
  let replaced = audioProcess(procValue, {
    p1Hush: hush.drums,
    p2Hush: hush.bass,
    p3Hush: hush.arps,
    reverb,
    volume,
  });

  // 2. Inject the selected drum pattern into the code.
  replaced = replaced.replaceAll(
    "const pattern = 0",
    `const pattern = ${pattern}`
  );

  // 3. Set the chosen drum sound bank.
  replaced = changeDrumBank(replaced, drumBank);

  // 4. Apply the current tempo to the code.
  const replacedTempo = applyTempo(replaced, tempo);

  // 5. Update the editor's content with the newly constructed code.
  setCode(replacedTempo);

  // 6. If music is already playing, re-evaluate the code to apply changes immediately.
  if (opts.evaluateIfPlaying && getReplState().started) {
    evaluate();
  }
}
