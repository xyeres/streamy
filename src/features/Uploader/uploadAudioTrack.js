import createOrGetAlbumDoc from "./createOrGetAlbumDoc";
import createSongDoc from "./createSongDoc";
import extractID3Tags from "./extractID3Tags";
import uploadToFirestore from "../../lib/uploadToFirestore";


export default async function uploadAudioTrack(mp3File, options = null) {
  try {
    if (options) options.setStatus(prevState => ({ ...prevState, message: `Extracting ID3 tags...` }))
    const tags = await extractID3Tags(mp3File)

    const audioFileUpload = await uploadToFirestore(tags.audio, 'songs/', options)
    const coverFileUpload = await uploadToFirestore(tags.cover.file, 'covers/', options)

    if (options) options.setStatus(prevState => ({ ...prevState, message: `Saving document...` }))
    const songDocRef = await createSongDoc(coverFileUpload.url, audioFileUpload.url, tags)

    // Create or get album document
    let albumDocRef;
    if (tags.tags.albumSlug) {
      albumDocRef = await createOrGetAlbumDoc(tags.tags.albumSlug, tags.tags.album, coverFileUpload.url, songDocRef.id)
    }

    if (options) options.setStatus({ item: mp3File.name, message: `100% complete` })
    return { songDocId: songDocRef.id, songUrl: audioFileUpload.url, coverUrl: coverFileUpload.url }

  } catch (err) {
    options.setStatus({ item: mp3File.name, message: `Error: ${err.message}` })
    throw err
  }
}