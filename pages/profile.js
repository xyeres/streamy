import Image from "next/image"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { Layout } from "../components/Layout"
import AuthCheck from "../components/Layout/AuthCheck"
import { logoutUser, selectUser } from "../features/user/userSlice"
import { auth } from "../src/firebase"

export default function Profile() {
  return (
    <Layout>
      <main className="m-4 mt-20 flex flex-col items-center gap-5">
        <AuthCheck>
          <UserProfile />
        </AuthCheck>
      </main>
    </Layout>
  )
}

function UserProfile() {
  const user = useSelector(selectUser)

  return (
    <>
      <div className="w-48 h-48 rounded-full relative">
        <Image alt="user profile" src={user.photoURL} layout="fill" className="rounded-full" />
      </div>
      <div className="text-2xl">Hi {user.displayName} 👋</div><div className="mt-20">
        <SignOutButton />
      </div>
    </>
  )
}

function SignOutButton() {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector(selectUser)

  async function signOut() {
    await auth.signOut()
    dispatch(logoutUser())
    router.push('/')
  }

  return (
    <button
      className="w-72 h-10 p-2 rounded-lg border border-gray-500 flex flex-row justify-center items-center"
      onClick={signOut}>Sign Out {user.displayName}
    </button>
  )
}