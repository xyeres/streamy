import { collectionGroup, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"

/**
 * Fetch documents that are tagged with "featured"
 * @param {*} collection
 * @returns 
 */

export default async function getFeatured(collection) {
  const qRef = collectionGroup(db, collection)
  const q = query(qRef, where('tags', 'array-contains', 'featured'))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => {
    const data = doc.data()
    const cleanedData = {
      ...data,
      lastUpdated: null
    }
    docsBuffer.push(cleanedData)
  })
  if (docsBuffer.length > 0) return docsBuffer
  else {
    const errText = JSON.stringify(docsBuffer)
    throw new Error(`No featured items found: ${errText}`)
  }
}