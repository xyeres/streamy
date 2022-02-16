import Image from 'next/image';
import { MdFiberNew } from 'react-icons/md'

export default function FeaturedCard({ item }) {
  return (
    <div className="relative flex cursor-pointer justify-start group hover:bg-opacity-[65%] items-start m-4 sm:mx-4 bg-black bg-opacity-10 p-4 rounded-lg">
      <Image src="/images/lfas-cover.png" width={210} height={210} alt="Featured item artwork" className="rounded-xl max-w-[96px] sm:max-w-[210px] aspect-square" />
      <div className="ml-4 mt-1 group-hover:text-white">
        <div className="flex flex-row items-start">
          <MdFiberNew size="1.35em" className="group-hover:text-white inline mt-1 mr-1" />
          <h3 className="font-bold">Looking for a Savior</h3>
        </div>
        <p className="text-sm">New studio album from WhoMadeWho</p>
      </div>
    </div>
  );
}
