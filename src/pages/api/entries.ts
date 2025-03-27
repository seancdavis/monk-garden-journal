import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const notes = formData.get("notes");
    const image = formData.get("image");

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
    let imageUrl = null;
    if (image instanceof File && image.size > 0) {
      const imageStore = await getStore("garden-images");
      const imageKey = `${Date.now()}-${image.name}`;
      await imageStore.set(imageKey, image);
      imageUrl = `/uploads/${imageKey}`;
    }

    // Create journal entry
    const journalStore = await getStore("journal-entries");
    const entryKey = Date.now().toString();
    const entry = {
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
