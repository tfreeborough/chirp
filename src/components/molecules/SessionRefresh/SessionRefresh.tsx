import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AppContext } from "../../../store/AppContext.ts";

export const SessionRefresh = observer(() => {
    const { NoteStore } = useContext(AppContext);

    const handleRefresh = () => {
        NoteStore.refreshSession();
    };

    return (
        <div className="bg-white sm:top-2 sm:absolute sm:right-2 text-xs p-2 shadow-md rounded">
            <div className="text-gray-400">Your current session</div>
            {NoteStore.session}
            <div
                onClick={handleRefresh}
                className="material-symbols-outlined absolute top-1 right-1 hover:cursor-pointer"
                style={{ fontSize: 20 }}
            >
                refresh
            </div>
        </div>
    );
});
