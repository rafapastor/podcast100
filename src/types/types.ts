export interface Podcast {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:name": {
    label: string;
  };
  "im:artist": {
    label: string;
  };
  "im:image": Array<{
    label: string;
  }>;
}

export interface PodcastDetails {
  collectionName: string;
  artworkUrl600: string;
  artistName: string;
  description: string;
  episodes: Episode[];
}

export interface Episode {
  trackId: number;
  trackName: string;
  description: string;
  episodeUrl: string;
  artworkUrl600: string;
}
