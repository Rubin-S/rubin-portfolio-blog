import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>Rubin S — Blog</title>
    <link>${process.env.SITE_URL}</link>
    <description>Portfolio + Blog</description>
  </channel></rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
