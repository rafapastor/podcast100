import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPodcastDetails } from "../services/podcastService";
import { Episode, PodcastDetails } from "../types/types";

interface PodcastDetailProps {
  setLoading: (loading: boolean) => void;
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ setLoading }) => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const [podcast, setPodcast] = useState<PodcastDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPodcastDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchPodcastDetails(podcastId!);
        setPodcast(details[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load podcast details." + err);
        setLoading(false);
      }
    };

    loadPodcastDetails();
  }, [podcastId, setLoading]);

  if (error) return <div>{error}</div>;
  if (!podcast) return <div>Podcast not found.</div>;

  return (
    <div className="podcast-detail">
      <aside className="sidebar">
        <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
        <h2>{podcast.collectionName}</h2>
        <p>{podcast.artistName}</p>
        <p>{podcast.description}</p>
      </aside>
      <main className="episodes">
        <h3>Episodes</h3>
        <ul>
          {podcast.episodes?.map((episode: Episode) => (
            <li key={episode.trackId}>
              <a href={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                {episode.trackName}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default PodcastDetail;
