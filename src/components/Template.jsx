import {useTemplate} from "../hooks/templates/useTemplate.js";
import EditorPreview from "./EditorPreview.jsx";


const Template = () => {
    const {
        templateId,
        content,
        setContent,
        variables,
        preview,
        loading,
        error,
        saveTemplate,
        getPreview,
    } = useTemplate()


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['clean']
        ]
    };

    if (loading) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }

    return (
        <div>
            <div>
                {error ? (<div>{error}</div>) : null}
                <div>
                    ti = {templateId}
                </div>
            </div>
            <EditorPreview
                content={content}
                setContent={setContent}
                variables={variables}
                preview={preview}
                saveTemplate={saveTemplate}
                getPreview={getPreview}
            />
        </div>
    );
};

export default Template;