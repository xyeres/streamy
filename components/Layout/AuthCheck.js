import Link from "next/link"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/user/userSlice"
import Layout from "./Layout"

export default function AuthCheck(props) {
  const user = useSelector(selectUser)
  return (
    user ?
      props.children :
      props.fallback || <DefaultMessage />
  )
}

function DefaultMessage() {
  return (
    <Layout>
      <p className="flex items center justify-center">
        <Link href="/login">
          <a className="underline hover:no-underline">
            Please sign in to visit this page
          </a>
        </Link>
      </p>
    </Layout>
  )
}
