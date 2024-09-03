import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PodcastDetail from "./pages/PodcastDetail";
import EpisodeDetail from "./pages/EpisodeDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
      <Route
        path="/podcast/:podcastId/episode/:episodeId"
        element={<EpisodeDetail />}
      />
    </Routes>
  );
}

export default App;
