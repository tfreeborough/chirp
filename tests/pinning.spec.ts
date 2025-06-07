import { expect, test } from "@playwright/test";

test("pins first unpinned note when pin button is clicked", async ({
    page,
}) => {
    await page.goto("/");

    const unpinnedNotesContainer = page.getByTestId("unpinned-notes");
    const pinnedNotesContainer = page.getByTestId("pinned-notes");

    // Wait for at least one note to load from API
    await expect(
        unpinnedNotesContainer.getByTestId("note-card").first(),
    ).toBeVisible();

    // Get the first note card in unpinned section
    const firstUnpinnedNote = unpinnedNotesContainer
        .getByTestId("note-card")
        .first();
    const noteText = await firstUnpinnedNote.textContent();

    // Find and click the pin button within this note card
    const pinButton = firstUnpinnedNote.getByTestId("pin");
    await expect(pinButton).toBeVisible();
    await pinButton.click();

    await page.waitForTimeout(2000);

    // Verify the note now appears in the pinned section using its text content
    const pinnedNoteCard = pinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: noteText });
    await expect(pinnedNoteCard).toBeVisible();

    // Verify the note is no longer in the unpinned section
    await expect(
        unpinnedNotesContainer
            .getByTestId("note-card")
            .filter({ hasText: noteText }),
    ).not.toBeVisible();
});

test("unpins note when unpin button is clicked", async ({ page }) => {
    await page.goto("/");

    const unpinnedNotesContainer = page.getByTestId("unpinned-notes");
    const pinnedNotesContainer = page.getByTestId("pinned-notes");

    // Get the first note card in unpinned section and pin it
    const firstUnpinnedNote = unpinnedNotesContainer
        .getByTestId("note-card")
        .first();
    await expect(
        unpinnedNotesContainer.getByTestId("note-card").first(),
    ).toBeVisible();

    const noteText = await firstUnpinnedNote.textContent();

    // Pin the note first
    const pinButton = firstUnpinnedNote.getByTestId("pin");
    await expect(pinButton).toBeVisible();
    await pinButton.click();

    // Wait for pin animation to complete
    await page.waitForTimeout(500);

    // Verify the note is now in pinned section
    const pinnedNoteCard = pinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: noteText });
    await expect(pinnedNoteCard).toBeVisible();

    // Now unpin it - click the unpin button
    const unpinButton = pinnedNoteCard.getByTestId("unpin");
    await expect(unpinButton).toBeVisible();
    await unpinButton.click();

    // Wait for unpin animation to complete
    await page.waitForTimeout(500);

    // Verify the note is back in the unpinned section
    const backToUnpinnedNote = unpinnedNotesContainer
        .getByTestId("note-card")
        .filter({ hasText: noteText });
    await expect(backToUnpinnedNote).toBeVisible();

    // Verify the note is no longer in the pinned section
    await expect(
        pinnedNotesContainer
            .getByTestId("note-card")
            .filter({ hasText: noteText }),
    ).not.toBeVisible();
});
