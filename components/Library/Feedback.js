import { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { IoMdHeartHalf } from 'react-icons/io'
import { FaRegSadCry, FaRegSmileBeam } from 'react-icons/fa'

import createFeedbackInDb from './createFeedbackInDb'


export default function Feedback({ isOpen, setIsOpen, setSent }) {
  const [textArea, setTextArea] = useState('')
  const [sad, setSad] = useState(false)
  const [happy, setHappy] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(null)
  const isEmotionSelected = sad || happy
  const textButNoFace = (textArea && !isEmotionSelected)
  const isFormFilled = textArea && isEmotionSelected

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
        setSent(true)
        setHappy(false)
        setSad(false)
        setIsOpen(false)
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
        `${isOpen ? "translate-x-0" : "translate-x-[220%]"} 
        bg-violet-50
        text-gray-600
        shadow-lg
        rounded-lg
        transition-transform
        fixed
        top-[8%] 
        bottom-[20%]
        left-4 
        right-4  
        px-18 
        py-8
        pt-12
      `}

      >
        <MdOutlineClose onClick={handleToggle} className="absolute right-4 top-4 text-gray-300 cursor-pointer" size="1.5em" />
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
    </div>
  )
}