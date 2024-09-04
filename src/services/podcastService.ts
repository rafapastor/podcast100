import axios from "axios";
import { Episode, Podcast, RawPodcast } from "../types/types";
import { setLocalStorageData } from "../utils/storageUtils";

const BASE_URL = "https://api.allorigins.win/get?url=";

const PODCASTS_STORAGE_KEY = "top_podcasts";

// get the top 100 podcasts from the iTunes API
export const fetchTopPodcasts = async (): Promise<Podcast[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    );
    const data = JSON.parse(response.data.contents);
    const podcasts: Podcast[] = data.feed.entry.map(
      (podcast: RawPodcast): Podcast => ({
        id: podcast.id.attributes["im:id"],
        name: podcast["im:name"].label,
        image: podcast["im:image"][2].label,
        summary: podcast.summary.label,
        author: podcast["im:artist"].label,
        link: podcast.link.attributes.href,
        category: podcast.category.attributes.label,
        releaseDate: podcast["im:releaseDate"].attributes.label,
      })
    );

    setLocalStorageData(PODCASTS_STORAGE_KEY, podcasts);

    return podcasts;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }
};

export const fetchPodcastDetails = async (podcastId: string) => {
  const PODCAST_DETAILS_STORAGE_KEY = `podcast_${podcastId}`;

  try {
    const response = await axios.get(
      `${BASE_URL}${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
      )}`
    );
    const data = JSON.parse(response.data.contents);
    const podcastDetails = {
      collectionName: data.results[0].collectionName,
      artworkUrl600: data.results[0].artworkUrl600,
      artistName: data.results[0].artistName,
      description: data.results[0].collectionName,
      episodes: data.results.slice(1).map((episode: Episode) => ({
        trackId: episode.trackId,
        trackName: episode.trackName,
        description: episode.description,
        episodeUrl: episode.episodeUrl,
      })),
    };

    setLocalStorageData(PODCAST_DETAILS_STORAGE_KEY, podcastDetails);

    return podcastDetails;
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    throw error;
  }
};
