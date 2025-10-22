/**
 *
 * @param {*} text
 * @param {*} options
 * @returns
 *  useStrudelEditor: A util that takes raw Strudel Code (as text) & replaces certain placeholders with actual values depends on user option (Hush ON or OFF)
 */
export function processText(text, options = { p1Hush: false }) {
  // replace token <p1_Radio> with underscore if true or empty string depending on hush
  const replace = options.p1Hush ? "_" : ""; // use option for future extendsion with other features
  if (!text) return ""; // returns empty string if no input
  return text.replaceAll("<p1_Radio>", replace); // finds every <p1_radio> in code and replaces with "_" / ""
}
