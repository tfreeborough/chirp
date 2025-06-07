import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../store/AppContext.ts";
import { NoteService } from "../../../services/Note.service.ts";
import { Loading } from "../../atoms/Loading/Loading.tsx";
import type { Note } from "../../../types/Note.types.ts";
import { NoteCard } from "../../molecules/NoteCard/NoteCard.tsx";
import { FadeIn } from "../../animations/FadeIn/FadeIn.tsx";

export const NotesLoader = observer(() => {
    const { NoteStore } = useContext(AppContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [sortedNotes, setSortedNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data, status } = await NoteService.listNotes();
            if (status === 200) {
                NoteStore.setNotes(data);
                setLoading(false);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        setSortedNotes(
            NoteStore.notes.sort((a, b) => {
                if (a.id > b.id) return -1;
                if (a.id < b.id) return 1;
                return 0;
            }),
        );
    }, [NoteStore.notes]);

    if (loading) {
        return (
            <div className="flex flex-col gap-2 items-center w-full grow justify-center">
                <Loading size={48} />
                <div className="text-sm text-gray-500">
                    We're just fetching your notes
                </div>
            </div>
        );
    }

    if (sortedNotes.length === 0) {
        return (
            <div className="flex flex-col gap-2 items-center w-full grow justify-center">
                <span
                    className="material-symbols-outlined text-gray-500"
                    style={{ fontSize: 60 }}
                >
                    sticky_note_2
                </span>
                <div className="text-sm text-gray-500">
                    You've not got any notes yet, get started by adding one
                    above!
                </div>
            </div>
        );
    }

    const pinned = sortedNotes.filter((note) => {
        return NoteStore.pinned.indexOf(note.id) > -1;
    });
    const unpinned = sortedNotes.filter((note) => {
        return NoteStore.pinned.indexOf(note.id) === -1;
    });

    return (
        <div className="self-center">
            {pinned.length > 0 && (
                <>
                    <div className="text-lg text-gray-700 mb-4 text-center font-light text-sm">
                        Pinned Notes
                    </div>
                    <ul
                        data-testid="pinned-notes"
                        className="flex flex-wrap gap-4 sm:justify-center justify-stretch"
                    >
                        {pinned.map((note: Note, i) => {
                            return (
                                <motion.li
                                    layout
                                    layoutId={`note-${note.id}`}
                                    transition={{
                                        type: "tween",
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="w-full sm:w-auto"
                                    key={note.id}
                                >
                                    <FadeIn delay={i * 0.05}>
                                        <NoteCard note={note} pinned />
                                    </FadeIn>
                                </motion.li>
                            );
                        })}
                    </ul>
                    <div className="border-b-2 border-gray-300 my-10" />
                </>
            )}

            <ul
                data-testid="unpinned-notes"
                className="flex flex-wrap gap-4 sm:justify-center justify-stretch"
            >
                {unpinned.map((note: Note, i) => {
                    return (
                        <motion.li
                            className="w-full sm:w-auto"
                            layout
                            layoutId={`note-${note.id}`}
                            transition={{
                                type: "tween",
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            key={note.id}
                        >
                            <FadeIn key={note.id} delay={i * 0.02}>
                                <NoteCard note={note} />
                            </FadeIn>
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
});
