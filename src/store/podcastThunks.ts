import { createAsyncThunk } from "@reduxjs/toolkit";
import { Podcast } from "../types/types";
import {
  fetchPodcastDetails,
  fetchTopPodcasts,
} from "../services/podcastService";
import {
  getLocalStorageData,
  setLocalStorageData,
  isDataExpired,
} from "../utils/storageUtils";

const PODCASTS_STORAGE_KEY = "top_podcasts";
//const PODCASTS_TIMESTAMP_KEY = "top_podcasts_timestamp";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export const loadPodcasts = createAsyncThunk(
  "podcast/loadPodcasts",
  async () => {
    const podcastsFromStorage = getLocalStorageData(PODCASTS_STORAGE_KEY);

    if (
      podcastsFromStorage &&
      !isDataExpired(PODCASTS_STORAGE_KEY, TWENTY_FOUR_HOURS)
    ) {
      return podcastsFromStorage.map((podcast: Podcast) => ({
        ...podcast,
        details: null,
      }));
    } else {
      const fetchedPodcasts = await fetchTopPodcasts();
      const podcastsWithDetails = fetchedPodcasts.map((podcast: Podcast) => ({
        ...podcast,
        details: null,
      }));

      setLocalStorageData(PODCASTS_STORAGE_KEY, podcastsWithDetails);
      //setLocalStorageData(PODCASTS_TIMESTAMP_KEY, Date.now().toString());

      return podcastsWithDetails;
    }
  }
);

export const loadPodcastDetails = createAsyncThunk(
  "podcast/loadPodcastDetails",
  async (podcastId: string, { getState }) => {
    const state = getState() as { podcast: { podcasts: Podcast[] } };
    const podcast = state.podcast.podcasts.find((p) => p.id === podcastId);

    if (!podcast) throw new Error("Podcast not found");

    const detailsStorageKey = `podcast_${podcastId}_details`;
    //const detailsTimestampKey = `podcast_${podcastId}_timestamp`;

    if (!isDataExpired(detailsStorageKey, TWENTY_FOUR_HOURS)) {
      const detailsFromStorage = getLocalStorageData(detailsStorageKey);
      if (detailsFromStorage) {
        return { podcastId, details: detailsFromStorage };
      }
    }

    const details = await fetchPodcastDetails(podcastId);

    setLocalStorageData(detailsStorageKey, details);
    //setLocalStorageData(detailsTimestampKey, Date.now().toString());

    return { podcastId, details };
  }
);
