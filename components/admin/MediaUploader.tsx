// components/admin/MediaUploader.tsx
"use client";

import { useState } from "react";
import axios from "axios";

export default function MediaUploader({ onUploaded }: { onUploaded?: (url: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

 async function uploadFile(file: File) {
  setErr(null);
  setLoading(true);

  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  const res = await fetch("/api/admin/assets/upload", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: file.name, base64 }),
  });

  const json = await res.json();
  if (json.url) onUploaded?.(json.url);
  else setErr("Upload failed");

  setLoading(false);
}

  return (
    <div className="space-y-2">
      <label className="block text-sm">Upload asset</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
        }}
      />
      {loading && <div className="text-xs opacity-60">Uploading…</div>}
      {err && <div className="text-xs text-red-500">{err}</div>}
    </div>
  );
}
