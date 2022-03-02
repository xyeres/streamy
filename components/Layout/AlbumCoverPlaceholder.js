import { MdAlbum } from "react-icons/md";
export default function AlbumCoverPlaceholder() {
  return (
    <div className="border-gray-300 grid place-items-center aspect-square bg-gray-200 border rounded-xl w-32 h-32">
      <span className="sr-only">Album placeholder</span>
      <MdAlbum className="aspect-square" size="5em" />
    </div>
  )
}
