import React, { useEffect, useState } from "react";
import { Podcast } from "../types/types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loadPodcasts } from "../store/podcastThunks";

interface HomeProps {
  setLoading: (loading: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ setLoading }) => {
  const dispatch: AppDispatch = useDispatch();
  const podcasts = useSelector((state: RootState) => state.podcast.podcasts);

  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (podcasts.length === 0) {
      setLoading(true);
      try {
        dispatch(loadPodcasts());
      } catch (err) {
        setError("Failed to load podcasts. Please try again later." + err);
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [dispatch, podcasts, setLoading]);

  useEffect(() => {
    const filtered = podcasts.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredPodcasts(filtered);
  }, [filter, podcasts]);

  return (
    <div className="home">
      <div className="search-container">
        <span className="podcasts-count">{filteredPodcasts.length}</span>
        <input
          type="text"
          placeholder="Filtrar podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <ul className="podcast-list">
        {filteredPodcasts.map((podcast) => (
          <li key={podcast.id} className="podcast-item">
            <Link
              to={`/podcast/${podcast.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={podcast.image}
                alt={podcast.name}
                className="podcast-image"
              />
              <div className="podcast-info">
                <p className="podcast-title">{podcast.name}</p>
                <p className="podcast-author">Author: {podcast.author}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
