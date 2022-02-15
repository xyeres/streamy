import { useNavigate } from 'react-router-dom'
import {MdArrowBackIosNew} from 'react-icons/md'
export default function GoBack() {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  } 
  return (
    <div className="fixed top-6 left-6">
      <MdArrowBackIosNew onClick={goBack} className="p-2 flex items-center justify-center rounded-2xl drop-shadow-lg cursor-pointer bg-opacity-80 bg-white text-black sm:bg-black sm:text-white" size="1.75em" />
    </div>
    );
}
