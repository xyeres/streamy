import { MdOutlineMusicNote } from "react-icons/md";

export default function LoadingMsgResponsive({ message }) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <h2 className="text-bold text-xl">{message}</h2>
      <MdOutlineMusicNote className="text-emerald-700" size="1.87em" />
    </div>
  )
}
