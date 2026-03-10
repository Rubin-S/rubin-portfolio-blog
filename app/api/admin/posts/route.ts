import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    // 1. Security Check
    await requireAdmin();

    const { title, slug: requestedSlug } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    // 2. Validate/Clean Slug
    const slugSource = (requestedSlug ?? title).toString();
    const slug = slugify(slugSource, { lower: true, strict: true });

    if (!slug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const db = getAdminDb();
    const ref = db.collection("posts").doc(slug);

    // 3. Check for duplicates
    const existing = await ref.get();
    if (existing.exists) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    // 4. Create Document
    const now = new Date();
    
    await ref.set({
      title,
      slug,
      content: {}, // Empty JSON for Tiptap
      excerpt: "",
      status: "draft",
      published: false,
      publishedAt: null,
      updatedAt: now,
      createdAt: now,
      tags: [],
      metrics: { views: 0, likes: 0 },
    });

    // 5. Clear Cache
    revalidatePath("/rubin-admin/posts");

    return NextResponse.json({ slug, status: "draft" }, { status: 201 });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
