import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase";


// Creates feedback document
export default async function setUserDoc(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(userRef)

      if (!docSnap.exists()) {
        const data = {
          uid: user.uid,
          lastModified: serverTimestamp() 
        }
        const docRef = await setDoc(userRef, data, { merge: true })
        resolve(docRef)
      }
      resolve('Already exists')
    } catch (err) {
      reject(err)
    }
  })
}