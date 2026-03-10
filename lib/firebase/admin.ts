import "server-only";
import * as admin from "firebase-admin";

interface FirebaseAdminConfig {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  const cleaned = key.replace(/^"|"$/g, "");

  if (cleaned.includes("\\n")) {
    return cleaned.replace(/\\n/g, "\n");
  }

  return cleaned;
}

export function createFirebaseAdminApp(config: FirebaseAdminConfig) {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: config.projectId,
    clientEmail: config.clientEmail,
    privateKey: formatPrivateKey(config.privateKey),
  });

  return admin.initializeApp({
    credential: cert,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
  });
}

export function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "";

  if (!projectId || !clientEmail || !privateKey) {
    console.error("FIREBASE ADMIN ERROR: Missing Environment Variables.");
    console.error(`   Project ID: ${projectId ? "OK" : "Missing"}`);
    console.error(`   Email: ${clientEmail ? "OK" : "Missing"}`);
    console.error(`   Private Key: ${privateKey ? "OK (Check format)" : "Missing"}`);
    throw new Error("Missing FIREBASE_ADMIN env vars");
  }

  return createFirebaseAdminApp({
    projectId,
    clientEmail,
    storageBucket,
    privateKey,
  });
}

export function getAdminDb() {
  return getAdminApp().firestore();
}

export function getAdminAuth() {
  return getAdminApp().auth();
}

export function getAdminStorage() {
  return getAdminApp().storage();
}
