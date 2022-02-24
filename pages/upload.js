import { useState } from "react";
import UploaderList from "../components/Upload/UploaderList";


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
          'h-96 my-8 flex flex-col items-center justify-center bg-blue-200 p-8 border-dashed border-2 border-blue-900' :
          'h-96 my-8 flex flex-col items-center justify-center border-dashed p-8 border-2 border-blue-400 bg-blue-100'}
      >
        <p className="font-bold">Drag files here to upload</p>
        <label htmlFor="fileInput" 
          className="mt-5 p-4 text-white font-bold bg-blue-500 hover:bg-blue-600 hover:drop-shadow-sm rounded-lg">
          Or browse for a file
        </label>
        <input className="sr-only" onChange={onFileInputChange} multiple id="fileInput" type='file' />
        <UploaderList files={filesToUpload} />
      </div>
    </div>
  )
}
