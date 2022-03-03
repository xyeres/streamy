import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";


// Creates feedback document
export default function createFeedbackInDb(text, emotion) {
  return new Promise(async (resolve, reject) => {
    try {

      const data = {
        text,
        emotion,
        lastUpdated: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, "feedback"), data)

      resolve(docRef)
    } catch (err) {
      reject(err)
    }
  })
}