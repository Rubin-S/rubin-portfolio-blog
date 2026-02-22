"use server";

import { cookies } from "next/headers";
import type { Typography } from "@/lib/typography";

export async function setTypography(mode: Typography) {
  (await cookies()).set("typo", mode, {
    path: "/",                // ✅ ensure global visibility
    sameSite: "lax",          // ✅ allow SSR access
    httpOnly: false,          // ✅ must be client AND server readable
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getTypography() {
  return (await cookies()).get("typo")?.value as Typography | undefined;
}
