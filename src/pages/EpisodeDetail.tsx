import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { RootState } from "../store/store";

interface EpisodeDetailProps {
  setLoading: (loading: boolean) => void;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({ setLoading }) => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  setLoading(true);
  const podcast = useSelector((state: RootState) =>
    state.podcast.podcasts.find((podcast) => podcast.id === podcastId)
  );
  if (!podcast) {
    return null;
  }
  const episode = podcast.details?.episodes.find(
    (episode) => episode.trackId == episodeId
  );

  if (!podcast || !episode || !podcast.details) {
    return null;
  } else {
    setLoading(false);
  }

  return (
    <div className="episode-detail-container">
      <Sidebar
        imageUrl={podcast.details?.artworkUrl600}
        title={podcast.details?.collectionName}
        author={podcast.details?.artistName}
        description={podcast.summary || "No description available"}
      />
      <div className="episode-detail-content">
        <h1 className="episode-title">{episode?.trackName}</h1>
        <p className="episode-description">{episode?.description}</p>
        <div className="audio-player">
          <audio controls>
            <source src={episode?.episodeUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
