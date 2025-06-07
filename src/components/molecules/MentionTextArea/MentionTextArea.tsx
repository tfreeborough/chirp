import React, { useState, useRef, useEffect } from "react";
import css from "./MentionTextarea.module.css";
import type { User } from "../../../types/User.types.ts";
import { UserMentioner } from "../UserMentioner/UserMentioner.tsx";
import { getApproximateAtPosition } from "../../../utils/getApproximateAtPosition.ts";
import { getStyledText } from "../../../utils/getStyledText.ts";
import { Portal } from "../../atoms/Portal/Portal.tsx";

interface MentionTextAreaProps {
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
    onMentionSelect: (mention: User) => void;
}

const MentionTextarea = ({
    value,
    onChange,
    placeholder,
    onMentionSelect,
}: MentionTextAreaProps) => {
    const [text, setText] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionPosition, setSuggestionPosition] = useState({
        x: 0,
        y: 0,
    });
    const [currentMentionSearch, setCurrentMentionSearch] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    /**
     * We need to keep both the textarea and overlay in sync in terms of auto-sizing
     */
    const autoResize = () => {
        if (textareaRef.current && overlayRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
            overlayRef.current.style.height = "auto";
            overlayRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    };

    // Handle text input
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
            const newText = e.target.value;
            setText(newText);
            onChange?.(newText);
            autoResize();

            // Check for @ mentions
            const cursorPosition = e.target.selectionStart;
            const textBeforeCursor = newText.substring(0, cursorPosition);
            const lastAtIndex = textBeforeCursor.lastIndexOf("@");

            // Only run this if we actually find an @ symbol.
            if (lastAtIndex !== -1) {
                const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);

                // Check if we're still in a mention (no spaces after @)
                if (!textAfterAt.includes(" ") && !textAfterAt.includes("\n")) {
                    setCurrentMentionSearch(textAfterAt);
                    const textareaRect =
                        textareaRef.current?.getBoundingClientRect();
                    // Janky code below!
                    const atCoords = getApproximateAtPosition(
                        textareaRef.current,
                        lastAtIndex,
                    );

                    if (textareaRect) {
                        setSuggestionPosition({
                            x: textareaRect.left + atCoords.x,
                            y: textareaRect.top + atCoords.y + window.scrollY,
                        });
                        setShowSuggestions(true);
                    }
                } else {
                    setShowSuggestions(false);
                }
            } else {
                setShowSuggestions(false);
            }
        }
    };

    /**
     * autoresize on text change, makes sense!
     */
    useEffect(() => {
        autoResize();
    }, [text]);

    /**
     * Looks at the current position of the cursor and attempts to insert the username
     * at that position.
     */
    const handleInsertMention = (mention: User) => {
        const cursorPosition = textareaRef.current?.selectionStart;
        if (!cursorPosition) {
            return;
        }
        const textBeforeCursor = text.substring(0, cursorPosition);
        const textAfterCursor = text.substring(cursorPosition);
        const lastAtIndex = textBeforeCursor.lastIndexOf("@");

        const newText =
            text.substring(0, lastAtIndex) +
            `@${mention.username} ` +
            textAfterCursor;

        setText(newText);
        onChange?.(newText);
        onMentionSelect?.(mention);
        setShowSuggestions(false);

        setTimeout(() => {
            textareaRef.current?.focus();
            const newCursorPosition = lastAtIndex + mention.username.length + 2;
            textareaRef.current?.setSelectionRange(
                newCursorPosition,
                newCursorPosition,
            );
        }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (showSuggestions) {
            if (e.key === "Escape") {
                setShowSuggestions(false);
            }
        }
    };

    useEffect(() => {
        setText(value);
        textareaRef.current?.focus();
    }, [value]);

    return (
        <div className={css.mentionTextareaContainer} ref={containerRef}>
            <textarea
                data-testid="create-note"
                autoFocus
                ref={textareaRef}
                className={css.mentionTextarea}
                value={text}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            <div
                ref={overlayRef}
                className={css.mentionOverlay}
                dangerouslySetInnerHTML={{
                    __html: getStyledText(text),
                }}
            />
            {showSuggestions && (
                <Portal
                    target={document.getElementById("user-mention") as Element}
                >
                    <UserMentioner
                        search={currentMentionSearch}
                        onSelect={handleInsertMention}
                        position={suggestionPosition}
                        onClose={() => setShowSuggestions(false)}
                    />
                </Portal>
            )}
        </div>
    );
};

export default MentionTextarea;
