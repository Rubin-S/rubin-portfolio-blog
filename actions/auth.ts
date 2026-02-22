"use server";

import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase.admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createSession(idToken: string) {
    try {
        if (!idToken) {
            return { error: "No ID token provided" };
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        // Verify the ID token and check for the admin claim
        const decodedToken = await getAdminAuth().verifyIdToken(idToken);

        if (!decodedToken.admin) {
            return { error: "Unauthorized: You do not have admin privileges." };
        }

        // Create the session cookie
        let sessionCookie;
        try {
            sessionCookie = await getAdminAuth().createSessionCookie(idToken, { expiresIn });
        } catch (e) {
            // Fallback: Use ID token if session cookie creation fails (e.g. permission issues)
            // This is still secure, but session expires in 1 hour instead of 5 days.
            sessionCookie = idToken;
        }

        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

    } catch (error) {
        console.error("Error creating session:", error);
        return { error: "Authentication failed. Please try again." };
    }

    redirect("/rubin-admin");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect("/login");
}
