import Link from 'next/link'
import { MdAccountCircle } from 'react-icons/md'
export default function UserIcon() {
  return (
    <Link href="/login">
      <a>
        <MdAccountCircle size="1.65em" className="opacity-40 hover:opacity-100 absolute right-3 top-3 cursor-pointer" />
      </a>
    </Link>
  )
}
