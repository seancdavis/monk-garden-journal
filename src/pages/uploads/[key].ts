import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";

export const GET: APIRoute = async ({ params }) => {
  if (!params.key) {
    return new Response("Image key is required", { status: 400 });
  }

  const imageStore = await getStore({
    name: "garden-images",
    consistency: "strong",
  });
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
