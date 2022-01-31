import createSongDoc from "./createSongDoc";
import extractID3Tags from "./extractID3Tags";
import uploadToFirestore from "./uploadToFirestore";


export default async function uploadAudioTrack(file, options = null) {
  try {
    if (options) options.setStatus(prevState => ({ ...prevState, message: `Extracting ID3 tags...` }))
    const tags = await extractID3Tags(file)
    
    const audioFileUpload = await uploadToFirestore(tags.audio, 'songs/', options)
    const coverFileUpload = await uploadToFirestore(tags.cover.file, 'covers/', options)

    if (options) options.setStatus(prevState => ({ ...prevState, message: `Saving document...` }))
    const docRef = await createSongDoc(coverFileUpload.url, audioFileUpload.url, tags)

    if (options) options.setStatus({ item: file.name, message: `100% complete` })
    return { docId: docRef.id, songUrl: audioFileUpload.url, coverUrl: coverFileUpload.url }

  } catch (err) {
    options.setStatus({ item: file.name, message: `Error: ${err.message}` })
    throw err
  }
}