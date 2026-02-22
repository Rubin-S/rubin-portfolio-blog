import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  })
});

(async () => {
  const user = await getAuth().getUser("wTVFJBrrS9NnvVXAn4yeqlySRVs1");
  console.log("Custom Claims:", user.customClaims);
})();
