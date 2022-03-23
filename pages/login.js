import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectUser } from '../features/user/userSlice'
import { auth, googleAuthProvider } from '../src/firebase'
import { Layout } from '../components/Layout'
import setUserDoc from '../features/user/setUserDoc';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import FooterLine from '../components/Layout/FooterLine'
import { useState } from 'react'

export default function Login() {
  const [clicked, setclicked] = useState('not clicked')
  const user = useSelector(selectUser)
  const router = useRouter()

  const signInWithGoogle = () => {
    setclicked('yes clicked')
    signInWithRedirect(auth, googleAuthProvider)
  }
  
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        setUserDoc(result.user)
      }
    }).catch((error) => {
      console.error('Error using redirect result: ', error)
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });


  if (user) router.push('/profile')
  //   <Image alt='Sign in with Google' height={24} width={24} src={'/images/google.png'} />
  return (
    <Layout>
      <div className="m-4 mt-16 flex flex-col items-center">
        <h1 className="text-lg font-bold mb-10">Log in or create an account</h1>
        <button
          className="w-72 h-10 p-2 rounded-lg border border-gray-500 flex flex-row justify-center items-center font-semibold pl-2 text-sm hover:bg-purple-500 hover:text-white"
          onClick={signInWithGoogle}>
          Continue with Google
        </button>
        {clicked}
        <FooterLine />
      </div>
    </Layout>
  )
}
