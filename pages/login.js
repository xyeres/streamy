import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { GiSaloonDoors } from 'react-icons/gi';
import { Layout } from '../components/Layout';
import FooterLine from '../components/Layout/FooterLine';
import setUserDoc from '../features/user/setUserDoc';
import { auth, googleAuthProvider } from '../src/firebase';

export default function Login() {
  const [error, setError] = useState(null)
  const router = useRouter()

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleAuthProvider)
    } catch (err) {
      setError(err.message)
    }
  }

  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        setUserDoc(result.user)
        router.push('/profile')
      }
    }).catch((err) => {
      console.error('Error using redirect result:', err)
      setError(err.message)
    });

  //   <Image alt='Sign in with Google' height={24} width={24} src={'/images/google.png'} />
  return (
    <Layout>
      <div className="mt-10 flex flex-col items-center w-full">
        <div className="max-w-lg p-4 flex flex-col items-center w-full mb-24 gap-5">
          <GiSaloonDoors className="text-purple-500" size="8em" />
          <h1 className="text-lg text-gray-700 font-bold">Log in or create an account</h1>
          {
            error && <div className="m-4 w-full p-2 py-4 rounded-sm border-red-400 border-dashed border ">
              {error}
            </div>
          }
          <button
            className="w-full h-10 p-2 rounded-lg border hover:border-0 border-gray-500 flex flex-row justify-center items-center font-semibold text-sm hover:bg-purple-600 hover:text-white"
            onClick={signInWithGoogle}>
            <FaGoogle size="1.4em" />
            <span className='pl-2'>Continue with Google</span>
          </button>
          <FooterLine />
        </div>
      </div>
    </Layout>
  )
}
