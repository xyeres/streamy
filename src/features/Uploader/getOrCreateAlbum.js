import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
// Creates album document in Firestore using
// album id

export default function getOrCreateAlbum(album) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "albums", album.slug)
      
      const data = {
        id: docRef.id,
        title: album.title,
        artist: album.artist,
        artistSlug: album.artistSlug,
        coverUrl: album.coverUrl,
        lastUpdated: serverTimestamp()
      }

      await setDoc(docRef, data, { merge: true })
      
      resolve(docRef)
    } catch (err) {
      reject(err)
    }
  })
}