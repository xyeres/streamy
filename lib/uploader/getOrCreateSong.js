import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Creates song document in Firestore using
// cover image URL, songUrl, and Id3 tags
export default function getOrCreateSong(song, id3) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(collection(db, `albums/${song.albumSlug}/songs`))

      const data = {
        id: docRef.id,
        songUrl: song.songUrl,
        coverUrl: song.coverUrl,
        albumSlug: song.albumSlug,
        artistSlug: song.artistSlug,
        genre: id3.tags.genre,
        comments: id3.tags.comments,
        artist: id3.tags.artist,
        title: id3.tags.title,
        track: id3.tags.track,
        year: id3.tags.year
      }

      await setDoc(docRef, data, { merge: true })
      
      resolve(docRef)
    } catch (err) {
      reject(err)
    }
  })
}