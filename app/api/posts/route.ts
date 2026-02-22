import { NextResponse } from "next/server";
import { getPaginatedPosts } from "@/lib/posts.server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor") ?? undefined;
  const { posts, nextCursor } = await getPaginatedPosts(6, cursor);
  return NextResponse.json({ posts, nextCursor });
}
