"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AnalyticsChart = dynamic(
  () => import("@/components/admin/AnalyticsChart"),
  { ssr: false }
);

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-xl font-semibold">Analytics</h1>
      <AnalyticsChart data={posts.map(p => ({ name: p.title, views: p.metrics?.views || 0 }))} />
    </div>
  );
}
