import { Route, Routes } from "react-router-dom";
import UploadDashboard from "./features/Uploader/UploadDashboard";
import Home from "./features/Home/Home";
import Playlist from "./features/Playlist/Playlist";
import Layout from "./features/Layout/Layout";
import Fb from './features/Fb.js'
import Albumlist from "./features/Albumlist/Albumlist";
import Search from "./features/Search/Search";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/album/:albumId" element={<Albumlist />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
          <Route path="/play" element={<Home />} />
          <Route path="/fb" element={<Fb />} />
        </Route>
        <Route path="/upload" element={<UploadDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
