import "server-only";
import { getAdminDb } from "@/lib/firebase.admin";
import type { Series } from "@/types/firestore";

export function serializeSeries(doc: FirebaseFirestore.DocumentSnapshot): Series {
    const data = doc.data();
    if (!data) throw new Error(`Document ${doc.id} not found`);

    return {
        id: doc.id,
        slug: data.slug || doc.id,
        title: data.title || "Untitled Series",
        description: data.description || "",
    };
}

export async function getAllSeries(): Promise<Series[]> {
    const db = getAdminDb();
    const snapshot = await db.collection("series").get();
    return snapshot.docs.map(serializeSeries);
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
    const db = getAdminDb();
    const snapshot = await db.collection("series").where("slug", "==", slug).limit(1).get();

    if (snapshot.empty) return null;
    return serializeSeries(snapshot.docs[0]);
}
