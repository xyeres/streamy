import { query, orderBy, collection, getDocs, doc, getDoc, where, collectionGroup, limit } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useSWR from "swr";

/**
 * Use a collection with given constraints
 * @param {*} coll 
 * @param {*} order 
 * @param {*} limit 
 * @returns 
 */
export default function useCollection(coll, order = null, limit = 20) {
  const { data, error } = useSWR(`${coll}/${order}`, () => collectionFetcher(coll, order, limit))
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

/**
 * Fetch multiple album documents with given constraints
 * @param {*} keywords 
 * @param {*} order 
 * @param {*} itemLimit 
 * @param {*} swrkey 
 * @returns 
 */
export function useAlbums(keywords = null, order = null, itemLimit = 12, swrkey) {
  const { data, error } = useSWR(swrkey, () => albumsFetcher(keywords, order, itemLimit))
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

/**
 * Fetch a single album document
 * @param {*} albumId 
 * @returns 
 */
export function useAlbum(albumId) {
  const { data, error } = useSWR(`${albumId}/album`, () => albumFetcher(albumId))
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

/**
 * Fetch the songs related to a given albumId
 * @param {*} albumId 
 * @returns 
 */
export function useAlbumSongs(albumId) {
  const { data, error } = useSWR(`${albumId}/songs`, () => albumSongsFetcher(albumId))
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

/**
 * Fetch documents that are tagged with "featured"
 * @param {*} coll 
 * @returns 
 */
export async function featuredFetcher(coll) {
  const qRef = collectionGroup(db, coll)
  const q = query(qRef, where('tags', 'array-contains', 'featured'))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  if (docsBuffer.length > 0) return docsBuffer
  else throw new Error('No featured items found')
}

/**
 * Get a sub collection and return all of its docs in an array
 * @param {*} path 
 * @param {*} subColl 
 * @returns 
 */
export async function collectionGroupFetcher(path, subColl) {
  const buffer = []
  // Get the playlist doc
  const docRef = doc(db, path)
  const docSnap = await getDoc(docRef)
  const docData = docSnap.data()
  if (!docSnap.exists()) throw new Error('No document with that path')

  // Now get the song docs
  const q = query(collectionGroup(db, subColl), where('id', 'in', docData[subColl]))
  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => buffer.push(doc.data()))

  if (buffer.length > 0) return buffer
  else throw new Error("Can't seem to find anything here")
}

/**
 * Given an albumId, fetch and return the album document
 * @param {*} albumId 
 * @returns 
 */
export async function albumFetcher(albumId) {
  const buffer = []
  const qRef = collectionGroup(db, 'albums')

  let q = query(qRef, where('id', '==', albumId))
  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => buffer.push(doc.data()))

  if (buffer.length > 0) return buffer[0]
  else throw new Error(`Uh oh, ${albumId} not found`)
}

/**
 * Given an albumId and an artistId, fetch and return the album's songs
 * @param {*} albumId 
 * @returns array of song documents
 */
export async function albumSongsFetcher(albumId) {
  const buffer = []
  const qRef = collectionGroup(db, 'songs')

  let q = query(qRef, where('albumSlug', '==', albumId), orderBy('trackNo'))
  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => buffer.push(doc.data()))

  if (buffer.length > 0) return buffer
  else throw new Error(`Uh oh, ${albumId} not found`)
}


/**
 * Fetch and return album documents with given constraints
 * @param {*} keywords 
 * @param {*} order 
 * @param {*} itemLimit 
 * @returns array of documents
 */
export async function albumsFetcher(keywords, order, itemLimit) {
  const buffer = []
  const qRef = collectionGroup(db, 'albums')

  let q
  if (keywords) {
    const { field, opStr, value } = keywords
    q = query(qRef, where(field, opStr, value), limit(itemLimit))
  } else if (order) {
    q = query(qRef, orderBy(order), limit(itemLimit))
  } else {
    q = query(qRef, limit(itemLimit))
  }

  const qSnap = await getDocs(q)
  qSnap.forEach((doc) => buffer.push(doc.data()))

  if (buffer.length > 0) return buffer
  else throw new Error("Woops, no albums here yet")
}

/**
 * Function to test queries
 * @param {*} albumId 
 * @returns 
 */
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

/**
 * Fetches a collection given a collection name and constraints
 * @param {*} coll 
 * @param {*} order 
 * @param {*} itemLimit 
 * @returns 
 */
export async function collectionFetcher(coll, order, itemLimit) {

  const qRef = collection(db, coll)
  let q;

  if (order) {
    q = query(qRef, orderBy(order), limit(itemLimit))
  } else {
    q = query(qRef, limit(itemLimit))
  }

  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  if (docsBuffer.length > 0) return docsBuffer
  else throw new Error('No items found')
}

export async function documentFetcher(id) {
  const docRef = doc(db, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) return docSnap.data()
  else throw new Error(`URL for "${id}" does not exist.`)
}
