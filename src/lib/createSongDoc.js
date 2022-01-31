import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
// Creates song document in Firestore using
// cover image URL, songUrl, and Id3 tags

export default function createSongDoc(coverUrl, songUrl, id3Tags ) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, "songs"), {
        songUrl,
        coverUrl,
        title: id3Tags.tags.title,
        album: id3Tags.tags.album,
        artist: id3Tags.tags.artist,
        track: id3Tags.tags.track,
        year: id3Tags.tags.year
      })
      return resolve(docRef)
    } catch(err) {
      reject(err)
    }
  })
}