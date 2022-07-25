import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";


export default async function getAllAlbums() {
  const buffer = []
  const albums = query(collectionGroup(db, 'albums'))
  const querySnapshot = await getDocs(albums)
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    const cleanedData = {
      ...data,
      lastUpdated: null
    }

    buffer.push(cleanedData)
  })
  return buffer
}
