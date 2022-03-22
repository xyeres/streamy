import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Layout/ErrorMessage";
import LoadingMsg from "../../components/Layout/LoadingMsg";
import { loginUser, selectUser } from "../../features/user/userSlice";
import { auth } from "../../src/firebase";

export default function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(auth)
  const rxUser = useSelector(selectUser)
  const dispatch = useDispatch()

  if (!rxUser && user) dispatch(loginUser(user.toJSON()))

  if (loading) {
    return <LoadingMsg message="Welcome" />
  }

  if (error) {
    return <ErrorMessage message="Error loading user, please try again" />
  }

  return children
}
