import { MdHomeFilled, MdSearch, MdLibraryMusic } from 'react-icons/md'
import { NavLink } from 'react-router-dom';

export default function MenuNav() {
  let activeStyle = (isActive) => {
    return {
      color: isActive ? "black" : "black"
    }
  };
  return (
    <div className="flex px-4 items-center justify-around h-12 border-t border-gray-300 bg-white fixed scroll bottom-0 left-0 right-0">
      <NavLink style={activeStyle} to="/">
        <MdHomeFilled size="1.25em" className="drop-shadow" />
      </NavLink>
      <NavLink style={activeStyle} to="/search">
        <MdSearch size="1.25em" className="text-gray-900 drop-shadow" />
      </NavLink>
      <MdLibraryMusic size="1.25em" className="text-gray-900 drop-shadow" />
    </div>
  );
}
