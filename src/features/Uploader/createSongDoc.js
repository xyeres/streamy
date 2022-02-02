import { addDoc, collection, arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";
// Creates song document in Firestore using
// cover image URL, songUrl, and Id3 tags

export default function createSongDoc(coverUrl, songUrl, id3Tags) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, "songs"), {
        songUrl,
        coverUrl,
        album: id3Tags.tags.album,
        albums: [id3Tags.tags.albumSlug],
        genre: id3Tags.tags.genre,
        comments: id3Tags.tags.comments,
        artist: id3Tags.tags.artist,
        title: id3Tags.tags.title,
        track: id3Tags.tags.track,
        year: id3Tags.tags.year
      })
      return resolve(docRef)
    } catch (err) {
      reject(err)
    }
  })
}