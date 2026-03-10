import type { Series } from "@/types/firestore";

export function serializeSeries(doc: FirebaseFirestore.DocumentSnapshot): Series {
  const data = doc.data();
  if (!data) {
    throw new Error(`Document ${doc.id} not found`);
  }

  return {
    id: doc.id,
    slug: data.slug || doc.id,
    title: data.title || "Untitled Series",
    description: data.description || "",
  };
}
