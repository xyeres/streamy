import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useEffect, useState } from "react"
import { storage } from "./firebase"

export default function useUploadFile(file, path, reactRef) {
  const [isUploading, setIsUploading] = useState(true);
  const [url, setUrl] = useState(null);
  const [fullPath, setFullPath] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reactRef.current) {
      const filePath = `${path}${file.name}`
      const fileRef = ref(storage, filePath)
      const task = uploadBytesResumable(fileRef, file)

      task.on('state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
        },
        (error) => {
          console.error(error);
        },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref)
          const fullPath = task.snapshot.ref.fullPath
          setFullPath(fullPath)
          setUrl(url)
          setIsUploading(false)
        }
      )
    }
    return () => {
      reactRef.current = false;
    }
  }, [file, path, reactRef]);

  return { isUploading, url, fullPath, progress }
}