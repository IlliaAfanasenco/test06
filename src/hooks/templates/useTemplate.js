import {useEffect, useState} from "react";
import {createTemplate, getTemplate, previewTemplate, updateTemplate, variablesTemplate,} from "../../api/template.js";

export const useTemplate = () => {
    const [templateId, setTemplateId] = useState(null);
    const [content, setContent] = useState("");
    const [variables, setVariables] = useState([]);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("Bay")
        loadTemplate();
        loadVariables();
    }, []);


    const loadTemplate = async () => {

        console.log("Hello")
        try {
            setLoading(false);
            const data = await getTemplate();

            setTemplateId(data?.id ?? null);
            setContent(data?.content ?? "");
        } catch (e) {
            setError(e.message);
        }
    };


    const saveTemplate = async () => {
        try {
            setLoading(true);

            const payload = {content};

            const res = templateId
                ? await updateTemplate(templateId, payload)
                : await createTemplate(payload);

            setTemplateId(res.id);
        } catch (e) {
            setError(e.message);
        }
    };

    const getPreview = async () => {
        try {
            setLoading(true);

            const res = await previewTemplate({content});

            setPreview(res.preview);
        } catch (e) {
            setError(e.message);
        }
    };

    const loadVariables = async () => {
        try {
            const res = await variablesTemplate();
            setVariables(res.variables);
        } catch (e) {
            setError(e.message);
        }
    };

    return {
        templateId, content, setContent, variables, preview, loading, error,
        loadTemplate, saveTemplate, getPreview, loadVariables,
    };
};