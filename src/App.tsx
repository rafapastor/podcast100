import { Routes, Route } from "react-router-dom";
import "./styles/_variables.scss";
import Home from "./pages/Home";
import PodcastDetail from "./pages/PodcastDetail";
import EpisodeDetail from "./pages/EpisodeDetail";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Header isLoading={loading} />
      <Routes>
        <Route path="/" element={<Home setLoading={setLoading} />} />
        <Route
          path="/podcast/:podcastId"
          element={<PodcastDetail setLoading={setLoading} />}
        />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetail setLoading={setLoading} />}
        />
      </Routes>
    </>
  );
}

export default App;
