import { useEffect, useState } from "react";
import {
    createTemplate,
    getTemplate,
    previewTemplate,
    updateTemplate,
    variablesTemplate,
} from "../../api/template.js";

const previewMockVariables = {
    name: "Alex",
    email: "alex@example.com",
    meal: "Burger",
};

const getPlainText = (html) => {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
};

export const useTemplate = () => {
    const [templateId, setTemplateId] = useState(null);
    const [content, setContent] = useState("");
    const [variables, setVariables] = useState([]);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        setLoading(true);
        setError("");

        try {
            const [templateData, variablesData] = await Promise.all([
                getTemplate(),
                variablesTemplate(),
            ]);

            setTemplateId(templateData?.id ?? null);
            setContent(templateData?.content ?? "");
            setVariables(variablesData?.variables ?? []);
        } catch (e) {
            setError(e?.response?.data?.error || e.message || "something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const saveTemplate = async () => {
        setSaving(true);
        setError("");

        try {
            const plainText = getPlainText(content);

            if (!plainText) {
                setError("content is required");
                return;
            }

            const res = templateId
                ? await updateTemplate(templateId, content)
                : await createTemplate({ content });

            setTemplateId(res?.id ?? null);
            setContent(res?.content ?? content);
        } catch (e) {
            setError(e?.response?.data?.error || e.message || "failed to save template");
        } finally {
            setSaving(false);
        }
    };

    const getPreview = async () => {
        setPreviewLoading(true);
        setError("");

        try {
            const plainText = getPlainText(content);

            if (!plainText) {
                setError("content is required");
                return;
            }

            const res = await previewTemplate({
                content,
                variables: previewMockVariables,
            });

            setPreview(res?.html ?? "");
        } catch (e) {
            setError(e?.response?.data?.error || e.message || "failed to generate preview");
        } finally {
            setPreviewLoading(false);
        }
    };

    return {
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
    };
};