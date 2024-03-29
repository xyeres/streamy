import Image from "next/image";
import Link from "next/link";


export default function FeedbackCard() {
  return (
    <Link href="/library?feedback=open">
      <a>
        <div className="transition-colors max-w-screen-sm relative hover:opacity-100 my-6 flex cursor-pointer justify-start group hover:bg-purple-500 items-start m-4 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 p-4 rounded-lg">
          <div className="flex-shrink-1 w-full sm:max-w-[140px]">
            <Image src="/images/StreamyOGImage-1@0.75x.jpg" width={180} height={180} alt="App screenshot" className="rounded-lg object-cover aspect-square" />
          </div>
          <div className="ml-4 mt-1 group-hover:text-white">
            <div className="flex flex-row items-start">
              <h3 className="font-bold">Enjoying the App?</h3>
            </div>
            <p className="text-sm mt-2">We&apos;d love to hear your feedback. Tap here to drop us note or to check out the <span className="font-semibold">Feature Road Map</span> if you&apos; re curious about what we&apos;re cooking up.</p>
          </div>
        </div>
      </a>
    </Link>
  )
}
