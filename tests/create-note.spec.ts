import { test, expect } from "@playwright/test";

test("can enter text into create note textarea", async ({ page }) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");

    await expect(noteTextarea).toBeVisible();
    await expect(noteTextarea).toBeEnabled();

    const testText = "This is my first note for testing";
    await noteTextarea.type(testText);

    await expect(noteTextarea).toHaveValue(testText);
});

test("can clear and re-enter text in create note textarea", async ({
    page,
}) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");

    await noteTextarea.type("Initial text");
    await expect(noteTextarea).toHaveValue("Initial text");

    await noteTextarea.clear();
    await noteTextarea.type("New text content");
    await expect(noteTextarea).toHaveValue("New text content");
});

test("user-mentioner shows when @ symbol has 3+ characters", async ({
    page,
}) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");
    const userMentioner = page.getByTestId("user-mentioner");

    // First, verify user-mentioner is not visible initially
    await expect(userMentioner).not.toBeVisible();

    // Type @be (only 2 characters after @) - should not show
    await noteTextarea.type("@be");
    await expect(userMentioner).not.toBeVisible();

    // Add one more character to make @bear (3+ characters after @) - should show
    await noteTextarea.type("a");
    await expect(userMentioner).toBeVisible();
});

test("user-mentioner does not show for short mentions", async ({ page }) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");
    const userMentioner = page.getByTestId("user-mentioner");

    // Type @a (only 1 character after @) - should not show
    await noteTextarea.type("@a");
    await expect(userMentioner).not.toBeVisible();

    // Type @ab (only 2 characters after @) - should not show
    await noteTextarea.clear();
    await noteTextarea.type("@ab");
    await expect(userMentioner).not.toBeVisible();
});

test("user-mentioner shows for valid mentions", async ({ page }) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");
    const userMentioner = page.getByTestId("user-mentioner");

    // Test different valid mentions (3+ characters)
    const validMentions = ["@bear", "@cat", "@bird"];

    for (const mention of validMentions) {
        await noteTextarea.clear();
        await noteTextarea.type(mention);
        await expect(userMentioner).toBeVisible();
    }
});

test("creates a note when text is entered and create action is pressed", async ({
    page,
}) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");
    const createNoteAction = page.getByTestId("create-note-action");
    const unpinnedNotesContainer = page.getByTestId("unpinned-notes");

    // Create unique text using UUID
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const noteText = `This is my test note content ${uniqueId}`;
    await noteTextarea.type(noteText);

    // Press the create note action
    await createNoteAction.click();

    // Verify the note card contains the text we entered using text-based selection
    const createdNoteCard = unpinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: noteText });
    await expect(createdNoteCard).toBeVisible();
});

test("auto-saves multiple edits with proper timing", async ({ page }) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");
    const createNoteAction = page.getByTestId("create-note-action");
    const unpinnedNotesContainer = page.getByTestId("unpinned-notes");

    // Create unique identifiers
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const originalText = `Original note ${uniqueId}`;
    const firstEditText = `First edit ${uniqueId}`;
    const secondEditText = `Second edit with more text ${uniqueId}`;

    // Create initial note
    await noteTextarea.type(originalText);
    await createNoteAction.click();

    // Find note card by text content
    const originalNoteCard = unpinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: originalText });
    await expect(originalNoteCard).toBeVisible();

    // First edit
    await noteTextarea.clear();
    await noteTextarea.type(firstEditText);
    await page.waitForTimeout(1000); // Wait for auto-save

    // Find updated note card by new text content
    const firstEditCard = unpinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: firstEditText });
    await expect(firstEditCard).toBeVisible();

    // Second edit
    await noteTextarea.clear();
    await noteTextarea.type(secondEditText);
    await page.waitForTimeout(1000); // Wait for auto-save

    // Find final updated note card by latest text content
    const secondEditCard = unpinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: secondEditText });
    await expect(secondEditCard).toBeVisible();

    // Verify textarea maintains the content
    await expect(noteTextarea).toHaveValue(secondEditText);
});

test("clears textarea and allows new content after note card click", async ({
    page,
}) => {
    await page.goto("/");

    const noteTextarea = page.getByTestId("create-note");
    const createNoteAction = page.getByTestId("create-note-action");
    const unpinnedNotesContainer = page.getByTestId("unpinned-notes");

    // Create first note
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const firstNoteText = `First note content ${uniqueId}`;
    await noteTextarea.type(firstNoteText);
    await createNoteAction.click();

    const firstNoteCard = unpinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: firstNoteText });
    await expect(firstNoteCard).toBeVisible();

    // Verify textarea still has the content after note creation
    await expect(noteTextarea).toHaveValue(firstNoteText);

    // Click on the note card to clear textarea
    await firstNoteCard.click();
    await expect(noteTextarea).toHaveValue("");

    // Verify we can now type new content
    const newContent = `New content after clearing ${uniqueId}`;
    await noteTextarea.type(newContent);
    await expect(noteTextarea).toHaveValue(newContent);
});
