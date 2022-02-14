import { Route, Routes } from "react-router-dom";
import UploadDashboard from "./features/Uploader/UploadDashboard";
import Home from "./features/Home/Home";
import Playlist from "./features/Playlist/Playlist";
import Layout from "./features/Layout/Layout";
import Fb from './features/Fb.js'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fb" element={<Fb />} />
          <Route path="/play" element={<Home />} />
          <Route path="play/:playlistId" element={<Playlist />} />
        </Route>
        <Route path="/upload" element={<UploadDashboard />} />
      </Routes>
    </div>
  );
}


export default App;
