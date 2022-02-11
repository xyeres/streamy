import { query, orderBy, collection, getDocs, doc, getDoc, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useSWR from "swr";

export default function useAlbums() {
  const { data, error } = useSWR('/albums', albumsFetcher)
  return {
    albums: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useDocFetcher(collection, id) {
  const { data, error } = useSWR(`${collection}/${id}`, docFetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useAlbumSongs(albumId) {
  const { data, error } = useSWR(albumId, albumSongsFetcher)
  return {
    songs: data,
    isLoading: !error && !data,
    isError: error
  }
}

/*
  Fetchers, custom data fetchers for SWR custom hooks
*/

export async function albumsFetcher() {
  const qRef = collection(db, "albums")
  const q = query(qRef, orderBy("lastUpdated"))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  return docsBuffer
}

export async function docFetcher(id) {
  const docRef = doc(db, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) return docSnap.data()
  else throw new Error(`URL for "${id}" does not exist.`)
}

export async function albumSongsFetcher(albumId) {
  const qRef = collection(db, "songs")
  const q = query(qRef, where('albums', 'array-contains', albumId), orderBy("track"))
  const qSnapshot = await getDocs(q)
  const docsBuffer = []
  qSnapshot.forEach((doc) => docsBuffer.push(doc.data()))
  if (docsBuffer.length > 0) return docsBuffer
  else throw new Error(`Unable to fetch songs for ${albumId}`)
}