/**
 *
 * @param {*} text
 * @param {*} options
 * @returns
 *  useStrudelEditor: A util that takes raw Strudel Code (as text) & replaces certain placeholders with actual values depends on user option (Hush ON or OFF)
 */
export function processText(text, options = { p1Hush: false }) {
  // replace token <p1_Radio> with underscore if true or empty string depending on hush

  if (!text) return ""; // returns empty string if no input
  let result = text;

  const replace = options.p1Hush ? "_" : ""; // use option for future extendsion with other features
  result = result.replaceAll("<p1_Radio>", replace);

  return result;
}
