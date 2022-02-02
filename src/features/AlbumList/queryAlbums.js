import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default async function queryAlbums() {
  const qRef = collection(db, "albums")
  const q = query(qRef, orderBy("lastUpdated"))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  return docsBuffer
}