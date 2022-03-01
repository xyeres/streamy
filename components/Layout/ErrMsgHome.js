import { MdFeedback } from "react-icons/md";
export default function ErrMsgHome({ message }) {
  return (
    <div className="px-10 h-32 rounded-md bg-gray-200 text-xs font-semibold m-4 flex items-center">
      <MdFeedback className="text-gray-500" size="1.25em" />
      <div className="pl-2">
        {message}
      </div>
    </div>
  )
}
