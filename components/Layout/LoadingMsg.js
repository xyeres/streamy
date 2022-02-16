import { MdOutlineMusicNote } from 'react-icons/md'
import Layout from './Layout'
export default function LoadingMsg({ message }) {
  return (
    <Layout>
      <div className="flex flex-row gap-2 w-full h-full items-center justify-center">
        <h2 className="text-bold text-xl animate-bounce">{message}</h2>
        <MdOutlineMusicNote className="animate-bounce text-emerald-700" size="1.87em" />
      </div>
    </Layout>
  )
}
