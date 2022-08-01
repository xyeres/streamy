import Image from 'next/image';
import Link from 'next/link';
import FeaturedPill from './FeaturedPill';

export default function FeaturedCard({ feature }) {
  return (
    <Link href={`/album/${feature.id}`}>
      <a className='w-full lg:flex lg:items-center lg:justify-center'>
        <div className='group transition-colors duration-300 lg:hover:bg-slate-700 lg:bg-slate-800 lg:p-7 my-7 lg:m-7 lg:flex lg:items-center w-full lg:justify-center lg:max-w-screen-xl'>
          <div className="relative flex cursor-pointer justify-start group duration-300 hover:bg-blue-500 items-start m-4 bg-gray-100 dark:bg-neutral-800 dark:text-neutral-50 lg:bg-opacity-0 p-4 rounded-lg lg:hover:bg-opacity-0 lg:group-hover:bg-opacity-0 lg:p-8 lg:max-w-xl lg:text-white">
            <Image src={feature.coverUrl} width={180} height={180} alt={feature.title} className="rounded-xl max-w-[96px] sm:max-w-[210px] aspect-square" />
            <div className="ml-4 mt-1 group-hover:text-white">
              <div className="flex flex-row items-start">
                <h3 className="font-bold">{feature.title}</h3>
                <div className="absolute right-2 -top-3 lg:hidden">
                  <FeaturedPill message="FEATURED" />
                </div>
              </div>
              <p className="text-sm mt-2">{feature.promo}</p>
              <div className='hidden lg:inline absolute bottom-0 group-hover:bg-slate-700 right-0 rounded-md m-7 p-2 px-4 bg-slate-600'>
                Listen now
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
