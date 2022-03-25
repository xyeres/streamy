// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FB_APPID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const twitterAuthProvider = new TwitterAuthProvider()

let analytics;
if (typeof window === 'object') {
  isSupported()
    .then(isSupported => {
      if (isSupported) {
        analytics = getAnalytics(app);
      }
    })
}

export const functions = getFunctions(app)
export const storage = getStorage(app)
export const db = getFirestore(app)

/* Enable offline persistence */
if (typeof window === 'object') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        console.error(err.message)
      } else if (err.code == 'unimplemented') {
        console.warn('Current browser does not support all of the features required to enable persistence')
      }
    })
}
