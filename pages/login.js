import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, selectUser, selectUsername } from '../features/user/userSlice'
import { auth, googleAuthProvider, db } from '../src/firebase'
import { setDoc, collection, writeBatch, doc, serverTimestamp, getDoc } from "firebase/firestore";

import { Layout } from '../components/Layout'
import setUserDoc from '../features/user/setUserDoc';
import { useRouter } from 'next/router';

export default function Login() {
  const user = useSelector(selectUser)
  const router = useRouter()

  if (user) router.push('/profile')

  return (
    <Layout>
      <main className="m-4 flex flex-col items-center min-h-screen">
        <h1 className="text-lg font-bold mb-10">Log in or create an account</h1>
        <SignInButtonGoogle />
        <p className="text-xs justify-self-end mt-10">
          By continuing you agree to our terms of service and privacy policy.
        </p>
      </main>
    </Layout>
  )
}

function SignInButtonGoogle() {
  const dispatch = useDispatch()
  const router = useRouter()

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUserDoc(user)
        dispatch(loginUser(user))
        router.push('/profile')

        console.log(user)
        
      }).catch((error) => {
        console.log(error)

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.email;

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        
      });
  }

  return (
    <button
      className="w-72 h-10 p-2 rounded-lg border border-gray-500 flex flex-row justify-center items-center"
      onClick={signInWithGoogle}>
      <img className="h-6 pr-2" src={'/images/google.png'} />
      <p className="font-semibold text-sm">Continue with Google</p>
    </button>
  )
}
