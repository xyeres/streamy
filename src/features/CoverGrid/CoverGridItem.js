import { NavLink } from "react-router-dom";

export default function CoverGridItem({ item, path }) {
  return (
    <NavLink to={`${path}/${item.id}`}>
      <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform duration-200 relative hover:translate-y-1">
        <img
          alt={item.title}
          className="aspect-square drop-shadow-lg object-cover  w-full rounded-xl hover:drop-shadow-xl"
          src={item.coverUrl}
        />
        <p className="text-sm font-bold mt-3 text-neutral-700">{item.title}</p>
        {item.songs ? <p className="text-xs text-neutral-700"> {item.songs.length} Tracks</p> : ''}
      </li>
    </NavLink>
  )
}
