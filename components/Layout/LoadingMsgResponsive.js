import { MdOutlineMusicNote } from "react-icons/md";

export default function LoadingMsgResponsive({ message }) {
  return (
    <div className="flex flex-row mx-4 gap-2 items-center">
      <h2 className="text-bold text-xs font-bold">{message}</h2>
      <MdOutlineMusicNote className="text-emerald-700" size="1em" />
    </div>
  )
}
