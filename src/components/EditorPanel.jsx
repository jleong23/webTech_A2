/**
 * This holds the textArea(proc input)
 */
export default function EditorPanel({
  procValue,
  onProcChange,
  procRef,
  editorRootRef,
  outputRootRef,
}) {
  return (
    <div>
      <label className="block font-semibold text-sm mb-1">
        Text to preprocess:
      </label>
      <textarea
        ref={procRef}
        value={procValue}
        onChange={(e) => onProcChange(e.target.value)}
        rows="30"
        className="w-full border rounded p-2"
      />
      <div
        ref={editorRootRef}
        className="mt-2 border rounded h-64 overflow-y-auto"
      />
      <div ref={outputRootRef} />
    </div>
  );
}
