"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AnalyticsPost {
  title?: string;
  metrics?: {
    views?: number;
  };
}

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<AnalyticsPost[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-xl font-semibold">Analytics</h1>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={posts.map((post) => ({
              name: post.title,
              views: post.metrics?.views || 0,
            }))}
          >
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
