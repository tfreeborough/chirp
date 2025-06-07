/**
 * Generated with AI as who has time to write this thing on a Weekend?
 * @param textarea
 * @param atIndex
 */
export function getApproximateAtPosition(
    textarea: HTMLTextAreaElement,
    atIndex: number,
) {
    const computedStyle = window.getComputedStyle(textarea);
    const textBeforeAt = textarea.value.substring(0, atIndex);

    // Get textarea dimensions
    const textareaWidth =
        textarea.clientWidth -
        parseFloat(computedStyle.paddingLeft) -
        parseFloat(computedStyle.paddingRight);

    const avgCharWidth = parseFloat(computedStyle.fontSize) * 0.45;
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;

    // Split by actual line breaks
    const lines = textBeforeAt.split("\n");
    let totalLines = 0;
    let currentLineLength = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineWidthInPixels = line.length * avgCharWidth;

        if (i === lines.length - 1) {
            // Last line - this is where our @ symbol is
            currentLineLength = line.length;
            // Account for text wrapping within this line
            totalLines += Math.floor(lineWidthInPixels / textareaWidth);
        } else {
            // Previous lines - account for wrapping
            totalLines += Math.max(
                1,
                Math.ceil(lineWidthInPixels / textareaWidth),
            );
        }
    }

    // Position on current wrapped line
    const charsPerLine = Math.floor(textareaWidth / avgCharWidth);
    const currentWrappedLinePosition = currentLineLength % charsPerLine;

    const x = paddingLeft + currentWrappedLinePosition * avgCharWidth;
    const y = paddingTop + totalLines * lineHeight + lineHeight;

    return { x, y };
}
