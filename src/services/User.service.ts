import axios from "axios";
import type { User } from "../types/User.types.ts";

class UserServiceClass {
    private client;

    constructor() {
        this.client = axios.create({
            baseURL: "https://challenge.surfe.com",
            timeout: 3000,
        });
    }

    async listUsers() {
        const { data, status } = await this.client.get<User[]>("/users");
        return { data, status };
    }
}

export const UserService = new UserServiceClass();
