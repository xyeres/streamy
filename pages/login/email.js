import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../src/firebase";

export default function email () {
  // Confirm the link is a sign-in with email link.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');

        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }

  return (
    <div>Sign-in with email</div>
  )
}
