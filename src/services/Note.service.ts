import axios from "axios";
import type { Note } from "../types/Note.types.ts";

class NoteServiceClass {
    private client;

    constructor() {
        this.client = axios.create({
            baseURL: "https://challenge.surfe.com/tf-test-session-2",
            timeout: 3000,
        });
    }

    async listNotes() {
        const { data, status } = await this.client.get<Note[]>("/notes");
        return { data, status };
    }

    /**
     * Not used, saving here for posterity
     * @param id
     */
    async fetchNote(id: number) {
        const { data, status } = await this.client.get<Note>(`/notes/${id}`);
        return { data, status };
    }

    /**
     * Not used, saving here for posterity
     * @param id
     */
    async deleteNote(id: string) {
        const { data, status } = await this.client.delete<Note[]>(
            `/notes/${id}`,
        );
        return { data, status };
    }

    async updateNote(id: number, body: string) {
        const { data, status } = await this.client.put<Note>(`/notes/${id}`, {
            body,
        });
        return { data, status };
    }

    async createNote(body: string) {
        const { data, status } = await this.client.post<Note>(`/notes`, {
            body,
        });
        return { data, status };
    }
}

export const NoteService = new NoteServiceClass();
