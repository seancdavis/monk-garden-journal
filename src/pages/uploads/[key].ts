import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";

export const GET: APIRoute = async ({ params }) => {
  const imageStore = await getStore("garden-images");
  const image = await imageStore.get(params.key, { type: "stream" });

  if (!image) {
    return new Response("Image not found", { status: 404 });
  }

  return new Response(image, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000",
    },
  });
};
