import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Episode } from "../types/types";
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

  return (
    <div className="podcast-detail">
      <Sidebar
        imageUrl={podcast.details?.artworkUrl600}
        title={podcast.details?.collectionName}
        author={podcast.details?.artistName}
        description={podcast.summary}
      />
      <main className="episodes">
        <h3>Episodes</h3>
        <ul>
          {podcast.details?.episodes?.map((episode: Episode) => (
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
