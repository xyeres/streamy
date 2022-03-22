import Image from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'

export const AccountBtn = forwardRef(function AccountBtn({ onClick, href, msg, photoURL }, ref) {
  return (
    <a aria-label="View account" href={href} onClick={onClick} ref={ref} className="text-purple-500 hover:text-purple-700">
      <span className="sr-only">{msg}</span>
      {photoURL ?
        <Image alt="user profile" width={23.33} height={23.33} className="rounded-full" src={photoURL} />
        :
        <MdAccountCircle size="1.75em" />
      }
    </a>
  )
})

export default function AccountBar() {
  const user = useSelector(selectUser)
  return (
    <nav>
      {user ?
        <Link href="/profile" passHref>
          <AccountBtn photoURL={user.photoURL} msg="View your account" />
        </Link>
        :
        <Link href="/login" passHref>
          <AccountBtn msg="Sign in to your account" />
        </Link>
      }
    </nav>
  )
}
