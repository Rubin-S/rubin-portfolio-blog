// app/api/admin/assets/upload/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAdminStorage } from "@/lib/firebase.admin";

export const runtime = "nodejs";


export async function POST(req: Request) {
  await requireAdmin();

  const { name, base64 } = await req.json();
  if (!name || !base64) {
    return NextResponse.json({ error: "missing name or base64" }, { status: 400 });
  }

  const buffer = Buffer.from(base64.replace(/^data:.+;base64,/, ""), "base64");

  const bucket = getAdminStorage().bucket();
  const file = bucket.file(`uploads/${Date.now()}-${name}`);

  await file.save(buffer, {
    contentType: "application/octet-stream",
    public: true,
  });

  const url = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  return NextResponse.json({ url });
}
