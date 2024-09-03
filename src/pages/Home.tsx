import React, { useEffect, useState } from "react";
import { fetchTopPodcasts } from "../services/podcastService";
import { Podcast } from "../types/types";
import "../styles/home.scss";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const fetchedPodcasts = await fetchTopPodcasts();
        setPodcasts(fetchedPodcasts);
      } catch (err) {
        setError("Failed to load podcasts. Please try again later." + err);
      }
    };

    loadPodcasts();
  }, []);

  return (
    <div className="home">
      <h1>Top 100 Podcasts</h1>
      {error && <p className="error">{error}</p>}
      <ul className="podcast-list">
        {podcasts.map((podcast) => (
          <li key={podcast.id.attributes["im:id"]} className="podcast-item">
            <Link to={`/podcast/${podcast.id.attributes["im:id"]}`}>
              <img
                src={podcast["im:image"][2]?.label}
                alt={podcast["im:name"].label}
                className="podcast-image"
              />
              <div className="podcast-info">
                <h2 className="podcast-title">{podcast["im:name"].label}</h2>
                <p className="podcast-author">{podcast["im:artist"].label}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
