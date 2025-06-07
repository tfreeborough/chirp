import { CreateNote } from "../../organisms/CreateNote/CreateNote.tsx";
import { NotesLoader } from "../../organisms/NotesLoader/NotesLoader.tsx";

export const Main = () => {
    return (
        <div className="p-4 grow flex flex-col gap-12">
            <CreateNote />
            <NotesLoader />
        </div>
    );
};
