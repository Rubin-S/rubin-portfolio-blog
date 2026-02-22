// components/blog/ShareMenu.tsx
"use client";
import { Copy, Link2 } from "lucide-react";
import { useState } from "react";

export default function ShareMenu({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mt-12 flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
      <button onClick={copy} className="flex items-center gap-2 text-sm">
        <Link2 size={14} />
        {copied ? "Copied" : "Copy Link"}
      </button>

      {/* add "Share to X" later if needed */}
    </div>
  );
}
