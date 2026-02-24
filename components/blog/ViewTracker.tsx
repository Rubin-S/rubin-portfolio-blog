// components/blog/ViewTracker.tsx
"use client";
import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed_${slug}`;
    if (sessionStorage.getItem(key)) return;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => {
        if (res.ok) sessionStorage.setItem(key, "1");
      })
      .catch(() => {});
  }, [slug]);

  return null;
}
