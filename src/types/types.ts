export interface RawPodcast {
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
  summary: {
    label: string;
  };
  link: {
    attributes: {
      href: string;
    };
  };
  category: {
    attributes: {
      label: string;
    };
  };
  "im:releaseDate": {
    attributes: {
      label: string;
    };
  };
}

export interface Podcast {
  id: string;
  name: string;
  image: string;
  summary: string;
  author: string;
  link: string;
  category: string;
  releaseDate: string;
  details?: PodcastDetails;
}

export interface PodcastDetails {
  collectionName: string;
  artworkUrl600: string;
  artistName: string;
  description: string;
  episodes: Episode[];
}

export interface Episode {
  trackId: string;
  trackName: string;
  description: string;
  episodeUrl: string;
  releaseDate: string;
  trackTimeMillis: number;
}
