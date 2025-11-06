/**
 * - Toggles (mute/unmute) drum by adjusting postgain
 * - Accepts the 'editor' instance and a boolean 'mute'
 */
export const toggleDrums = (editor, mute) => {
  if (!editor?.repl) return;
  const drums = editor.repl.state.scope?.drums;
  const drums2 = editor.repl.state.scope?.drums2;
  if (drums) drums.postgain(mute ? 0 : 1);
  if (drums2) drums2.postgain(mute ? 0 : 1);
};

export const toggleArp = (editor, mute) => {
  if (!editor?.repl) return;
  const arp = editor.repl.state.scope?.arp;
  if (arp) arp.postgain(mute ? 0 : 1);
};

export const toggleBass = (editor, mute) => {
  if (!editor?.repl) return;
  const bass = editor.repl.state.scope?.bass;
  if (bass) bass.postgain(mute ? 0 : 1);
};

/**
 * function to apply tempo to track
 */
export const applyTempo = (code, tempo) => {
  const lines = code.split("\n"); // Split code by each line
  return lines
    .map(
      (line) =>
        line.startsWith("setcps(") // find lines starting with setcps
          ? `setcps(${tempo}/60/4)` // replace it with your tempo calculation
          : line // leave other lines unchanged
    )
    .join("\n"); // rejoin the lines back into one string
};

/**
 * function to change drum sound by replacing .bank(..)
 */
export const changeDrumBank = (code, bankName) => {
  return code.replace(/\.bank\([^)]*\)/g, `.bank("${bankName}")`);
};
