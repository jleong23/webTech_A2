/**
 * useSaveJSON:
 * Custom hook to handle saving the application's current state to a JSON file and load it.
 */
export default function useSaveJSON({
  getCurrentState,
  setHush,
  setTempo,
  setPattern,
  setReverb,
  setVolume,
  setDrumBank,
  setProcValue,
  setStatusMessage,
}) {
  {
    /**
     * Save the current app state to a JSON file and download in the browser.
     */
    function saveToJson() {
      const state = getCurrentState(); // get latest state
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob); // temp URL for Blob
      const a = document.createElement("a");
      a.href = url;
      a.download = "strudel_settings.json";
      a.click();
      URL.revokeObjectURL(url);

      if (setStatusMessage) setStatusMessage("Succesfully Save!");
    }

    /**
     * Load state from a user-selected JSON file and update the app state.
     */
    function loadFromJson(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.hush) setHush(data.hush);
          if (data.tempo) setTempo(data.tempo);
          if (data.pattern !== undefined) setPattern(data.pattern);
          if (data.reverb !== undefined) setReverb(data.reverb);
          if (data.volume !== undefined) setVolume(data.volume);
          if (data.drumBank) setDrumBank(data.drumBank);
          if (data.procValue) setProcValue(data.procValue);

          if (setStatusMessage) setStatusMessage("Successfully Loaded!");
        } catch (err) {
          setStatusMessage("❌ Invalid JSON file.");
          console.error(err);
        }
      };
      reader.readAsText(file);
    }

    return { saveToJson, loadFromJson };
  }
}
