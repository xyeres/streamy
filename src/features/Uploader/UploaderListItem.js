import { useRef } from "react";
import useUploadFile from "../../lib/useUploadFile";

export default function UploaderListItem({ file, path }) {
  const isComponentMounted = useRef(true)
  const { url, progress }
    = useUploadFile(file, path, isComponentMounted)

  return (
    <li className="flex place-content-between items-center bg-pink-700 text-white p-2">
      {file.name.length < 31 ? file.name : file.name.slice(0, 31) + '...'}
      <span className="text-right">
        Upload progress: {progress.toFixed(0)}%
        {url ? <a href={url} className="bg-pink-900 text-white p-1.5 rounded-xl text-xs ml-3">View</a> : null}
      </span>
    </li>
  );
}