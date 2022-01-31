import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "./firebase";

export default function uploadToFirestore(file, path, options = null) {
  return new Promise((resolve, reject) => {
    try {
      let setStatus
      if (options.setStatus) setStatus = options.setStatus

      let url = null, metadata = null
      const filePath = `${path}${uuidv4()}${file.name}`
      const fileRef = ref(storage, filePath)
      const task = uploadBytesResumable(fileRef, file)

      task.on('state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (setStatus) setStatus(prevState => ({ ...prevState, item: file.name, message: `${progress.toFixed(0)}% complete` }))
        },
        (error) => {
          if (setStatus) setStatus(prevState => ({ ...prevState, item: file.name, message: `Error, please try again` }))
          reject(error)
        },
        async () => {
          url = await getDownloadURL(task.snapshot.ref)
          metadata = task.snapshot.metadata
          resolve({ url, metadata })
        }
      )
    } catch(err) {
      throw err;
    }
  })
}