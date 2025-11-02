/**
 * EditorPanel: This holds the textArea(proc input)
 */
export default function PreProessTextArea({
  procValue,
  onProcChange,
  procRef,
  editorRootRef,
  outputRootRef,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {/* Text Area Input */}
      <div className="flex flex-col">
        <label className="block font-semibold text-red-500 mb-2">
          Text to preprocess:
        </label>
        <textarea
          ref={procRef}
          value={procValue}
          onChange={(e) => onProcChange(e.target.value)}
          rows="15"
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none h-96"
        />
      </div>

      {/* Editor output */}
      <div className="flex flex-col gap-3 mt-8">
        <div
          ref={editorRootRef}
          className="bg-gray-800 border border-gray-700 rounded-xl overflow-y-auto h-96 p-2"
        />
        <div ref={outputRootRef} />
      </div>
    </div>
  );
}
