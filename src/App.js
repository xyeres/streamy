import { useState } from "react";
import Uploader from './features/Uploader/Uploader'
import extractID3Tags from "./lib/extractID3Tags";
import uploadMultipleSongs from "./lib/uploadMultipleSongs";
import uploadToFirestore from "./lib/uploadToFirestore";


function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const onFileInputChange = async (e) => {
    setFiles([...e.target.files])

    const songsWithTags = await extractID3Tags(files)
    const result = await uploadMultipleSongs(songsWithTags)
  }

  const onBtnClick = async () => {
    console.log('testing area...');
  }

  const onDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const onDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const onDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setFiles([...e.dataTransfer.files])
    setIsDragging(false)
  }

  return (
    <>
      <div className="mt-7 mx-9">
        <button onClick={onBtnClick} className="p-5 bg-gray-200 m-4">Click me yo</button>
        <h1 className="text-3xl mb-5">Upload audio to Streamy app backend</h1>
        <div id="dropzone"
          onDragOver={onDragIn}
          onDragLeave={onDragOut}
          onDrop={onDrop}
          className={isDragging ?
            'm-10 flex flex-col items-center justify-center bg-pink-200 p-16 border-dashed border-4 border-pink-900' :
            'm-10 flex flex-col items-center justify-center border-dashed border-4 border-pink-400 bg-pink-100 p-16'}
        >
          <p className="font-bold">Drag files here to upload</p>
          <label htmlFor="fileInput" className="m-4 p-4 text-white font-bold bg-pink-300 rounded-lg border-solid border-4 border-pink-500">Or browse for a file</label>
          <input className="sr-only" onChange={onFileInputChange} multiple id="fileInput" type='file' />
          <Uploader path='/some/path/here/' files={filesToUpload} />
        </div>
      </div>
    </>
  );
}


export default App;
