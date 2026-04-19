import { useTemplate } from "../hooks/templates/useTemplate.js";
import EditorPreview from "./EditorPreview.jsx";

const Template = () => {
    const {
        templateId,
        content,
        setContent,
        variables,
        preview,
        loading,
        saving,
        previewLoading,
        error,
        saveTemplate,
        getPreview,
        insertVariable,
    } = useTemplate();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 px-4 py-6">
                <div className="mx-auto max-w-6xl rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-xs text-slate-500">loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                        email tmpl editor
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                        post-meal email
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">
                        edit txt, add vars, preview result
                    </p>
                </div>

                {error ? (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                        {error}
                    </div>
                ) : null}

                <div className="mb-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                            template id
                        </p>
                        <p className="text-xs font-medium text-slate-700">
                            {templateId ?? "not saved"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        {saving ? <span>saving...</span> : null}
                        {previewLoading ? <span>preview...</span> : null}
                    </div>
                </div>

                <EditorPreview
                    content={content}
                    setContent={setContent}
                    variables={variables}
                    preview={preview}
                    saveTemplate={saveTemplate}
                    getPreview={getPreview}
                    insertVariable={insertVariable}
                    saving={saving}
                    previewLoading={previewLoading}
                />
            </div>
        </div>
    );
};

export default Template;