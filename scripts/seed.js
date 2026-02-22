require("dotenv").config({ path: ".env.local" });
const admin = require("firebase-admin");

// Firebase Admin config
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });

  admin.firestore().settings({ ignoreUndefinedProperties: true });
}

const db = admin.firestore();
const { Timestamp } = admin.firestore;

// Delete in batches
async function nukeCollection(col) {
  const batchSize = 300;
  while (true) {
    const snap = await db.collection(col).limit(batchSize).get();
    if (snap.empty) break;
    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}

async function seed() {
  console.log("⚠️  Clearing old data...");
  await Promise.all([
    nukeCollection("posts"),
    nukeCollection("series"),
    nukeCollection("analytics"),
    nukeCollection("assets"),
    nukeCollection("drafts"),
  ]);

  console.log("🌱 Seeding new data...");

  // Series
  const seriesRef = db.collection("series").doc("systems-thinking");
  await seriesRef.set({
    id: seriesRef.id,
    slug: "systems-thinking",
    title: "Systems Thinking",
    description:
      "A mini-series on composition, language, and the edges between tools.",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // Posts
  const now = Timestamp.now();
  const posts = [
    {
      title: "Composability in 2025",
      slug: "composability-in-2025",
      excerpt:
        "What changes when everything composes — code, data, teams, and tools.",
      tags: ["systems", "engineering"],
      seriesId: seriesRef.id,
      seriesIndex: 1,
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello world." }] }] },
      status: "published",
      publishedAt: now,
      updatedAt: now,
      metrics: { views: 0, likes: 0 },
    },
    {
      title: "Language Models and Meaning",
      slug: "language-models-and-meaning",
      excerpt: "On representation, misuse, and what counts as understanding.",
      tags: ["ai", "semantics"],
      seriesId: seriesRef.id,
      seriesIndex: 2,
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Meaning is hard." }] }] },
      status: "draft",
      publishedAt: null,
      updatedAt: now,
      metrics: { views: 0, likes: 0 },
    },
  ];

  const batch = db.batch();
  posts.forEach((p) => {
    const ref = db.collection("posts").doc(p.slug);
    batch.set(ref, { id: ref.id, ...p });
  });
  await batch.commit();

  // Analytics
  await db.collection("analytics").doc("summary").set({
    lastUpdated: Timestamp.now(),
    totals: { posts: posts.length, views: 0, likes: 0 },
  });

  console.log("✅ Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
