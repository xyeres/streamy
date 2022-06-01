import Image from 'next/image';
import Link from 'next/link';
import { useFeatured } from '../CoverGrid/useAlbums';
import ErrMsgHome from '../Layout/ErrMsgHome'
import LoadingFeaturedItem from '../Layout/LoadingFeaturedItem'
import FeaturedPill from './FeaturedPill';

export default function FeaturedCard({ item, featuredColl }) {
  const { data, isError, isLoading } = useFeatured(featuredColl)

  if (isError) return <ErrMsgHome message={isError.message} />
  if (isLoading) return <LoadingFeaturedItem />

  const feature = data[0]

  return (
    <Link href={`album/${feature.id}`}>
      <a>
        <div className='group transition-colors duration-300 lg:hover:bg-slate-700 lg:bg-slate-800 lg:p-7 lg:m-7 lg:flex lg:items-center lg:justify-center'>
          <div className="relative flex cursor-pointer justify-start group transition-colors duration-300 hover:bg-blue-500 items-start m-4 bg-black bg-opacity-5 lg:bg-0 p-4 rounded-lg lg:hover:bg-slate-700 lg:group-hover:bg-slate-700 lg:p-8 lg:max-w-xl lg:text-white">
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
