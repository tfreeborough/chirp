import { CreateNote } from "../../organisms/CreateNote/CreateNote.tsx";
import { NotesLoader } from "../../organisms/NotesLoader/NotesLoader.tsx";

export const Main = () => {
    return (
        <div className="p-4 grow flex flex-col md:gap-12 gap-4">
            <CreateNote />
            <NotesLoader />
        </div>
    );
};
