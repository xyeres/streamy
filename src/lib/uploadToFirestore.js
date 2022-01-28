import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import extractID3Tags from "./extractID3Tags";
import { storage } from "./firebase";

export default async function uploadFile(file, path) {
  let url = null, fullPath = null
  const filePath = `${path}${file.name}`
  const fileRef = ref(storage, filePath)
  const task = uploadBytesResumable(fileRef, file)

  task.on('state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    },
    (error) => {
      console.error(error);
    },
    () => {

    }
  )
  // fullPath = task.snapshot.metadata.fullPath
  url = await getDownloadURL(task.snapshot.ref)
  return { url, fullPath }
}