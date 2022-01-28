import { v4 as uuidv4 } from 'uuid';
import * as id3 from '//unpkg.com/id3js@^2/lib/id3.js';

export default async function extractID3Tags(mp3Files) {
  const songsWithTagsBuffer = []

  for (const file of mp3Files) {
    // Get tags
    const rawTags = await id3.fromFile(file);
    // Get file ending
    let mime = rawTags['images'][0]['mime']
    let fileEnding = mime.replace(/image\//gm, "")

    // Extract what we want
    const tagsToSave = {
      audio: file,
      tags: {
        album: rawTags['album'],
        artist: rawTags['artist'],
        title: rawTags['title'],
        track: rawTags['track'],
        year: rawTags['year']
      },
      cover: {
        mime: rawTags['images'][0]['mime'],
        file: new File(
          [rawTags['images'][0]['data']],
          `cover-${uuidv4()}.${fileEnding}`,
          { type: `${rawTags['images'][0]['mime']}` }
        )
      }
    }
    // Push to buffer
    songsWithTagsBuffer.push(tagsToSave)
  }
  return songsWithTagsBuffer
}