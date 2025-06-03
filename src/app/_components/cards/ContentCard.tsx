"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import type { Movie, Series } from "@/lib/types";

interface ContentCardProps {
  content: Movie | Series;
  type: "movie" | "series";
}

export default function ContentCard({ content, type }: ContentCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [imgError, setImgError] = useState(false);

  const contentUrl =
    type === "movie" ? `/movie/${content.id}` : `/series/${content.id}`;

  // Type-safe way to get the release year
  const releaseYear =
    type === "movie"
      ? new Date((content as Movie).releaseDate).getFullYear()
      : new Date((content as Series).firstAirDate).getFullYear();

  // Get poster URL with error handling
  const getPosterUrl = () => {
    if (imgError) return "/placeholder-poster.jpg";
    return content.posterPath?.startsWith("/")
      ? `https://image.tmdb.org/t/p/w500${content.posterPath}`
      : content.posterPath || "/placeholder-poster.jpg";
  };

  // Get backdrop URL with error handling
  const getBackdropUrl = () => {
    return content.backdropPath?.startsWith("/")
      ? `https://image.tmdb.org/t/p/w780${content.backdropPath}`
      : content.backdropPath || "/placeholder-backdrop.jpg";
  };

  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div
          className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Link href={contentUrl}>
            <div className="relative aspect-[2/3]">
              <Image
                src={getPosterUrl()}
                alt={content.title}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 200px"
                onError={() => setImgError(true)}
                loading="eager"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Rating badge */}
              <Badge className="absolute top-2 right-2 bg-black/60 text-xs font-medium backdrop-blur-sm">
                {type === "movie"
                  ? (content as Movie).rating
                  : (content as Series).rating}
              </Badge>
            </div>
          </Link>

          {/* Title overlay on hover - always visible on mobile */}
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-3 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <h3 className="truncate text-sm font-medium text-white">
              {content.title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-white/70">{releaseYear}</span>
              {type === "series" && (
                <span className="text-xs text-white/70">
                  {(content as Series).seasons.length} Season
                  {(content as Series).seasons.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 border-zinc-800 bg-zinc-900 p-0 text-white shadow-xl">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={getBackdropUrl()}
            alt={content.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="absolute right-4 bottom-4 left-4 flex gap-2">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 rounded-full text-white"
            >
              <Play className="mr-1 h-4 w-4" /> Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-white/20"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">{content.title}</h3>
            <span className="text-sm text-white/70">{releaseYear}</span>
          </div>

          <p className="mb-3 line-clamp-3 text-xs text-white/70">
            {content.overview}
          </p>

          <div className="flex flex-wrap gap-1">
            {content.genres.slice(0, 3).map((genre) => (
              <Badge
                key={genre.id}
                variant="outline"
                className="bg-transparent text-xs"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
