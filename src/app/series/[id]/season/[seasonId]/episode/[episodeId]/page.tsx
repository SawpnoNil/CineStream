"use client";

import { useParams, useRouter } from "next/navigation";
import VideoPlayer from "@/app/_components/player/VideoPlayer";
import { series } from "@/lib/mock/data";

export default function EpisodePlayerPage() {
  const params = useParams();
  const router = useRouter();
  
  // Get the series, season, and episode IDs from the URL
  const seriesId = Array.isArray(params.id) ? params.id[0] : params.id;
  const seasonId = Array.isArray(params.seasonId) ? params.seasonId[0] : params.seasonId;
  const episodeId = Array.isArray(params.episodeId) ? params.episodeId[0] : params.episodeId;
  
  // Find the series
  const show = series.find((s) => s.id === seriesId);
  
  // Find the season
  const season = show?.seasons.find((s) => s.seasonNumber.toString() === seasonId);
  
  // Find the episode
  const episode = season?.episodes.find((e) => e.episodeNumber.toString() === episodeId);
  
  // Handle back navigation
  const handleBack = () => {
    router.back();
  };
  
  // If the episode is not found
  if (!show || !season || !episode) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
        <button 
          onClick={handleBack}
          className="bg-white text-black px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  // Format the episode title
  const episodeTitle = `${show.title}: S${season.seasonNumber}:E${episode.episodeNumber} - ${episode.title}`;
  
  return (
    <div className="fixed inset-0 bg-black">
      <VideoPlayer
        title={episodeTitle}
        videoUrl={episode.videoUrl}
        videoQualityOptions={episode.videoQualityOptions}
        subtitles={episode.subtitles}
        poster={episode.stillPath?.startsWith('/') 
          ? `https://image.tmdb.org/t/p/original${episode.stillPath}` 
          : episode.stillPath || '/placeholder-still.jpg'}
        onBack={handleBack}
      />
    </div>
  );
} 