import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import type { Note } from "../types/Note.types.ts";

const inspiringMessages = [
    "Jot down your plot points before they escape",
    "Every great novel started with someone taking notes",
    "Your thoughts deserve better than the back of a napkin",
    "Capture those fleeting ideas before they become footnotes",
    "Today's random note is tomorrow's brilliant breakthrough",
    "Even Hemingway kept a notebook handy",
    "Turn your mental margin notes into masterpieces",
    "Don't let that genius idea become a deleted scene",
    "Scribble now, edit later—that's what drafts are for",
    "Your brain's rough draft starts here",
    "Write it down before your memory writes it off",
    "From blank page to bestseller begins with one note",
    "Every author's secret weapon: a good notebook",
    "Pen meets paper, magic happens",
    "Your next chapter starts with this sentence",
    "Don't let brilliant thoughts become lost manuscripts",
    "Even Post-it notes can change the world",
    "Turn fleeting thoughts into timeless words",
    "Your ideas are asking to be written down",
    "Start your literary legacy right here",
    "Thoughts without notes are just daydreams",
    "Every word counts, especially the first one",
    "Your inner narrator is ready to speak",
    "Give your thoughts their moment on the page",
];

class NoteStore {
    public notePlaceholder = "";
    public notes: Note[] = [];
    public current: Note | null = null;
    public pinned: number[] = [];

    constructor() {
        makeAutoObservable(this);
        makePersistable(
            this,
            {
                name: "NoteStore",
                properties: ["notes", "current", "pinned"],
                storage: window.localStorage,
                removeOnExpiration: true,
            },
            { delay: 200, fireImmediately: false },
        );
        this.generateRandomPlaceholder();
    }

    setNotes(notes: Note[]) {
        this.notes = notes;
    }

    addNote(note: Note) {
        this.notes = [...this.notes, note];
    }

    setCurrent(note: Note | null) {
        this.current = note;
    }

    updateNote(id: number, note: Note) {
        const index = this.notes.findIndex((note) => note.id === id);
        if (index > -1) {
            this.notes = [
                ...this.notes.slice(0, index),
                note,
                ...this.notes.slice(index + 1),
            ];
        }
    }

    generateRandomPlaceholder() {
        const randomIndex = Math.floor(
            Math.random() * inspiringMessages.length,
        );
        this.notePlaceholder = inspiringMessages[randomIndex];
    }

    addPin(id: number) {
        const index = this.pinned.findIndex((p) => p === id);
        if (index === -1) {
            this.pinned.push(id);
        }
    }

    removePin(id: number) {
        const index = this.pinned.findIndex((p) => p === id);
        if (index > -1) {
            this.pinned = [
                ...this.pinned.slice(0, index),
                ...this.pinned.slice(index + 1),
            ];
        }
    }
}

const singleton = new NoteStore();
export default singleton;
