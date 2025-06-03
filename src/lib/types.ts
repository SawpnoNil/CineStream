export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
  genres: Genre[];
  rating: string; // PG, R, etc.
  trailerUrl?: string;
  videoUrl: string;
  videoQualityOptions: VideoQuality[];
  cast: Cast[];
  director: string;
  language: string;
  subtitles?: Subtitle[];
  popularity: number;
  averageRating: number;
}

export interface Series {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  firstAirDate: string;
  lastAirDate: string;
  status: string; // "Ended", "Running", etc.
  genres: Genre[];
  rating: string;
  trailerUrl?: string;
  seasons: Season[];
  cast: Cast[];
  creator: string;
  language: string;
  popularity: number;
  averageRating: number;
}

export interface Season {
  id: string;
  seasonNumber: number;
  title: string;
  overview: string;
  posterPath: string;
  airDate: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  overview: string;
  stillPath: string;
  airDate: string;
  runtime: number;
  videoUrl: string;
  videoQualityOptions: VideoQuality[];
  subtitles?: Subtitle[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface Cast {
  id: string;
  name: string;
  character: string;
  profilePath: string;
}

export interface VideoQuality {
  quality: string; // "480p", "720p", "1080p"
  url: string;
}

export interface Subtitle {
  language: string;
  url: string;
}

export interface SearchFilters {
  query?: string;
  genres?: string[];
  type?: "movie" | "series";
}

// Content types with explicit type property
export type MovieWithType = Movie & { type: "movie" };
export type SeriesWithType = Series & { type: "series" };
export type ContentWithType = MovieWithType | SeriesWithType;

export interface User {
  id: string;
  username: string;
  email: string;
  watchlist: string[]; // IDs of movies/series
  continueWatching: {
    contentId: string;
    contentType: "movie" | "episode";
    position: number; // Position in seconds
    lastWatched: string; // ISO date string
  }[];
}

export interface Website {
  title: string;
  logoUrl: string;
  theme: "light" | "dark" | "system";
  featuredContent: {
    id: string;
    type: "movie" | "series";
  }[];
} 