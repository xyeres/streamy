// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZetyU4HHC2ckEDbmnKInhPZUkGSWnNis",
  authDomain: "streamy-dev-51f11.firebaseapp.com",
  projectId: "streamy-dev-51f11",
  storageBucket: "streamy-dev-51f11.appspot.com",
  messagingSenderId: "713200124551",
  appId: "1:713200124551:web:b7390df780a515faa26e22",
  measurementId: "G-0QQ34QGFJW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const db = getFirestore(app)