"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import type { PostStatus as FirestorePostStatus } from "@/types/firestore";

// --- Types ---
export type PostStatus = Extract<FirestorePostStatus, "draft" | "published">;

export interface CreatePostState {
    error?: string;
    slug?: string;
}

export interface UpdatePostState {
    error?: string;
    success?: boolean;
    status?: string;
    lastSaved?: string;
}

interface UpdatePostInput {
    title?: string;
    excerpt?: string;
    content?: unknown;
    tags?: string[];
    status?: string;
    seriesId?: string | null;
    seriesIndex?: number;
}

// --- Actions ---

export async function createPost(prevState: CreatePostState, formData: FormData): Promise<CreatePostState> {
    const session = await verifyAdminSession();
    if (!session) return { error: "Unauthorized" };

    const title = formData.get("title") as string;
    const requestedSlug = formData.get("slug") as string;

    if (!title) return { error: "Title is required" };

    const slugSource = (requestedSlug || title).toString();
    const slug = slugify(slugSource, { lower: true, strict: true });

    if (!slug) return { error: "Invalid slug" };

    const db = getAdminDb();
    const ref = db.collection("posts").doc(slug);

    const existing = await ref.get();
    if (existing.exists) {
        return { error: "A post with this slug already exists." };
    }

    const now = new Date();

    await ref.set({
        title,
        slug,
        content: {},
        excerpt: "",
        status: "draft",
        published: false,
        publishedAt: null,
        updatedAt: now,
        createdAt: now,
        tags: [],
        metrics: { views: 0, likes: 0 },
    });

    revalidatePath("/rubin-admin/posts");
    return { slug };
}

export async function updatePost(slug: string, data: UpdatePostInput): Promise<UpdatePostState> {
    const session = await verifyAdminSession();
    if (!session) return { error: "Unauthorized" };

    const db = getAdminDb();
    const ref = db.collection("posts").doc(slug);

    const updates: Record<string, unknown> = {
        updatedAt: new Date(),
    };

    if (data.title) updates.title = data.title;
    if (data.excerpt) updates.excerpt = data.excerpt;
    if (data.content) updates.content = data.content;
    if (data.tags) updates.tags = data.tags;

    // Series updates
    if (data.seriesId !== undefined) updates.seriesId = data.seriesId || null;
    if (data.seriesIndex !== undefined) updates.seriesIndex = data.seriesIndex;

    if (data.status) {
        updates.status = data.status;
        updates.published = data.status === "published";
        if (data.status === "published") {
            // Only update publishedAt if it wasn't set before or if explicitly requested?
            // For now, let's update it on publish.
            updates.publishedAt = new Date();
        }
    }

    await ref.update(updates);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/rubin-admin/posts/${slug}/edit`);

    return { success: true, status: data.status, lastSaved: new Date().toISOString() };
}

export async function deletePost(slug: string) {
    const session = await verifyAdminSession();
    if (!session) return { error: "Unauthorized" };

    const db = getAdminDb();
    await db.collection("posts").doc(slug).delete();

    revalidatePath("/rubin-admin/posts");
    revalidatePath("/blog");
}
