"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("h2, h3"));
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent || "",
      }))
    );
  }, []);

  if (!headings.length) return null;

  return (
    <aside className="sticky top-28 hidden lg:block w-56 text-sm space-y-2 opacity-70">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className="block hover:opacity-100 hover:translate-x-[2px] transition-all"
        >
          {h.text}
        </a>
      ))}
    </aside>
  );
}
