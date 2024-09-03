import React, { useEffect, useState } from "react";
import { fetchTopPodcasts } from "../services/podcastService";
import { Podcast } from "../types/types";
import "../styles/home.scss";
import { Link } from "react-router-dom";

interface HomeProps {
  setLoading: (loading: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ setLoading }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        setLoading(true);
        const fetchedPodcasts = await fetchTopPodcasts();
        setPodcasts(fetchedPodcasts);
        setFilteredPodcasts(fetchedPodcasts);
      } catch (err) {
        setError("Failed to load podcasts. Please try again later." + err);
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, [setLoading]);

  useEffect(() => {
    const filtered = podcasts.filter(
      (podcast) =>
        podcast["im:name"].label.toLowerCase().includes(filter.toLowerCase()) ||
        podcast["im:artist"].label.toLowerCase().includes(filter.toLowerCase())
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
          <li key={podcast.id.attributes["im:id"]} className="podcast-item">
            <Link
              to={`/podcast/${podcast.id.attributes["im:id"]}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={podcast["im:image"][2]?.label}
                alt={podcast["im:name"].label}
                className="podcast-image"
              />
              <div className="podcast-info">
                <p className="podcast-title">{podcast["im:name"].label}</p>
                <p className="podcast-author">
                  Author: {podcast["im:artist"].label}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
