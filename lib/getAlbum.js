import { collectionGroup, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"

/**
 * Given an albumId, fetch and return the album document
 * @param {*} albumId 
 * @returns 
 */
export default async function getAlbum(albumId) {
  const buffer = []
  const qRef = collectionGroup(db, 'albums')

  let q = query(qRef, where('id', '==', albumId))
  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => {
    const data = doc.data()
    // Remove non-serializable properties
    const cleanedData = {
      ...data,
      lastUpdated: null
    }
    buffer.push(cleanedData)
  })

  if (buffer.length > 0) return buffer[0]
  else throw new Error(`Uh oh, ${albumId} not found`)
}