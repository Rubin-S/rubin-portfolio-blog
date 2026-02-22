// components/blog/ViewTracker.tsx
"use client";
import { useEffect, useRef } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  const startRef = useRef(Date.now());

  useEffect(() => {
    // fire-and-forget POST to increment initial view
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});

    const beforeUnload = () => {
      const spent = Math.max(1000, Date.now() - startRef.current);
      // send reading-time (non-blocking)
      navigator.sendBeacon?.("/api/track-view", JSON.stringify({ slug, readMs: spent }));
    };

    window.addEventListener("pagehide", beforeUnload);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") beforeUnload();
    });

    return () => {
      beforeUnload();
      window.removeEventListener("pagehide", beforeUnload);
    };
  }, [slug]);

  return null;
}
