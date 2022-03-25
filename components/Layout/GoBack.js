import { useRouter } from 'next/router'
import { MdArrowBackIosNew } from 'react-icons/md'
export default function GoBack() {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  const routesToIgnore = [
    router.route == "/",
    router.route == "/login",
    router.route == "/login/email",
    router.route == "/profile",
    router.route == "/search",
    router.route == "/library",
  ]

  const checker = (route) => route === true

    if (routesToIgnore.some(checker)) {
      return null
    }
  
  return (
    <div className="fixed top-6 left-6 z-10">
      <MdArrowBackIosNew
        onClick={goBack}
        className="p-2 flex hover:translate-y-1 transition-transform items-center justify-center rounded-2xl drop-shadow-lg cursor-pointer bg-opacity-80 bg-white text-black sm:bg-black sm:text-white"
        size="1.75em" />
    </div>
  );

}
