// components/admin/AnalyticsChart.tsx
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsChart({ data }: { data: { name: string; views: number }[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
