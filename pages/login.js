import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectUser } from '../features/user/userSlice'
import { auth, googleAuthProvider } from '../src/firebase'
import { Layout } from '../components/Layout'
import setUserDoc from '../features/user/setUserDoc';
import { useRouter } from 'next/router';
import Image from 'next/image'

export default function Login() {
  const user = useSelector(selectUser)
  const router = useRouter()

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      
      // If first sign-in, create user doc in firestore
      setUserDoc(user)

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

  return (
    <Layout>
      <div className="m-4 mt-16 flex flex-col items-center">
        <h1 className="text-lg font-bold mb-10">Log in or create an account</h1>
        <SignInButtonGoogle />
        <p className="text-xs justify-self-end mt-10">
          By continuing you agree to our terms of service and privacy policy.
        </p>
      </div>
    </Layout>
  )
}

function SignInButtonGoogle() {
  const router = useRouter()

  const signInWithGoogle = async () => {
    signInWithRedirect(auth, googleAuthProvider)
  }

  return (
    <button
      className="w-72 h-10 p-2 rounded-lg border border-gray-500 flex flex-row justify-center items-center"
      onClick={signInWithGoogle}>
      <Image alt='Sign in with Google' height={24} width={24} src={'/images/google.png'} />
      <p className="font-semibold pl-2 text-sm">Continue with Google</p>
    </button>
  )
}
