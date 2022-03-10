import { useState } from 'react';
import { GiHeartBottle, GiTechnoHeart, GiCoolSpices } from 'react-icons/gi'

import Layout from "../components/Layout/Layout";
import Feedback from '../components/Library/Feedback';

export default function Library() {
  const [isOpen, setIsOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const handleFeedbackToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Layout library>
      <div className="overflow-hidden text-center m-4 gap-6 text-slate-600 flex flex-col items-center justify-center h-[76vh]">
        {!sent && (
          <>
            <GiHeartBottle size="6em" className="drop-shadow-md hover:drop-shadow-lg transition-all" />
            <h1 className="text-xl mb-10">Library coming soon!</h1>
            <p className="font-bold px-2">But while you&apos;re here, mind telling us what you think of the app?</p>
            <button onClick={handleFeedbackToggle} className="bg-violet-600 group animate-pulse ring ring-offset-4 hover:shadow-inner rounded-full hover:ring-offset-2 hover:ring-none transition-all ring-violet-600 text-white flex items-center justify-center px-6 py-3">
              Give a little <span className="mx-2"><GiTechnoHeart className="animate-pulse text-red-500" size="2em" /></span> feedback
            </button>
          </>
        )}
        {
          sent && (
            <>
              <GiCoolSpices className="text-yellow-500" size="5em" />
              <p>Thank you for submitting feedback, we promise to make the app better based on your input.
                <br /><span className="font-bold">You&apos;re cool!</span>
              </p>
            </>
          )
        }
      </div>
      <Feedback setSent={setSent} setIsOpen={setIsOpen} isOpen={isOpen} />
    </Layout>
  )
}
