import NoteStore from "./NoteStore.ts";
import UserStore from "./UserStore.ts";
import React from "react";
export const AppContext = React.createContext({
    NoteStore,
    UserStore,
});
