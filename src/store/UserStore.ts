import { makePersistable } from "mobx-persist-store";
import type { User } from "../types/User.types.ts";
import { makeAutoObservable } from "mobx";

class UserStore {
    public users: User[] = [];

    constructor() {
        makeAutoObservable(this);
        makePersistable(
            this,
            {
                name: "UserStore",
                properties: [],
                storage: window.localStorage,
                removeOnExpiration: true,
            },
            { delay: 200, fireImmediately: false },
        );
    }

    setUsers(users: User[]) {
        this.users = users.sort((a, b) => {
            if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
            if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
            return 0;
        });
    }
}

const singleton = new UserStore();
export default singleton;
