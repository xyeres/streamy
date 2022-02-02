import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
// Creates album document in Firestore using
// album id

export default function createOrGetAlbumDoc(albumId, albumTitle, coverUrl, songId) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "albums", albumId)
      const data = {
        id: docRef.id,
        title: albumTitle,
        coverUrl,
        songs: arrayUnion(songId),
        lastUpdated: serverTimestamp()
      }
      const result = await setDoc(docRef, data, { merge: true })
      resolve(result)

    } catch (err) {
      reject(err)
    }
  })
}