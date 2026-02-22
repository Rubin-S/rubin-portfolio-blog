import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { idToken } = await req.json();
  if (!idToken) return NextResponse.json({ error: "missing token" }, { status: 400 });
  await setSessionCookie(idToken);
  return NextResponse.json({ ok: true });
}
