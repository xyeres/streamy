import { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { IoMdHeartHalf } from 'react-icons/io'
import { FaRegSadCry, FaRegSmileBeam } from 'react-icons/fa'

import createFeedbackInDb from './createFeedbackInDb'
import { GiCoolSpices } from 'react-icons/gi'
import { useRouter } from 'next/router'
import RoadMap from './RoadMap'


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
    <div className='w-full flex items-center justify-center'>
      <div className={
        `${isOpen ? "translate-x-0" : "-translate-y-[220%]"} 
        bg-violet-50
        text-gray-600
        duration-[350ms]
        shadow-lg
        rounded-lg
        transition-transform
        absolute
        top-[6%] 
        px-18 
        py-8
        pt-12
        w-full
        lg:max-w-xl
        lg:min-w-[590px]
        `
      }
      >
        <MdOutlineClose onClick={handleToggle} className="absolute right-4 top-4 text-gray-300 cursor-pointer" size="1.5em" />
        <div className="pb-[68px] mx-4">
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
                          <span>{isSent ? 'Sent!' : 'Sending!'}</span>
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
          <div className="relative mt-10 bg-white text-whtie p-5 mx- rounded-lg">
            <RoadMap />
          </div>
        </div>
      </div>
    </div>
  )
}