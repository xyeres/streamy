import Image from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'

export const AccountBtn = forwardRef(function AccountBtn({ onClick, href, msg, user }, ref) {
  return (
    <a aria-label="View account" href={href} onClick={onClick} ref={ref} className="text-purple-500 hover:text-purple-700">
      <span className="sr-only">{msg}</span>
      {user ?
        (user.photoURL ?
          <Image alt="user profile" width={30} height={30} className="rounded-full" src={user.photoURL} />
          : <FaUserCircle className="text-gray-700" size="1.55em" />)
        : <FaUserCircle size="1.75em" />
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
          <AccountBtn user={user} msg="View your account" />
        </Link>
        :
        <Link href="/login" passHref>
          <AccountBtn msg="Sign in to your account" />
        </Link>
      }
    </nav>
  )
}
