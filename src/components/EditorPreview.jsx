import { useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Preview from "./Preview.jsx";

const EditorPreview = ({
                           content,
                           setContent,
                           variables,
                           preview,
                           saveTemplate,
                           getPreview,
                           saving,
                           previewLoading,
                       }) => {
    const editorRef = useRef(null);

    const modules = useMemo(
        () => ({
            toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "bullet" }],
                ["clean"],
            ],
        }),
        []
    );

    const formats = ["bold", "italic", "underline", "list"];

    const handleInsertVariable = (variable) => {
        const editor = editorRef.current?.getEditor();

        if (!editor) {
            setContent((prev) => `${prev} {{${variable}}}`);
            return;
        }

        const range = editor.getSelection(true);

        if (range) {
            editor.insertText(range.index, `{{${variable}}}`);
            editor.setSelection(range.index + variable.length + 4);
            return;
        }

        const length = editor.getLength();
        editor.insertText(length - 1, `{{${variable}}}`);
        editor.setSelection(length - 1 + variable.length + 4);
    };

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-3">
                    <h2 className="text-sm font-semibold text-slate-900">editor</h2>
                    <p className="text-[11px] text-slate-500">txt + vars + basic format</p>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                    {variables?.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => handleInsertVariable(item)}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600 transition hover:bg-slate-100"
                        >
                            {`{{${item}}}`}
                        </button>
                    ))}
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <ReactQuill
                        ref={editorRef}
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        placeholder="write email template here..."
                        className="[&_.ql-container]:min-h-[260px] [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[260px] [&_.ql-editor]:text-sm [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200"
                    />
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={saveTemplate}
                        disabled={saving}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "saving..." : "save"}
                    </button>

                    <button
                        type="button"
                        onClick={getPreview}
                        disabled={previewLoading}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {previewLoading ? "preview..." : "preview"}
                    </button>
                </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-3">
                    <h2 className="text-sm font-semibold text-slate-900">preview</h2>
                    <p className="text-[11px] text-slate-500">rendered html</p>
                </div>

                <div className="min-h-[320px] rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Preview html={preview} />
                </div>
            </div>
        </div>
    );
};

export default EditorPreview;