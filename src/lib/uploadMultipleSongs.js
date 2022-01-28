async function uploadMultipleSongsWithTags(songsWithTags) {
  for (const file of songsWithTags) {
    try {
      const audioUrl = await uploadSong(file.audio)
      const coverUrl = await uploadCover(file.cover.file)
      const docRef = await createDocument(file.tags, audioUrl, coverUrl)
    } catch (err) {
      console.log(err);
    }
  }
}