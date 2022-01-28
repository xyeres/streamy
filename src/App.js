import { useRef, useState } from "react";
import uploadToFirestore from "./lib/uploadToFirestore";
import * as id3 from '//unpkg.com/id3js@^2/lib/id3.js';

function UploadStatus({ progress, name }) {
  return (
    <li key={name} className="flex place-content-between bg-pink-700 text-white p-2">{name.length < 31 ? name : name.slice(0, 31) + '...'} <span className="text-right">Upload progress: {progress.toFixed(0)}%</span></li>
  );
}

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [parseResults, setParseResults] = useState([]);
  const [tags, setTags] = useState();

  const imgRef = useRef()

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const onFileInputChange = async (e) => {
    const tags = await id3.fromFile(e.currentTarget.files[0]);
    let coverBuffer = tags.images[0].data
    let coverBlob = new Blob([coverBuffer])

    const reader = new FileReader()
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result } })(imgRef.current)
    reader.readAsDataURL(coverBlob)
    console.log(tags);
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
    uploadToFirestore(e.dataTransfer.files, 'images/dropzone/', setUploadStatus)
    setIsDragging(false)
  }

  return (
    <>
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

          <ul className="p-6 divide-y w-full">
            {uploadStatus.length > 0 && uploadStatus.map((item) => {
              return <UploadStatus name={item.name} progress={item.progress} />
            })}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="m-5">Experimental Shit!</h2>
        <label htmlFor="fileInput" className="m-4 p-4 text-black font-bold bg-green-500 rounded-lg border-solid border-4 border-green-200">Choose an audio file</label>
        <input className="sr-only" onChange={onFileInputChange} multiple id="fileInput" type='file' />
        <img className="m-5 mt-10" ref={imgRef} width="200px" height="100px" />
      </div>
    </>
  );
}


export default App;
