import { useState } from "react";
import extractID3Tags from "./extractID3Tags";
import Uploader from './Uploader'


export default function UploadDashboard() {
  const [isDragging, setIsDragging] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const onFileInputChange = async (e) => {
    setFilesToUpload([...e.target.files])
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
    setFilesToUpload([...e.dataTransfer.files])
    setIsDragging(false)
  }


  return (
    <div className="mt-7 mx-9">
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
        <label htmlFor="fileInput" className="m-4 p-4 text-white font-bold bg-pink-300 hover:bg-pink-400 hover:drop-shadow-sm rounded-lg border-solid border-4 border-pink-500">Or browse for a file</label>
        <input className="sr-only" onChange={onFileInputChange} multiple id="fileInput" type='file' />
        <Uploader files={filesToUpload} />
      </div>
    </div>
  )
}
