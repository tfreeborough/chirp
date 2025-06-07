import MentionTextarea from "../../molecules/MentionTextArea/MentionTextArea.tsx";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../store/AppContext.ts";
import { UserService } from "../../../services/User.service.ts";

import css from "./CreateNote.module.css";
import { useKeyDown } from "a11y-onkeydown";
import { Loading } from "../../atoms/Loading/Loading.tsx";
import { NoteService } from "../../../services/Note.service.ts";
import { useDebouncedEffect } from "../../../utils/useDebouncedEffect.ts";

export const CreateNote = observer(() => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const { UserStore, NoteStore } = useContext(AppContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, status } = await UserService.listUsers();
            if (status === 200) {
                UserStore.setUsers(data);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (NoteStore.current) {
            setText(NoteStore.current.body);
        } else {
            setText("");
        }
    }, [NoteStore.current]);

    function handleSetText(text: string) {
        setText(text);
    }

    async function handleCreate() {
        setLoading(true);
        const { data } = await NoteService.createNote(text);
        setLoading(false);
        NoteStore.addNote(data);
        NoteStore.setCurrent(data);
    }

    async function handleUpdate() {
        if (NoteStore.current) {
            setLoading(true);
            const { data } = await NoteService.updateNote(
                NoteStore.current.id,
                text,
            );
            setLoading(false);
            NoteStore.updateNote(data.id, data);
            NoteStore.setCurrent(data);
        }
    }

    async function handleNew() {
        NoteStore.setCurrent(null);
    }

    useDebouncedEffect(
        async () => {
            if (text !== NoteStore.current?.body) {
                await handleUpdate();
            }
        },
        [text],
        1000,
    );

    return (
        <div className="bg-white w-[15dvw] min-w-[450px] px-6 py-4 shadow-lg rounded-lg m-8 self-center relative hover:shadow-xl">
            <MentionTextarea
                value={text}
                onChange={handleSetText}
                onMentionSelect={(mention) => console.log("Selected:", mention)}
                placeholder={NoteStore.notePlaceholder}
            />
            <span
                tabIndex={0}
                className={`${css.send} material-symbols-outlined text-red-300 hover:cursor-pointer hover:text-red-600 focus:text-red-600 `}
                style={{ fontSize: 28 }}
                onClick={NoteStore.current ? handleNew : handleCreate}
                onKeyDown={useKeyDown(handleCreate)}
                data-testid="create-note-action"
            >
                {loading ? (
                    <span className="pr-1 block pb-1">
                        <Loading style="tadpole" size={18} />
                    </span>
                ) : (
                    <>{NoteStore.current ? "refresh" : "send"}</>
                )}
            </span>
        </div>
    );
});
