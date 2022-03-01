import { query, orderBy, collection, getDocs, doc, getDoc, where, collectionGroup, limit } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useSWR from "swr";

export default function useCollection(coll, order, limit, keyword, swrPath) {
  const { data, error } = useSWR(swrPath, () => collectionFetcher(coll, order, limit, keyword))
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useDocument(collection, id) {
  const { data, error } = useSWR(`${collection}/${id}`, documentFetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useCollectionGroup(path, subColl) {
  const { data, error } = useSWR(`${path}/${subColl}`, () => collectionGroupFetcher(path, subColl))
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}


export function useAlbumsTesting(albumId) {
  const { data, error } = useSWR(albumId, albumsTesting)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useFeatured(coll) {
  const { data, error } = useSWR(`${coll}/featured`, () => featuredFetcher(coll))
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}


/*
  Fetchers, custom data fetchers for SWR custom hooks
*/

export async function featuredFetcher(coll) {
  const qRef = collection(db, coll)
  const q = query(qRef, where('featured', '==', true))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  if (docsBuffer.length > 0) return docsBuffer
  else throw new Error('No featured items found')
}


// Get a sub collection and return all of its docs in an array
export async function collectionGroupFetcher(path, subColl) {
  const buffer = []
  const docRef = doc(db, path)
  const docSnap = await getDoc(docRef)
  const docData = docSnap.data()
  if (!docSnap.exists()) throw new Error('No document with that path')

  const q = query(collectionGroup(db, subColl), where('id', 'in', docData[subColl]))
  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => buffer.push(doc.data()))

  if (buffer.length > 0) return buffer
  else throw new Error("No documents found in collection group")
}

export async function albumsTesting(albumId) {
  // get an album
  const docRef = doc(db, `albums/${albumId}`)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // get an albums songs
    const album = docSnap.data()
    const q = query(collection(db, `albums/${albumId}/songs`), orderBy('title'))

    const qSnapshot = await getDocs(q)
    const songs = []
    qSnapshot.forEach((doc) => songs.push(doc.data()))


    // Get a playlist and all of its songs
    const playlist = []
    const playlistDocRef = doc(db, `playlists/EOsTVelueb8nchPRUvug`)
    const playlistSnap = await getDoc(playlistDocRef)
    const playlistToQuery = playlistSnap.data()
    if (!playlistSnap.exists()) throw new Error('No playlist available')

    const playlistQuery = query(collectionGroup(db, 'songs'), where('id', 'in', playlistToQuery.songs))
    const playlistQSnap = await getDocs(playlistQuery)
    playlistQSnap.forEach((doc) => playlist.push(doc.data()))

    return { album, songs, playlist }

  } else throw new Error(`URL for "${albumId}" does not exist.`)
}

export async function collectionFetcher(coll, order, itemLimit, keyword) {

  const qRef = collection(db, coll)
  let q;

  if (keyword) {
    q = query(qRef, where(keyword.field, '==', keyword.value), limit(itemLimit))
  } else {
    q = query(qRef, orderBy(order), limit(itemLimit))
  }

  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  if (docsBuffer.length > 0) return docsBuffer
  else throw new Error('No playlist items found')
}

export async function documentFetcher(id) {
  const docRef = doc(db, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) return docSnap.data()
  else throw new Error(`URL for "${id}" does not exist.`)
}
