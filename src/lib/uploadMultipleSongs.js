import uploadFile from "./uploadToFirestore";

export default async function uploadMultipleSongs(songsWithTags) {
  for (const file of songsWithTags) {
    try {
      const audioUpload = await uploadFile(file.audio, 'songs/')
      const coverUpload = await uploadFile(file.cover.file, 'covers/')
      
      // Create documents in Firestore, add SRC urls to uploads
      // for future reference
      // const docRef = await createDocument(file.tags, audioUrl, coverUrl)

    } catch (err) {
      console.log(err);
    }
  }
}