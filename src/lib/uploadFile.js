import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase"

export default function uploadFile(file, path) {
  const path = `path/${file.name}`

  const ref = ref(storage, path)

  const task = uploadBytesResumable(ref, file)

  task.on('state_changed',
    (snapshot) => {

    },
    (error) => {
      console.error(error);
    },
    async () => {
      const url = await getDownloadURL(task.snapshot.ref)
    }
  )
}