export const templates = {
    async loadTemplate(templateName) {
        const response = await fetch(`/templates/${templateName}.html`);
        return await response.text();
    }
};