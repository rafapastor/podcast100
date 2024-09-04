import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Podcast, PodcastDetails } from "../types/types";
import { loadPodcastDetails, loadPodcasts } from "./podcastThunks";

interface PodcastState {
  podcasts: Podcast[];
}

const initialState: PodcastState = {
  podcasts: [],
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadPodcasts.fulfilled,
        (state, action: PayloadAction<Podcast[]>) => {
          state.podcasts = action.payload;
        }
      )
      .addCase(
        loadPodcastDetails.fulfilled,
        (
          state,
          action: PayloadAction<{ podcastId: string; details: PodcastDetails }>
        ) => {
          const { podcastId, details } = action.payload;
          const podcast = state.podcasts.find((p) => p.id === podcastId);
          if (podcast) {
            podcast.details = details;
          }
        }
      );
  },
});
export default podcastSlice.reducer;
