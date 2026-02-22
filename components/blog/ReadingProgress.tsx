"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(Math.min(current / total, 1));
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-zinc-900 dark:bg-white origin-left z-[999]"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
