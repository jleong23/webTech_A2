/**
 * EditorPanel: This holds the textArea(proc input)
 */
export default function EditorPanel({
  procValue,
  onProcChange,
  procRef,
  editorRootRef,
  outputRootRef,
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block font-semibold text-sm mb-1">
          Text to preprocess:
        </label>
        <textarea
          ref={procRef}
          value={procValue}
          onChange={(e) => onProcChange(e.target.value)}
          rows="15"
          className="w-full border rounded-xl p-2"
        />
      </div>

      <div>
        <div
          ref={editorRootRef}
          className="border rounded-xl mt-4 overflow-y-auto h-96"
        />
        <div ref={outputRootRef} />
      </div>
    </div>
  );
}
