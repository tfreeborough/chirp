import type { Note } from "../../../types/Note.types.ts";
import { getStyledText } from "../../../utils/getStyledText.ts";
import css from "./NoteCard.module.css";
import { AppContext } from "../../../store/AppContext.ts";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

interface NoteCardProps {
    note: Note;
    pinned?: boolean;
}

export const NoteCard = observer(({ note, pinned = false }: NoteCardProps) => {
    const { NoteStore } = useContext(AppContext);

    function handleSelect() {
        if (NoteStore.current?.id === note.id) {
            NoteStore.setCurrent(null);
        } else {
            NoteStore.setCurrent(note);
        }
    }

    function handlePin(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        NoteStore.addPin(note.id);
    }

    function handleUnpin(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        NoteStore.removePin(note.id);
    }

    return (
        <div
            data-testid="note-card"
            onClick={handleSelect}
            className={`
        shadow-lg px-6 py-4 rounded-md  border w-[15dvw] min-w-[250px] text-sm relative 
           hover:border-stone-400 hover:cursor-pointer
           ${NoteStore.current?.id === note.id ? "border-red-400 bg-pink-50" : "bg-stone-50 border-stone-200"}
        `}
        >
            {note.body.length === 0 && (
                <span className="text-gray-300">This note is empty!</span>
            )}
            <div
                className={`${css.noteContent} text-sm whitespace-pre-line`}
                dangerouslySetInnerHTML={{ __html: getStyledText(note.body) }}
            />
            <div className={css.pinning}>
                {pinned ? (
                    <div
                        className="material-symbols-outlined"
                        onClick={handleUnpin}
                        data-testid="unpin"
                    >
                        keep_off
                    </div>
                ) : (
                    <div
                        className="material-symbols-outlined"
                        onClick={handlePin}
                        data-testid="pin"
                    >
                        keep
                    </div>
                )}
            </div>
        </div>
    );
});
