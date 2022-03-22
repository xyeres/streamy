import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../src/firebase";


// Creates feedback document
export default function createFeedbackInDb(text, emotion, user) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        text,
        emotion,
        lastUpdated: serverTimestamp()
      }
      
      if (user) data.user = user

      const docRef = await addDoc(collection(db, "feedback"), data)
      resolve(docRef)
    } catch (err) {
      reject(err)
    }
  })
}