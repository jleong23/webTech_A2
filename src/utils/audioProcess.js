/**
 *  useStrudelEditor: A util that takes raw Strudel Code (as text) & replaces certain placeholders with actual values depends on user option
 */
export function audioProcess(
  text,
  options = { p1Hush: false, p2Hush: false, p3Hush: false, reverb: 0.6 }
) {
  if (!text) return ""; // returns empty string if no input
  let result = text;

  // replace token <p1_Radio> with _ if true or empty string depending on hush
  const muteDrums = options.p1Hush ? "_" : ""; // use option for future extendsion with other features
  result = result.replaceAll("<p1_Radio>", muteDrums);

  const muteBass = options.p2Hush ? "_" : ""; // use option for future extendsion with other features
  result = result.replaceAll("<p2_Radio>", muteBass);

  const muteArp = options.p3Hush ? "_" : ""; // use option for future extendsion with other features
  result = result.replaceAll("<p3_Radio>", muteArp);

  // reverb handler
  result = result.replaceAll("<reverb>", options.reverb);

  // volume handler
  result = result.replaceAll("<volume>", options.volume);

  return result;
}
