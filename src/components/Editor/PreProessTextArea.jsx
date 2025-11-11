import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi"; // import the chevron icon

/**
 * Renders a collapsible panel containing a text area for input and an output display for the Strudel editor.
 * It allows users to input code, which is then processed and displayed.
 * The component manages its collapsible state and integrates with Strudel editor refs.
 */
export default function PreProessTextArea({
  procValue,
  onProcChange,
  procRef,
  editorRootRef,
  outputRootRef,
}) {
  const [show, setShow] = useState(true);
  const containerRef = useRef(null); // Ref to the collapsible div
  const [maxHeight, setMaxHeight] = useState("0px"); // for smooth collapse/expand

  // Adjust maxHeight according to show state
  useEffect(() => {
    if (show && containerRef.current) {
      setMaxHeight(`${containerRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [show]);

  return (
    <div className="mt-4">
      {/* Toggle show Button */}
      <button
        onClick={() => setShow(!show)}
        className="mb-3 px-6 py-3 bg-red-600/80 backdrop-blur-sm text-white font-accent font-semibold rounded-2xl shadow-md hover:bg-red-600/100 focus:outline-none flex items-center gap-3 transition-all duration-300"
      >
        <span>{show ? "Hide Editor Panel" : "Show Editor Panel"}</span>
        <FiChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            show ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Collapsible Panel */}
      <div
        ref={containerRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-all duration-300 "
      >
        <div className="grid md:grid-cols-2 gap-4 mt-4 items-start">
          {/* Text Area Input */}
          <div className="flex flex-col">
            <label className="block font-accent font-semibold text-red-500 mb-2">
              Text to preprocess:
            </label>
            <textarea
              ref={procRef}
              value={procValue}
              onChange={(e) => onProcChange(e.target.value)}
              rows={15}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none h-96"
            />
          </div>

          {/* Editor output */}
          <div className="flex flex-col">
            <label className="block font-accent font-semibold text-red-500 mb-2">
              Output
            </label>
            <div
              ref={editorRootRef}
              className="border border-gray-700 rounded-2xl overflow-y-auto h-96 p-4 scrollbar-thin scrollbar-thumb-red-500/60 scrollbar-track-gray-900/50"
            />
            <div ref={outputRootRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
