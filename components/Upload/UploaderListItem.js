import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import uploadAudioTrack from "../../lib/uploader/uploadAudioTrack";


export default function UploaderListItem({ file }) {
  const [status, setStatus] = useState({ item: file.name, message: 'Initiating upload...' });
  const [url, setUrl] = useState(null);

  useEffect(() => {

    const uploadItems = async () => {
      try {
        let result = await uploadAudioTrack(file, setStatus)
        setUrl(result.songUrl)
      } catch (err) {
        console.error(err);
      }
    }
    uploadItems()

  }, [file]);

  return (
    <li className="flex place-content-between items-center bg-blue-700 text-white p-2">
      <span>
        {url ? <a href={url} className="bg-blue-900 text-white p-1.5 rounded-xl text-xs mr-2 ">View</a> : null}
        {status.item.length < 31 ? status.item : status.item.slice(0, 31) + '...'}
      </span>
      <span className="text-right">
        {status.message}
      </span>
    </li>
  );
}