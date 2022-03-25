import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { IoWarningOutline } from 'react-icons/io5';

import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import setUserDoc from "../../features/user/setUserDoc";
import { auth } from "../../src/firebase";

export default function email() {
  const [error, setError] = useState(false)
  const router = useRouter()
  // Confirm the link is a sign-in with email link.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        if (result) {
          setUserDoc(result.user)
          router.push('/profile')
        }
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');

        // You can check if the user is new or existing:
        // TODO Capture users displayname so it looks nice
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        console.log(error.message)
        if (error.code === 'auth/invalid-action-code') {
          setError('The login link expired, please try again.')
        }
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }

  return (
    <Layout>
      <div className="m-4 flex flex-col items-center justify-center min-h-[80vh]">
        {error ? <Error router={router} />  : <p>Signing in with magic link...</p>}
      </div>
    </Layout>
  )
}

function Error({ router }) {
  const handleBtn = () => {
    router.push('/login')
  }
  return (
    <>
      <IoWarningOutline className="text-purple-300 mb-3" size="6em" />
      <p>Sign in link expired. please try again.</p>
      <button onClick={handleBtn} className="bg-violet-600 mt-7 group animate-pulse ring ring-offset-4 hover:shadow-inner rounded-full hover:ring-offset-2 hover:ring-none transition-all ring-violet-600 text-white flex items-center justify-center px-4 py-2">
        Try logging in again
      </button>

    </>
  )
}

