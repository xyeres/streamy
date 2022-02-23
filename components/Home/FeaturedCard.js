import Image from 'next/image';
import Link from 'next/link';
import { MdFiberNew } from 'react-icons/md'
import { useFeatured } from '../CoverGrid/useAlbums';
import {MdFeedback} from 'react-icons/md'
export default function FeaturedCard({ item }) {
  const { data, isError, isLoading } = useFeatured('albums')

  if (isLoading) return 'Loading featured item'
  if (isError) return (
    <div className="p-4 rounded-md bg-gray-200 text-xs font-semibold m-4 flex items-center">
      <MdFeedback className="text-gray-500" size="1.25em" />
      <div className="pl-2">
        {isError.message}
      </div>
    </div>
  )

  const feature = data[0]

  return (
    <Link href={`album/${feature.id}`}>
      <a>
        <div className="relative flex cursor-pointer justify-start group hover:bg-opacity-[65%] items-start m-4 sm:mx-4 bg-black bg-opacity-10 p-4 rounded-lg">
          <Image src={feature.coverUrl} width={180} height={180} alt={feature.title} className="rounded-xl max-w-[96px] sm:max-w-[210px] aspect-square" />
          <div className="ml-4 mt-1 group-hover:text-white">
            <div className="flex flex-row items-start">
              <MdFiberNew size="1.35em" className="group-hover:text-white inline mt-1 mr-1" />
              <h3 className="font-bold">{feature.title}</h3>
            </div>
            <p className="text-sm mt-2">{feature.promo}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
