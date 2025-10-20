import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

export function Proc() {
  let proc_text = document.getElementById("proc").value;
  let proc_text_replaced = proc_text.replaceAll("<p1_Radio>", ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced);
}

let globalEditor = null;

export function ProcessText(match, ...args) {
  let replace = "";
  if (document.getElementById("flexRadioDefault2").checked) {
    replace = "_";
  }

  return replace;
}

export default function Controls() {
  const handlePreprocess = () => {
    Proc();
  };

  const handleProcAndPlay = () => {
    if (globalEditor != null) {
      Proc();
      globalEditor.evaluate();
    }
  };

  const handlePlay = () => {
    globalEditor?.evaluate();
  };

  const handleStop = () => {
    globalEditor?.stop();
  };

  return (
    <div className="d-flex gap-2">
      <button onClick={handlePreprocess} className="btn btn-outline-primary">
        Preprocess
      </button>

      <button onClick={handleProcAndPlay} className="btn btn-outline-primary">
        Proc & Play
      </button>

      <button onClick={handlePlay} className="btn btn-outline-primary">
        <FaPlay />
      </button>

      <button onClick={handleStop} className="btn btn-outline-primary">
        <FaStop />
      </button>
    </div>
  );
}
