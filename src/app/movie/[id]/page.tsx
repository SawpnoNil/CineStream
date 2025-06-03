"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Play, Plus, ThumbsUp, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/app/_components/layout/MainLayout";
import VideoPlayer from "@/app/_components/player/VideoPlayer";
import { movies } from "@/lib/mock/data";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  // Find the movie by ID
  const movieId = Array.isArray(params.id) ? params.id[0] : params.id;
  const movie = movies.find((m) => m.id === movieId);

  // Handle back navigation
  const handleBack = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      router.back();
    }
  };

  // If movie not found
  if (!movie) {
    return (
      <MainLayout>
        <div className="container px-4 py-16 text-center md:px-6">
          <h1 className="mb-4 text-2xl font-bold">Movie not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </MainLayout>
    );
  }

  // If playing the movie
  if (isPlaying) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <VideoPlayer
          title={movie.title}
          videoUrl={movie.videoUrl}
          videoQualityOptions={movie.videoQualityOptions}
          subtitles={movie.subtitles}
          poster={
            movie.backdropPath?.startsWith("/")
              ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
              : movie.backdropPath || "/placeholder-backdrop.jpg"
          }
          onBack={handleBack}
        />
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <MainLayout>
      {/* Hero section with backdrop */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        {/* Backdrop image */}
        <div className="absolute inset-0">
          <Image
            src={
              movie.backdropPath?.startsWith("/")
                ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
                : movie.backdropPath || "/placeholder-backdrop.jpg"
            }
            alt={movie.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-20 left-4 z-10 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
          <span className="sr-only">Back</span>
        </button>

        {/* Content */}
        <div className="relative container flex h-full items-end px-4 pb-16 md:px-6">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Poster */}
            <div className="mb-4 h-80 w-full overflow-hidden rounded-lg shadow-lg md:mb-0 md:h-96 md:w-64">
              <Image
                src={
                  movie.posterPath?.startsWith("/")
                    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                    : movie.posterPath || "/placeholder-poster.jpg"
                }
                alt={movie.title}
                width={256}
                height={384}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              <h1 className="mb-2 text-4xl font-bold md:text-5xl">
                {movie.title}
              </h1>

              <div className="mb-4 flex items-center gap-3 text-sm text-gray-300">
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
                <span className="border border-gray-600 px-1">
                  {movie.rating}
                </span>
                <span>{formatRuntime(movie.runtime)}</span>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <Button
                  className="bg-white text-black hover:bg-white/90"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="mr-2 h-5 w-5" /> Play
                </Button>
                <Button size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
                <Button size="icon">
                  <ThumbsUp className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">Overview</h2>
                <p className="text-gray-300">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-3">
                <div>
                  <span className="text-sm text-gray-400">Director</span>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Language</span>
                  <p>{movie.language === "en" ? "English" : movie.language}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Rating</span>
                  <p>{movie.averageRating.toFixed(1)}/10</p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <span className="text-sm text-gray-400">Genres</span>
                  <p>{movie.genres.map((g) => g.name).join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast section */}
      <div className="container px-4 py-12 md:px-6">
        <h2 className="mb-6 text-2xl font-bold">Cast</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movie.cast.map((person) => (
            <div key={person.id} className="text-center">
              <div className="mx-auto mb-2 aspect-square h-24 w-24 overflow-hidden rounded-full">
                <Image
                  src={
                    person.profilePath?.startsWith("/")
                      ? `https://image.tmdb.org/t/p/w200${person.profilePath}`
                      : person.profilePath || "/placeholder-profile.jpg"
                  }
                  alt={person.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <h3 className="font-medium">{person.name}</h3>
              <p className="text-sm text-gray-400">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
