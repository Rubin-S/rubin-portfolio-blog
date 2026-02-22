import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey
        })
    });
}

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error("Please provide an email.");
        process.exit(1);
    }

    try {
        const user = await getAuth().getUserByEmail(email);
        await getAuth().setCustomUserClaims(user.uid, { admin: true });
        console.log(`SUCCESS: Admin claim set for ${email} (UID: ${user.uid})`);
    } catch (error) {
        console.error("ERROR:", error);
    }
}

main();
