"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress((scrolled / height) * 100);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[999]">
      <div
        className="h-full bg-zinc-900 dark:bg-white transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
