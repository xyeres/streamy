import { useAlbumsTesting } from "../../components/CoverGrid/useAlbums";
import { useState } from "react";

export default function Fb() {
  const [input, setInput] = useState('')
  const { data, isLoading, isError } = useAlbumsTesting(input)

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput(e.target[0].value)
    console.log(e.target[0].value)
  }

  if (data) {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="bg-green-100 p-2 m-8" type='text' val={input} />
        <input className="bg-green-300 p-2 m-8" type="submit" value="Send" />
      </form>
      {
        isError ? <>{isError.message}</> : null
      }
      {
        (isLoading && !isError) ? 'Loading...' : (
          <div>
            <ul>
              <li></li>
            </ul>
          </div>
        )
      }
    </div>
  )
}
