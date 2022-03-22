import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";

export default function useUser() {
  const user = useSelector(selectUser)

  return { user }
}
