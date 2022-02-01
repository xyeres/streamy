import * as id3 from '//unpkg.com/id3js@^2/lib/id3.js';


export default async function extractID3Tags(mp3File) {
  try {
    // Get tags
    const rawTags = await id3.fromFile(mp3File);

    if (rawTags['images'] === undefined) {
      throw new Error('Cover art is missing. Try again.')
    }

    let coverImage = rawTags['images'][0]
    // Get cover file ending
    let mime = coverImage['mime']
    let fileEnding = mime.replace(/image\//gm, "")
    // Create new file from binary array
    let newFile = new File([coverImage['data']], `cover.${fileEnding}`, { type: `${mime}` })

    let cover = {
      mime,
      file: newFile
    }

    // Extract what we want
    const mp3WithTags = {
      audio: mp3File,
      tags: {
        album: rawTags['album'],
        artist: rawTags['artist'],
        title: rawTags['title'],
        track: rawTags['track'],
        year: rawTags['year']
      },
      cover
    }

    return mp3WithTags

  } catch (err) {
    throw err;
  }
}