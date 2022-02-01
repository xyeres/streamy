import { NavLink, Route, Routes } from "react-router-dom";
import UploadDashboard from "./features/Uploader/UploadDashboard";
import Player from "./features/Player/Player";
import Home from "./features/Home/Home";

function App() {
  let activeStyle = (isActive) => {
    return {
      backgroundColor: isActive ? "white" : "",
      color: isActive ? "black" : ""
    }
  };

  return (
    <div className="">
      <nav className="space-x-2 p-3 bg-rose-500">
        <NavLink style={({ isActive }) => activeStyle(isActive)} className="text-white hover:bg-white hover:text-slate-800 font-bold p-4" to="/">Home</NavLink>
        <NavLink style={({ isActive }) => activeStyle(isActive)} className="text-white hover:bg-white hover:text-slate-800 font-bold p-4" to="/play">Player</NavLink>
        <NavLink style={({ isActive }) => activeStyle(isActive)} className=" text-white hover:bg-white hover:text-slate-800 font-bold p-4" to="/upload">Uploader</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadDashboard />} />
        <Route path="/play" element={<Player />} />
      </Routes>
    </div>
  );
}


export default App;
