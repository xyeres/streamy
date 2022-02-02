import { query, orderBy, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default async function querySongs(albumId) {
  const qRef = collection(db, "songs")
  const q = query(qRef, where('albums', 'array-contains', albumId), orderBy("track"))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  return docsBuffer
}