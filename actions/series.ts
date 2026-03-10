"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";

export interface CreateSeriesState {
    error?: string;
    slug?: string;
}

export interface UpdateSeriesState {
    error?: string;
    success?: boolean;
    lastSaved?: string;
}

interface UpdateSeriesInput {
    title?: string;
    description?: string;
}

export async function createSeries(prevState: CreateSeriesState, formData: FormData): Promise<CreateSeriesState> {
    const session = await verifyAdminSession();
    if (!session) return { error: "Unauthorized" };

    const title = formData.get("title") as string;
    const requestedSlug = formData.get("slug") as string;

    if (!title) return { error: "Title is required" };

    const slugSource = (requestedSlug || title).toString();
    const slug = slugify(slugSource, { lower: true, strict: true });

    if (!slug) return { error: "Invalid slug" };

    const db = getAdminDb();
    const ref = db.collection("series").doc(slug);

    const existing = await ref.get();
    if (existing.exists) {
        return { error: "A series with this slug already exists." };
    }

    await ref.set({
        title,
        slug,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    revalidatePath("/rubin-admin/series");
    return { slug };
}

export async function updateSeries(slug: string, data: UpdateSeriesInput): Promise<UpdateSeriesState> {
    const session = await verifyAdminSession();
    if (!session) return { error: "Unauthorized" };

    const db = getAdminDb();
    const ref = db.collection("series").doc(slug);

    const updates: Record<string, unknown> = {
        updatedAt: new Date(),
    };

    if (data.title) updates.title = data.title;
    if (data.description) updates.description = data.description;

    await ref.update(updates);

    revalidatePath("/rubin-admin/series");
    revalidatePath("/blog");
    revalidatePath(`/series/${slug}`);

    return { success: true, lastSaved: new Date().toISOString() };
}
