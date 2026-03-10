import "server-only";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";

export const SESSION_COOKIE_NAME = "session";

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionValue) {
    return null;
  }

  try {
    const decodedClaims = await getAdminAuth().verifySessionCookie(sessionValue, true);
    if (decodedClaims.admin) {
      return decodedClaims;
    }
  } catch {
    try {
      const decodedClaims = await getAdminAuth().verifyIdToken(sessionValue);
      if (decodedClaims.admin) {
        return decodedClaims;
      }
    } catch {
      return null;
    }
  }

  return null;
}

export async function verifyAdmin() {
  return verifyAdminSession();
}

export async function requireAdmin() {
  const session = await verifyAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function setSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
    expiresIn,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function revokeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
