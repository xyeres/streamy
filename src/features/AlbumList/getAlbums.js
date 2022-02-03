import { query, orderBy, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default async function getAlbums() {
  const qRef = collection(db, "albums")
  const q = query(qRef, orderBy("lastUpdated"))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  return docsBuffer
}

export async function getAlbum(albumId) {
  const docRef = doc(db, "albums", albumId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    throw new Error(`URL for album "${albumId}" does not exist. \
    Please contact support
    `)
  }
}