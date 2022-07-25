import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Fetches a collection given a collection name and constraints
 * @param {*} coll string
 * @param {*} order string
 * @param {*} itemLimit number
 * @returns 
 */

export default async function getCollection(coll, order, itemLimit) {

  const qRef = collection(db, coll)
  let q;

  if (order) {
    q = query(qRef, orderBy(order), limit(itemLimit))
  } else {
    q = query(qRef, limit(itemLimit))
  }

  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => {
    const data = doc.data()
    // Remove non-serializable properties
    const cleanedData = {
      ...data,
      lastUpdated: null
    }
    docsBuffer.push(cleanedData)
  })
  if (docsBuffer.length > 0) return docsBuffer
  else throw new Error('No items found')
}