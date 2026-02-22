"use client";

import { useEffect, useRef, useState } from "react";

export default function FootnotePopover({ num, text }: { num: string; text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <sup className="relative text-zinc-500 dark:text-zinc-400 select-none">
      <span
        ref={ref}
        onClick={(e) => {
          e.stopPropagation(); // prevent closing immediately
          setOpen(!open);
        }}
        className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-200 transition"
      >
        {num}
      </span>

      {open && (
        <span className="absolute left-1/2 top-full z-50 w-max max-w-xs -translate-x-1/2 mt-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs leading-relaxed shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {text}
        </span>
      )}
    </sup>
  );
}
