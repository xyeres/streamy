import { MdMusicOff } from "react-icons/md";

export default function ErrorMsgResponsive({ message }) {
  return (
    <div className="flex font-bold bg-gray-100 rounded-lg m-4 items-center justify-center flex-row py-6 px-4">
      <MdMusicOff size={"1em"} className="text-red-400" />
      <p className="text-xs">{message}</p>
    </div>
  )
}
