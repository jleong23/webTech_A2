/**
 *  useStrudelEditor: A util that takes raw Strudel Code (as text) & replaces certain placeholders with actual values depends on user option
 */
export function audioProcess(
  text,
  options = { p1Hush: false, p2Hush: false, p3Hush: false, reverb: 0.6 }
) {
  if (!text) return ""; // returns empty string if no input
  let result = text;

  const muteDrums = options.p1Hush ? "_" : ""; // keep as-is
  const muteBass = options.p2Hush ? "//" : "";
  const muteArp = options.p3Hush ? "//" : "";

  result = result.replaceAll("<p1_Radio>", muteDrums);
  result = result.replaceAll("<p2_Radio>", muteBass);
  result = result.replaceAll("<p3_Radio>", muteArp);

  // reverb handler
  result = result.replaceAll("<reverb>", options.reverb);

  // volume handler
  result = result.replaceAll("<volume>", options.volume);

  return result;
}
