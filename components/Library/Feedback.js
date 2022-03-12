import { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { IoMdHeartHalf } from 'react-icons/io'
import { FaRegSadCry, FaRegSmileBeam } from 'react-icons/fa'

import createFeedbackInDb from './createFeedbackInDb'
import { GiCoolSpices } from 'react-icons/gi'
import { useRouter } from 'next/router'


export default function Feedback({ isOpen, setIsOpen }) {
  const [textArea, setTextArea] = useState('')
  const [sad, setSad] = useState(false)
  const [happy, setHappy] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(null)
  const [isSent, setIsSent] = useState(false)

  const isEmotionSelected = sad || happy
  const textButNoFace = (textArea && !isEmotionSelected)
  const isFormFilled = textArea && isEmotionSelected
  const router = useRouter()
  const { feedback } = router.query


  useEffect(() => {
    if (feedback === "open") {
      setIsOpen(true)
    }
  }, [feedback, setIsOpen])


  const handleHappy = (e) => {
    setHappy(e.target.checked)
    setSad(!e.target.checked)
  }
  const handleSad = (e) => {
    setSad(e.target.checked)
    setHappy(!e.target.checked)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsError(null)
      setIsSubmitted(true)

      let emotion = null;
      if (sad) emotion = 'sad'
      if (happy) emotion = 'happy'

      await createFeedbackInDb(textArea, emotion)

      setTimeout(() => {
        setIsSubmitted(false)
        setIsSent(true)
        setHappy(false)
        setSad(false)
        setTextArea('')
      }, 1100)
    } catch (err) {
      setIsSubmitted(false)
      setIsError(err)
    }

  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value)
  }

  return (
    <div>
      <div className={
        `${isOpen ? "translate-x-0" : "translate-y-[220%]"} 
        bg-violet-50
        text-gray-600
        duration-[350ms]
        shadow-lg
        rounded-lg
        transition-transform
        absolute
        top-[6%] 
        left-4 
        right-4  
        px-18 
        py-8
        pt-12`
      }
      >
        <MdOutlineClose onClick={handleToggle} className="absolute right-4 top-4 text-gray-300 cursor-pointer" size="1.5em" />
        <div className="px-4 pb-[68px]">
          {
            !isSent && (
              <div className="flex flex-col justify-center items-center">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 justify-center items-center"
                >
                  <p>How does the app make you feel?</p>
                  <div className="flex flex-row justify-between items-center gap-4">

                    <label className={`${sad ? "ring rounded-full ring-purple-300 ring-offset-2" : ""}`} htmlFor="sad">
                      <input required className="sr-only" checked={sad} name="emotion" onChange={handleSad} type="radio" value="sad" id="sad" />
                      <FaRegSadCry className="hover:animate-pulse hover:text-purple-700 text-purple-600 cursor-pointer" size="3em" />
                    </label>
                    <span className="font-bold text-lg"> or </span>
                    <label className={`${happy ? "ring rounded-full ring-purple-300 ring-offset-2" : ""}`} htmlFor="happy">
                      <input required className="sr-only" checked={happy} name="emotion" onChange={handleHappy} type="radio" value="happy" id="happy" />
                      <FaRegSmileBeam className="hover:animate-pulse hover:text-purple-700 text-purple-600 cursor-pointer" size="3em" />
                    </label>
                  </div>
                  <textarea
                    value={textArea}
                    onChange={handleTextAreaChange}
                    className="p-4 bg-white focus:outline-dashed outline-purple-400 outline-2 ring-sky-100"
                    rows={4} cols={30}
                    placeholder="Tell us what you really think"
                  />
                  <button
                    type="submit"
                    disabled={!(isFormFilled)}
                    className="mt-5 disabled:bg-gray-400 disabled:ring-gray-400 disabled:cursor-not-allowed group relative h-full bg-violet-600 ring-2 ring-offset-4 ring-offset-violet-50 hover:animate-pulse hover:animate-none hover:shadow-inner rounded-full hover:ring-offset-2 transition-all ring-violet-600 text-white flex items-center justify-center px-5 py-[10px]">
                    <span className="relative">
                      {isSubmitted && (
                        <div className="flex flex-col items-center justify-center relative">
                          <span>Sent!</span>
                          <IoMdHeartHalf className="fixed animate-ping text-white" size="2em" />
                        </div>
                      )}
                      {(!textArea && !isSubmitted) && 'Add some words!'}
                      {textButNoFace && 'Pick a face!'}
                      {(textArea && isEmotionSelected && !isSubmitted) && 'Send feedback'}
                    </span>
                  </button>
                  {isError && <p>Frowny face, something went wrong. <br />{isError.message}</p>}
                </form>
              </div>
            )
          }
          {
            isSent && (
              <div className="text-center m-4 gap-6 flex flex-col items-center justify-center h-[45vh]">
                <GiCoolSpices className="text-yellow-500" size="5em" />
                <p>Thank you for submitting feedback, we promise to make the app better based on your input.
                  <br /><span className="font-bold">You&apos;re cool!</span>
                </p>
              </div>
            )
          }
          <div className="mt-10 transition-all bg-white text-whtie rounded-lg p-4">
            <details>
              <summary className="font-semibold text-lg">Feature Road Map</summary>
              <div className="pt-6">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-px h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-600">Step 1</p>
                    <p className="text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. veniam libero facilis minus reprehenderit.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-px h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-8">
                    <p className="mb-2 text-xl font-bold text-gray-600">Step 2</p>
                    <p className="text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. veniam libero facilis minus reprehenderit.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-px h-full bg-gray-300"></div>
                  </div>
                  <div className="pb-8 ">
                    <p className="mb-2 text-xl font-bold text-gray-600">Step 3</p>
                    <p className="text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. veniam libero facilis minus reprehenderit.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="mb-2 text-lg font-bold text-gray-600">Done</p>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}