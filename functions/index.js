const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.incrementPlayCountByOne = functions.https.onCall(async (data) => {
  const { id, artistSlug, albumSlug } = data
  const currentYearMonth = new Date().toISOString().slice(0, 7)
  const increment = admin.firestore.FieldValue.increment(1)
  const serverTime = admin.firestore.FieldValue.serverTimestamp()

  const docData = {
    ...data,
    lastUpdated: serverTime,
    playCount: increment
  }

  // Increment month's total play count
  await admin.firestore().doc(`analytics/${currentYearMonth}`)
    .set({ lastUpdated: serverTime, totalPlays: increment }, { merge: true })

  // Update plays collection doc with data
  await admin.firestore().doc(`analytics/${currentYearMonth}/plays/${id}`)
    .set(docData, { merge: true })

  // Update individual song's lifetime playcount
  await admin.firestore().doc(`artists/${artistSlug}/albums/${albumSlug}/songs/${id}`)
    .set({ playCount: increment }, { merge: true })

  functions.logger.info(`${data.title} play count incremented`, { structuredData: true });

});
