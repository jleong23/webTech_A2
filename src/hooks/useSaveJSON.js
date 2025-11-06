export default function useSaveJSON({
  getCurrentState,
  setHush,
  setTempo,
  setPattern,
  setReverb,
  setVolume,
  setDrumBank,
  setProcValue,
}) {
  {
    function saveToJson() {
      const state = getCurrentState();
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "strudel_state.json";
      a.click();
      URL.revokeObjectURL(url);
    }

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
          alert("JSON state loaded successfully!");
        } catch (err) {
          alert("Invalid JSON file.");
          console.error(err);
        }
      };
      reader.readAsText(file);
    }

    return { saveToJson, loadFromJson };
  }
}
