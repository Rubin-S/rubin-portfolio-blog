import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
  console.error("\n❌ Missing Firebase Admin env vars.\n");
  console.log("Check .env.local formatting and location.\n");
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey
  })
});

async function main() {
  const uid = process.argv[2];
  if (!uid) {
    console.error("\nUsage: npx ts-node tools/setAdminClaim.ts <UID>\n");
    process.exit(1);
  }

  await getAuth().setCustomUserClaims(uid, { admin: true });
  console.log(`\n✅ Admin claim set successfully for UID: ${uid}\n`);
}

main();
