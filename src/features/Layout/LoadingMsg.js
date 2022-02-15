import { MdOutlineMusicNote } from 'react-icons/md'
export default function LoadingMsg({ message }) {
  return (
    <div className="flex flex-row gap-2 h-full items-center justify-center">
      <h2 className="text-bold text-xl animate-bounce">{message}</h2>
      <MdOutlineMusicNote className="animate-bounce text-emerald-700" size="1.87em" />
    </div>
  )
}
