import { useState } from 'react'
import { GiPiercedHeart } from 'react-icons/gi'
import { MdOutlineClose } from 'react-icons/md'

import { FaRegSadCry, FaRegSmileBeam } from 'react-icons/fa'


export default function Feedback({ isOpen, setIsOpen }) {
  const [textArea, setTextArea] = useState('')

  const [sad, setSad] = useState(false)
  const [happy, setHappy] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    console.log('you submitted your data! You said:', textArea)

    setTextArea('')

    setTimeout(() => {
      setIsSubmitted(false)
      setHappy(false)
      setSad(false)
      setIsOpen(false)
    }, 1500)

  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value)
  }

  return (<div className={`${isOpen ? "absolute top-1/8 left-4 right-4 transition-transform" : "absolute translate-x-full transition-transform top-1/8 left-4 right-4"}`}>
    <div className="text-gray-600 shadow-lg bg-slate-100 px-10 py-16 rounded-lg relative">
      <MdOutlineClose onClick={handleToggle} className="absolute right-4 top-4 text-gray-300 cursor-pointer" size="1.5em" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center ">
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
          className="p-4 bg-white focus:outline-dashed outline-2 ring-sky-100"
          rows={4} cols={32}
          placeholder="Tell us what you really think, no hard feelings we promise"
        />
        <button type="submit" disabled={!isFormFilled} className="disabled:bg-gray-400 disabled:outline-gray-400 disabled:cursor-not-allowed group relative w-2/3  h-full bg-violet-600 outline outline-offset-4 hover:animate-pulse hover:animate-none hover:shadow-inner rounded-full hover:outline-offset-0 hover:outline-none transition-all outline-violet-600 text-white flex items-center justify-center px-4 py-[10px]">
          <span className="group-hover:opacity-0 absolute transition-all">
            {isSubmitted && 'Sent!'}
            {!textArea && 'Add some words!'}
            {textButNoFace && 'Pick a face!'}
            {textArea && isEmotionSelected && 'Send feedback'}
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-all"><GiPiercedHeart className="inline-block pr-1" size="2em" />{isSubmitted ? 'Sent!' : ''}</span>
        </button>

      </form>
    </div>
  </div>)
}
