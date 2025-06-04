"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, ThumbsUp, ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import MainLayout from "@/app/_components/layout/MainLayout";
import { series } from "@/lib/mock/data";
import type { Episode } from "@/lib/types";

export default function SeriesDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeSeason, setActiveSeason] = useState(1);

  // Find the series by ID
  const seriesId = Array.isArray(params.id) ? params.id[0] : params.id;
  const show = series.find((s) => s.id === seriesId);

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // If series not found
  if (!show) {
    return (
      <MainLayout>
        <div className="container px-4 py-16 text-center md:px-6">
          <h1 className="mb-4 text-2xl font-bold">Series not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </MainLayout>
    );
  }

  // Get the active season
  const currentSeason =
    show.seasons.find((season) => season.seasonNumber === activeSeason) ??
    show.seasons[0];

  return (
    <MainLayout>
      {/* Hero section with backdrop */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        {/* Backdrop image */}
        <div className="absolute inset-0">
          <Image
            src={
              show.backdropPath?.startsWith("/")
                ? `https://image.tmdb.org/t/p/original${show.backdropPath}`
                : show.backdropPath || "/placeholder-backdrop.jpg"
            }
            alt={show.title}
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
                  show.posterPath?.startsWith("/")
                    ? `https://image.tmdb.org/t/p/w500${show.posterPath}`
                    : show.posterPath || "/placeholder-poster.jpg"
                }
                alt={show.title}
                width={256}
                height={384}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              <h1 className="mb-2 text-4xl font-bold md:text-5xl">
                {show.title}
              </h1>

              <div className="mb-4 flex items-center gap-3 text-sm text-gray-300">
                <span>{new Date(show.firstAirDate).getFullYear()}</span>
                <span className="border border-gray-600 px-1">
                  {show.rating}
                </span>
                <span>{show.status}</span>
                <span>{show.seasons.length} Seasons</span>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <Link
                  href={`/series/${show.id}/season/${currentSeason?.seasonNumber}/episode/1`}
                >
                  <Button className="bg-white text-black hover:bg-white/90">
                    <Play className="mr-2 h-5 w-5" /> Play
                  </Button>
                </Link>
                <Button size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
                <Button size="icon">
                  <ThumbsUp className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">Overview</h2>
                <p className="text-gray-300">{show.overview}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-3">
                <div>
                  <span className="text-sm text-gray-400">Creator</span>
                  <p>{show.creator}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Language</span>
                  <p>{show.language === "en" ? "English" : show.language}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Rating</span>
                  <p>{show.averageRating.toFixed(1)}/10</p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <span className="text-sm text-gray-400">Genres</span>
                  <p>{show.genres.map((g) => g.name).join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons and Episodes */}
      <div className="container px-4 py-12 md:px-6">
        <Tabs defaultValue={currentSeason?.id} className="space-y-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Episodes</h2>

            <div className="relative">
              <select
                className="appearance-none rounded-md border border-zinc-700 bg-zinc-800 py-2 pr-10 pl-4 text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
                value={activeSeason}
                onChange={(e) => setActiveSeason(Number(e.target.value))}
              >
                {show.seasons.map((season) => (
                  <option key={season.id} value={season.seasonNumber}>
                    Season {season.seasonNumber}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          {currentSeason && (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-medium">
                  {currentSeason.title}
                </h3>
                <p className="text-gray-300">{currentSeason.overview}</p>
              </div>

              <div className="space-y-4">
                {currentSeason.episodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    seriesId={show.id}
                    seasonId={currentSeason.seasonNumber.toString()}
                  />
                ))}
              </div>
            </div>
          )}
        </Tabs>
      </div>

      {/* Cast section */}
      <div className="container px-4 py-12 md:px-6">
        <h2 className="mb-6 text-2xl font-bold">Cast</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {show.cast.map((person) => (
            <div key={person.id} className="text-center">
              <div className="mx-auto mb-2 aspect-square h-24 w-24 overflow-hidden rounded-full">
                {person.profilePath ? (
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
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-800">
                    <span className="text-gray-400">
                      {person.name.charAt(0)}
                    </span>
                  </div>
                )}
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

// Episode card component
function EpisodeCard({
  episode,
  seriesId,
  seasonId,
}: {
  episode: Episode;
  seriesId: string;
  seasonId: string;
}) {
  // Format runtime to minutes
  const formatRuntime = (minutes: number) => {
    return `${minutes} min`;
  };

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-zinc-900 transition-colors hover:bg-zinc-800 md:flex-row">
      <div className="relative h-40 w-full md:w-64">
        <Image
          src={
            episode.stillPath.startsWith("/")
              ? `https://image.tmdb.org/t/p/w300${episode.stillPath}`
              : episode.stillPath
          }
          alt={episode.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
          <Link
            href={`/series/${seriesId}/season/${seasonId}/episode/${episode.episodeNumber}`}
          >
            <Button
              className="rounded-full bg-white text-black hover:bg-white/90"
              size="icon"
            >
              <Play className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {episode.episodeNumber}. {episode.title}
          </h3>
          <span className="text-sm text-gray-400">
            {formatRuntime(episode.runtime)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-gray-300">{episode.overview}</p>
      </div>
    </div>
  );
}
