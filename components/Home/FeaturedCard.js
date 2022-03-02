import Image from 'next/image';
import Link from 'next/link';
import { MdFiberNew } from 'react-icons/md'
import { useFeatured } from '../CoverGrid/useAlbums';
import { MdFeedback } from 'react-icons/md'
import ErrMsgHome from '../Layout/ErrMsgHome'
import LoadingFeaturedItem from '../Layout/LoadingFeaturedItem'

export default function FeaturedCard({ item, featuredColl }) {
  const { data, isError, isLoading } = useFeatured(featuredColl)

  if (isError) return <ErrMsgHome message={isError.message} />
  if (isLoading) return <LoadingFeaturedItem />

  const feature = data[0]

  return (
    <Link href={`album/${feature.id}`}>
      <a>
        <div className="relative flex cursor-pointer justify-start group hover:bg-opacity-[65%] items-start m-4 sm:mx-4 bg-black bg-opacity-10 p-4 rounded-lg">
          <Image src={feature.coverUrl} width={180} height={180} alt={feature.title} className="rounded-xl max-w-[96px] sm:max-w-[210px] aspect-square" />
          <div className="ml-4 mt-1 group-hover:text-white">
            <div className="flex flex-row items-start">
              <h3 className="font-bold">{feature.title}</h3>
              <MdFiberNew size="1.35em" className="group-hover:text-white inline mt-1 ml-1" />
            </div>
            <p className="text-sm mt-2">{feature.promo}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
