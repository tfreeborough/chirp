/**
 * A poor mans implementation of user-sanitation
 * @param inputText
 */
export const getStyledText = (inputText: string) => {
    return inputText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/@(\w+)/g, `<span class="text-red-400">@$1</span>`);
};
