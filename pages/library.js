import { useState } from 'react';
import {GiHeartBottle, GiTechnoHeart} from 'react-icons/gi'

import Layout from "../components/Layout/Layout";
import Feedback from '../components/Library/Feedback';

export default function Library() {
  const [isOpen, setIsOpen] = useState(false)
  const handleFeedbackToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Layout library>
      <div className="relative overflow-hidden text-center gap-6 text-slate-600 flex flex-col items-center justify-center h-[80vh]">
        <GiHeartBottle size="6em" className="drop-shadow-md hover:drop-shadow-lg transition-all"  />
        <h1 className="text-xl mb-10">Library coming soon!</h1>
        <p className="font-bold px-12">But while you&apos;re here, mind telling us what you think of the app?</p>
        <button onClick={handleFeedbackToggle} className="bg-violet-600 group outline outline-offset-4 hover:animate-none hover:shadow-inner rounded-full hover:outline-offset-0 hover:outline-none transition-all outline-violet-600 text-white flex items-center justify-center px-6 py-3">
          Give a little <span className="mx-2"><GiTechnoHeart className="animate-pulse text-red-500" size="2em" /></span> feedback
        </button>
        <Feedback setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    </Layout>
  )
}
