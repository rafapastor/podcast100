import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPodcastDetails } from "../services/podcastService";
import { Episode } from "../types/types";

interface EpisodeDetailProps {
  setLoading: (loading: boolean) => void;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({ setLoading }) => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEpisodeDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchPodcastDetails(podcastId!);
        const selectedEpisode = details.find(
          (ep: Episode) => ep.trackId.toString() === episodeId
        );
        if (selectedEpisode) {
          setEpisode(selectedEpisode);
        } else {
          setError("Episode not found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load episode details." + err);
        setLoading(false);
      }
    };

    loadEpisodeDetails();
  }, [podcastId, episodeId, setLoading]);

  if (error) return <div>{error}</div>;

  return (
    <div className="episode-detail">
      <h1>{episode?.trackName}</h1>
      <p>{episode?.description}</p>
      <audio controls>
        <source src={episode?.episodeUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default EpisodeDetail;
