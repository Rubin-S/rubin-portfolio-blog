"use client";

import { useState } from "react";

export default function TocDropdown({ headings }: { headings: { text: string; id: string; level: number }[] }) {
  const [open, setOpen] = useState(false);

  if (!headings.length) return null;

  return (
    <div className="relative mb-10">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 shadow-sm hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500 transition"
      >
        Contents ▾
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-60 rounded-lg border border-zinc-200 bg-white p-2 text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 z-50">
          {headings.map(h => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={() => setOpen(false)}
              className="block px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              style={{ paddingLeft: (h.level - 2) * 12 }}
            >
              {h.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
