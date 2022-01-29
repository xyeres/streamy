import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "./firebase";

export default async function uploadToFirestore(file, path) {
  return new Promise((resolve, reject) => {
    let url = null, metadata = null
    const filePath = `${path}${uuidv4()}${file.name}`
    const fileRef = ref(storage, filePath)
    const task = uploadBytesResumable(fileRef, file)

    task.on('state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        reject(error)
      },
      async () => {
        url = await getDownloadURL(task.snapshot.ref)
        metadata = task.snapshot.metadata
        resolve({ url, metadata})
      }
    )
  })
}