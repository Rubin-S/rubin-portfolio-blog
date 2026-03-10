import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idToken = body.idToken;

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    // Use our centralized auth logic from Phase 1
    await setSessionCookie(idToken);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("[LOGIN API] Error creating session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
