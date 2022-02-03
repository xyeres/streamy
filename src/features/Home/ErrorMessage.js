import { MdMusicOff } from 'react-icons/md'
export default function ErrorMessage({ message }) {
  
  return (
    <div className="flex flex-col text-center p-4 items-center justify-center h-[85vh] w-screen">
      <MdMusicOff size={"4em"} className="text-red-400 mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  )
}
