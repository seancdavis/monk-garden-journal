import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";
import type { JournalEntry } from "../../types";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const notes = formData.get("notes") as string | null;
    const image = formData.get("image") as File | null;

    // Validate required fields
    if (!title || !notes) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/new-entry?error=${encodeURIComponent(
            "Title and notes are required"
          )}`,
        },
      });
    }

    // Handle image upload
    let imageUrl;
    if (image instanceof File && image.size > 0) {
      const imageStore = await getStore({
        name: "garden-images",
        consistency: "strong",
      });
      const imageKey = `${Date.now()}-${image.name}`;
      await imageStore.set(imageKey, image);
      imageUrl = `/uploads/${imageKey}`;
    }

    // Create journal entry
    const journalStore = await getStore({
      name: "journal-entries",
      consistency: "strong",
    });
    const entryKey = Date.now().toString();
    const entry: JournalEntry = {
      title,
      notes,
      date: new Date().toISOString(),
      imageUrl,
    };

    await journalStore.set(entryKey, JSON.stringify(entry));

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.error("Error saving entry:", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/new-entry?error=${encodeURIComponent(
          "Failed to save entry"
        )}`,
      },
    });
  }
};
