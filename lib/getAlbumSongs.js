import { collectionGroup, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "./firebase"

/**
 * Given an albumId and an artistId, fetch and return the album's songs
 * @param {*} albumId 
 * @returns array of song documents
 */
export async function getAlbumSongs(albumId) {
  const buffer = []
  const qRef = collectionGroup(db, 'songs')

  let q = query(qRef, where('albumSlug', '==', albumId), orderBy('trackNo'))
  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => {
    const data = doc.data()
    const cleanedData = {
      ...data,
      lastUpdated: null
    }

    buffer.push(cleanedData)
  })

  if (buffer.length > 0) return buffer
  else throw new Error(`Uh oh, ${albumId} not found`)
}