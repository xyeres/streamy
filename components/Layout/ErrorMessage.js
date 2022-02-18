import { MdMusicOff } from 'react-icons/md'
import Layout from './Layout'
export default function ErrorMessage({ message }) {
  
  return (
    <Layout>
      <div className="flex flex-col text-center p-4 items-center justify-center w-screen h-[85vh]">
        <MdMusicOff size={"4em"} className="text-red-400 mb-4" />
        <p className="text-lg">{message}</p>
      </div>
    </Layout>
  )
}
