const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.incrementPlayCountByOne = functions.https.onCall(async (data) => {
  const { id } = data
  const currentYearMonth = new Date().toISOString().slice(0, 7)
  const increment = admin.firestore.FieldValue.increment(1)
  const serverTime = admin.firestore.FieldValue.serverTimestamp()

  const docData = {
    ...data,
    lastUpdated: serverTime,
    playCount: increment
  }

  // Make sure the current month's document exists
  const monthDoc = await admin.firestore().doc(`metadata/${currentYearMonth}`).get()
  if (!monthDoc.exists) {
    await admin.firestore().doc(`metadata/${currentYearMonth}`).create({ createdAt: serverTime })
  }

  await admin.firestore().doc(`metadata/${currentYearMonth}/plays/${id}`).set(docData, { merge: true })

  functions.logger.info(`${data.title} play count incremented`, { structuredData: true });

});

exports.aggregateReportPlays = functions.firestore
  .document('metadata/{monthId}/plays/{playId}')
  .onWrite(async (change, context) => {
    const monthRef = admin.firestore().collection('metadata').doc(context.params.monthId)

    await admin.firestore().runTransaction(async (transaction) => {
      const monthDoc = await transaction.get(monthRef)
      const newTotalPlays = (monthDoc.data().totalPlays || 0) + 1
      transaction.update(monthRef, { totalPlays: newTotalPlays })
    })
  })