import getOrCreateAlbum from "./getOrCreateAlbum";
import getOrCreateSong from "./getOrCreateSong";
import extractID3Tags from "../../lib/extractID3Tags";
import uploadToFirestore from "../../lib/uploadToFirestore";


export default async function uploadAudioTrack(mp3File, setStatus) {
  try {
    setStatus(prevState =>
      ({ ...prevState, message: `Extracting ID3 tags...` }))
    const id3 = await extractID3Tags(mp3File)

    const audioUpload
      = await uploadToFirestore(id3.audio, 'songs/', setStatus)
    const coverUpload
      = await uploadToFirestore(id3.cover.file, 'covers/', setStatus)

    setStatus(prevState =>
      ({ ...prevState, message: `Saving document...` }))

    if (!id3.tags.albumSlug)
      throw new Error('No album title found, check ID3 tags and try again')

    const album = {
      slug: id3.tags.albumSlug,
      title: id3.tags.album, 
      artist: id3.tags.artist,
      artistSlug: id3.tags.artistSlug,
      coverUrl: coverUpload.url,
    }

    await getOrCreateAlbum(album)

    const song = {
      songUrl: audioUpload.url,
      coverUrl: coverUpload.url,
      albumSlug: album.slug,
      artistSlug: id3.tags.artistSlug,
    }

    await getOrCreateSong(song, id3)

    setStatus({ item: mp3File.name, message: `100% complete` })

    return {
      songUrl: audioUpload.url,
      coverUrl: coverUpload.url
    }

  } catch (err) {
    setStatus({ item: mp3File.name, message: `Error: ${err.message}` })
    throw err
  }
}