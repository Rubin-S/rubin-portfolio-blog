import "server-only";
import { cache } from "react";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Series } from "@/types/firestore";
import { serializeSeries } from "@/lib/series/serialize";

export const getAllSeries = cache(async function getAllSeries(): Promise<Series[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("series").get();
  return snapshot.docs.map(serializeSeries);
});

export const getSeriesBySlug = cache(async function getSeriesBySlug(
  slug: string
): Promise<Series | null> {
  const db = getAdminDb();
  const snapshot = await db.collection("series").where("slug", "==", slug).limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  return serializeSeries(snapshot.docs[0]);
});
