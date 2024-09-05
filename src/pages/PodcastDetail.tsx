import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loadPodcastDetails } from "../store/podcastThunks";

interface PodcastDetailProps {
  setLoading: (loading: boolean) => void;
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ setLoading }) => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const podcast = useSelector((state: RootState) =>
    state.podcast.podcasts.find((podcast) => podcast.id === podcastId)
  );

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await dispatch(loadPodcastDetails(podcastId!));
      setLoading(false);
    };

    if (podcastId) {
      fetchDetails();
    }
  }, [dispatch, podcastId, setLoading]);

  if (!podcast || !podcast.details) {
    return null;
  }

  const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    if (isNaN(minutes) || isNaN(seconds)) return `-`;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="podcast-detail-container">
      <Sidebar
        imageUrl={podcast.details?.artworkUrl600}
        title={podcast.details?.collectionName}
        author={podcast.details?.artistName}
        description={podcast.summary || "No description available"}
      />
      <div className="podcast-main">
        <div className="total-episodes">
          <h3>Episodes: {podcast.details?.episodes.length || 0}</h3>
        </div>

        <div className="episode-list-container">
          <table className="episode-list">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {podcast.details?.episodes.map((episode, index) => (
                <tr
                  key={episode.trackId}
                  className={index % 2 === 0 ? "even" : "odd"}
                >
                  <td>
                    <Link
                      to={`/podcast/${podcast.id}/episode/${episode.trackId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {episode.trackName}
                    </Link>
                  </td>
                  <td>{episode.releaseDate}</td>{" "}
                  <td>{formatDuration(episode.trackTimeMillis)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
