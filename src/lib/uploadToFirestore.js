import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

export default function uploadToFirestore(fileList, directory, setStatus) {
  const urls = []

  for (const file of fileList) {
    const fileRef = ref(storage, `${directory}${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

    setStatus([])

    let initialState = {
      progress: 0,
      isLoading: true,
      name: file.name
    }

    setStatus(prevState => [...prevState, initialState])

    uploadTask.on('state_changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setStatus(prevState => {
          let updateExistingState = prevState.map((obj) => {
            if (obj.name === snapshot.ref.name) return { ...obj, progress }
            return obj
          })
          return [...updateExistingState]
        })

      },
      (error) => {
        console.error(error);
      },

      // On upload complete:
      () => {
        setStatus(prevState => {
          let newState = prevState.map((obj) => ({ ...obj, isLoading: false }))
          return [...newState]
        })

        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setStatus(prevState => {
              let newState = prevState.map((obj) => ({ ...obj, url }))
              return [...newState]
            })

            console.log(`File available at: ${url}`);
          })
      })
  }
}