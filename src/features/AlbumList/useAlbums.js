import { query, orderBy, collection, getDocs, doc, getDoc, where, collectionGroup } from "firebase/firestore";
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

export function useAlbumsTesting(albumId) {
  const { data, error } = useSWR(albumId, albumsTesting)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

/*
  Fetchers, custom data fetchers for SWR custom hooks
*/

export async function albumsTesting(albumId) {
  // get an album
  const docRef = doc(db, `albums/${albumId}`)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // const data = docSnap.data()
    // const q = query(collection(db, 'songs'), where('id', 'in', data.songs))

    // const qSnapshot = await getDocs(q)
    // const songs = []
    // qSnapshot.forEach((doc) => songs.push(doc.data()))

    // get an albums songs
    const album = docSnap.data()
    const q = query(collection(db, `albums/${albumId}/songs`), orderBy('title'))

    const qSnapshot = await getDocs(q)
    const songs = []
    qSnapshot.forEach((doc) => songs.push(doc.data()))


    // Get a playlist and all of its songs
    const playlist = []
    const playlistDocRef = doc(db, 'playlists/EOsTVelueb8nchPRUvug')
    const playlistSnap = await getDoc(playlistDocRef)
    const playlistToQuery = playlistSnap.data()
    if (!playlistSnap.exists()) throw new Error('No playlist available')
    const playlistQuery = query(collectionGroup(db, 'songs'), where('id', 'in', playlistToQuery.songs))
    const playlistQSnap = await getDocs(playlistQuery)
    playlistQSnap.forEach((doc) => playlist.push(doc.data()))

    return { album, songs, playlist }

  } else throw new Error(`URL for "${albumId}" does not exist.`)
}

/*
export async function albumsTesting(albumId) {
  const docRef = doc(db, `albums/${albumId}`)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    const songs = await Promise.all(
      await data.songs.map(async (songId) => {
        const songRef = doc(db, `songs/${songId}`)
        const docSnap = await getDoc(songRef)

        if (docSnap.exists()) {
          return docSnap.data()
        }
      }))

    return { album: data, songs }

  } else throw new Error(`URL for "${albumId}" does not exist.`)
}

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

