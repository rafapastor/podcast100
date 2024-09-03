import axios from "axios";
import { Podcast } from "../types";

const BASE_URL = "https://api.allorigins.win/get?url=";

// get the top 100 podcasts from the iTunes API
export const fetchTopPodcasts = async (): Promise<Podcast[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    );
    const data = JSON.parse(response.data.contents);
    return data.feed.entry;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }
};
