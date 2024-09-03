import axios from "axios";
import { Podcast } from "../types/types";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/storageUtils";

const BASE_URL = "https://api.allorigins.win/get?url=";

const PODCASTS_STORAGE_KEY = "top_podcasts";

// get the top 100 podcasts from the iTunes API
export const fetchTopPodcasts = async (): Promise<Podcast[]> => {
  const cachedData = getLocalStorageData(PODCASTS_STORAGE_KEY);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    );
    const data = JSON.parse(response.data.contents);
    const podcasts = data.feed.entry;

    setLocalStorageData(PODCASTS_STORAGE_KEY, podcasts);

    return podcasts;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }
};

export const fetchPodcastDetails = async (podcastId: string) => {
  const PODCAST_DETAILS_STORAGE_KEY = `podcast_${podcastId}`;

  const cachedData = getLocalStorageData(PODCAST_DETAILS_STORAGE_KEY);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
      )}`
    );
    const data = JSON.parse(response.data.contents);
    const podcastDetails = data.results;

    setLocalStorageData(PODCAST_DETAILS_STORAGE_KEY, podcastDetails);

    return podcastDetails;
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    throw error;
  }
};
