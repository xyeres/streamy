import { collectionGroup, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import useSWR from "swr";
import { db } from "../../lib/firebase";

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


/*
  Fetchers, custom data fetchers for SWR custom hooks
*/

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

  const songIds = docData[subColl]
  const queries = []

  for (let i = 0; i < songIds.length; i += 10) {
    queries.push(
      query(collectionGroup(db, subColl), where('id', 'in', songIds.slice(i, i + 10)))
    )
  }

  let songsDocsSnaps = []

  for (let i = 0; i < queries.length; i++) {
    songsDocsSnaps.push(getDocs(queries[i]))
  }

  songsDocsSnaps = await Promise.all(songsDocsSnaps)

  const songsDocs = [...new Set([].concat(...songsDocsSnaps.map((o)=>o.docs)))]

  songsDocs.forEach((doc) => buffer.push(doc.data()))

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
 * A simple document fetcher
 * @param {*} id 
 * @returns document data
 */
export async function documentFetcher(id) {
  const docRef = doc(db, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) return docSnap.data()
  else throw new Error(`URL for "${id}" does not exist.`)
}
