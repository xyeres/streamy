import Image from "next/image"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import FeedbackCard from "../components/FeedbackCard/FeedbackCard"
import { Layout } from "../components/Layout"
import AuthCheck from "../components/Layout/AuthCheck"
import { logoutUser, selectUser } from "../features/user/userSlice"
import { auth } from "../src/firebase"

export default function Profile() {
  return (
    <Layout>
      <div className="mt-16 flex flex-col items-center w-full">
        <AuthCheck>
          <UserProfile />
        </AuthCheck>
      </div>
    </Layout>
  )
}

function UserProfile() {
  const user = useSelector(selectUser)
  return (
    <div className="max-w-lg p-6 flex flex-col items-center gap-5 w-full mb-24">
      <div className="w-20 h-20 rounded-full relative">
        <Image priority alt="user profile" src={user.photoURL} layout="fill" className="rounded-full" />
      </div>
      <h1 className="text-xl">Hi, {user.displayName} 👋</h1>
      <FeedbackCard customHeader={<>Profiles!</>} customMessage={<>We&apos;re just getting profiles setup. Soon you&apos;ll be able to favorite songs and do other nifty things. Stay tuned. Tap here to drop us some feedback.</>} />
      <SignOutButton />
    </div>
  )
}

function SignOutButton() {
  const dispatch = useDispatch()
  const router = useRouter()

  async function signOut() {
    await auth.signOut()
    dispatch(logoutUser())
    router.push('/')
  }

  return (
    <button
      className="w-full h-10 p-2 hover:bg-gray-400 hover:text-white hover:border-1 rounded-lg border border-gray-500 flex flex-row justify-center items-center"
      onClick={signOut}>
      Sign Out 🚪🚶
    </button>
  )
}