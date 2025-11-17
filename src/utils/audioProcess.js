/**
 *  audioProcess:
 * Replaces placeholders in Strudel code with actual code with values for mute states, reverb, and volume,
 */
export function audioProcess(
  text,
  options = { p1Hush: false, p2Hush: false, p3Hush: false, reverb: 0.6 }
) {
  if (!text) return ""; // returns empty string if no input
  let result = text;
  // Determine mute replacements based on user settings
  const muteDrums = options.p1Hush ? "_" : "";
  const muteBass = options.p2Hush ? "//" : "";
  const muteArp = options.p3Hush ? "//" : "";

  // Replace placeholders in code with mute strings
  result = result.replaceAll("<p1_Radio>", muteDrums);
  result = result.replaceAll("<p2_Radio>", muteBass);
  result = result.replaceAll("<p3_Radio>", muteArp);

  // reverb handler
  result = result.replaceAll("<reverb>", options.reverb);

  // volume handler
  result = result.replaceAll("<volume>", options.volume);

  return result;
}
