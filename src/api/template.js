import {api} from "./api.js";

export async function getTemplate() {
    const res = await api.get("/template")
    return res.data
}

export async function createTemplate(data) {
    const res = await api.post("/template", data)
    return res.data
}

export async function updateTemplate(id, content) {
    const res = await api.put(`/template/${id}`, {content})
    return res.data
}

export async function previewTemplate(data) {
    const res = await api.post("/template/preview", data)
    return res.data
}

export async function variablesTemplate() {
    const res = await api.get("/template/variables")
    return res.data
}