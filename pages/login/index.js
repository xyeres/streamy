import { getRedirectResult, sendSignInLinkToEmail, signInWithRedirect } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { IoWarningOutline } from 'react-icons/io5';
import { GiSaloonDoors } from 'react-icons/gi';
import { Layout } from '../../components/Layout';
import FooterLine from '../../components/Layout/FooterLine';
import setUserDoc from '../../features/user/setUserDoc';
import { auth, googleAuthProvider, twitterAuthProvider } from '../../src/firebase';
import Loader from '../../components/Layout/Loader';
import useUser from '../../features/user/useUser';

export default function Login() {
  const [email, setEmail] = useState('')
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const {user } = useUser()
  
  if (user) router.push('/profile')

  const signInWithEmail = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_SITE_URL +'/login/email',
        handleCodeInApp: true
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)

      // Save email locally in case user logs back in with same device
      window.localStorage.setItem('emailForSignIn', email);

      // The link was successfully sent. Inform the user.
      setIsLoading(false)
      setIsEmailLinkSent(true)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
    setError(null)
  }


  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleAuthProvider)
    } catch (err) {
      setError(err.message)
    }
  }

  const signInWithTwitter = async () => {
    try {
      await signInWithRedirect(auth, twitterAuthProvider)
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

  return (
    <Layout>
      <div className="mt-5 flex flex-col items-center w-full">
        {isEmailLinkSent ? (
          <div className="max-w-lg p-8 flex flex-col items-center text-center w-full mb-4 gap-5">
            <BiMailSend className="text-purple-500" size="10em" />
            <h1 className="text-xl text-gray-700 font-bold mb-4">Email sent!</h1>
            <p>We&apos;ve sent you a magic email link to automatically log you in. No passwords required here. Go check your mail!</p>
          </div>
        )
          :
          (<div className="max-w-lg p-4 flex flex-col items-center w-full mb-6 gap-5">
            {isLoading && <Loader />}
            <GiSaloonDoors className="text-purple-500" size="8em" />
            <h1 className="text-xl text-gray-700 font-bold mb-4">Log in or create an account</h1>
            {error && (
              <div className="flex flex-row gap-2 items-center m-4 w-full p-2 py-4 rounded-sm border-red-400 border-dashed border text-sm">
                <IoWarningOutline size="1.2em" />
                {error}
              </div>
            )}
            <div className="w-full flex flex-col gap-2">
              {/* Signin with Email */}
              <form className='gap-2 flex flex-col' onSubmit={signInWithEmail}>
                <label className='text-xs font-semibold' htmlFor='email'>
                  Email address
                </label>
                <input onChange={handleEmailInput} value={email} onInvalid={() => setError('Invalid email address')} className="w-full h-10 p-2 rounded-lg flex flex-row justify-center items-center font-semibold bg-zinc-50 border border-gray-500 focus:border-0 focus:outline-dashed focus:outline-2 outline-purple-400 text-sm" name='email' type="email" />
                <button
                  className="relative w-full h-10 p-2 rounded-lg border hover:border-0 border-gray-500 flex flex-row justify-center items-center font-semibold text-sm hover:bg-purple-600 hover:text-white"
                  type='submit'>
                  <BiMailSend size="2em" />
                  <span className='pl-2'>Continue with Email</span>
                </button>
              </form>
              {/* Other Auth Providers */}
              <p className='self-center font-semibold py-3'>Or</p>
              <button
                className="w-full h-10 p-2 rounded-lg border hover:border-0 border-gray-500 flex flex-row justify-center items-center font-semibold text-sm hover:bg-purple-600 hover:text-white"
                onClick={signInWithGoogle}>
                <FaGoogle size="1.4em" />
                <span className='pl-2'>Continue with Google</span>
              </button>
              <button
                className="w-full h-10 p-2 rounded-lg border hover:border-0 border-gray-500 flex flex-row justify-center items-center font-semibold text-sm hover:bg-purple-600 hover:text-white"
                onClick={signInWithTwitter}>
                <FaTwitter size="1.4em" />
                <span className='pl-2'>Continue with Twitter</span>
              </button>
            </div>
          </div>)
        }
        <div className="mb-28">
          <FooterLine />
        </div>
      </div>
    </Layout>
  )
}
