import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Fetch and return album documents with given constraints
 * @param {*} keywords object
 * @param {*} order string
 * @param {*} itemLimit number - max number of items to return
 * @returns array of documents
 */

export default async function getAlbums(keywords, order, itemLimit) {
  const buffer = [];
  const qRef = collectionGroup(db, "albums");

  let q;
  const { field, opStr, value } = keywords;
  
  if (order && keywords) {
    q = query(
      qRef,
      where(field, opStr, value),
      orderBy(order),
      limit(itemLimit)
    );
  } else if (keywords) {
    q = query(qRef, where(field, opStr, value), limit(itemLimit));
  } else if (order) {
    q = query(qRef, orderBy(order), limit(itemLimit));
  } else {
    q = query(qRef, limit(itemLimit));
  }

  const qSnap = await getDocs(q);
  qSnap.forEach((doc) => {
    const data = doc.data();
    // Remove non-serializable properties
    const cleanedData = {
      ...data,
      lastUpdated: null,
    };
    buffer.push(cleanedData);
  });

  if (buffer.length > 0) return buffer;
  else return null;
}
