"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie, Series } from "@/lib/types";
import { featuredContent, movies, series } from "@/lib/mock/data";

export default function FeaturedHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featured, setFeatured] = useState<
    (Movie | Series) & { type: "movie" | "series" }
  >();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Get the featured content
    const item = featuredContent[currentIndex];
    if (!item) return;

    // Find the content details
    const content =
      item.type === "movie"
        ? movies.find((m) => m.id === item.id)
        : series.find((s) => s.id === item.id);

    if (content) {
      setFeatured({ ...content, type: item.type });
    }

    // Auto-rotate featured content every 10 seconds
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (!featured) return null;

  const contentUrl =
    featured.type === "movie"
      ? `/movie/${featured.id}`
      : `/series/${featured.id}`;

  // Get backdrop URL with error handling
  const getBackdropUrl = () => {
    if (imgError) return "/placeholder-backdrop.jpg";
    return featured.backdropPath?.startsWith("/")
      ? `https://image.tmdb.org/t/p/original${featured.backdropPath}`
      : featured.backdropPath || "/placeholder-backdrop.jpg";
  };

  return (
    <div className="relative h-[60vh] max-h-[800px] min-h-[400px] w-full sm:h-[70vh] md:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl()}
          alt={featured.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container flex h-full flex-col justify-end px-4 pb-12 md:px-6 md:pb-24">
        <div className="max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:mb-4 md:text-6xl">
            {featured.title}
          </h1>

          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-300 sm:text-sm md:mb-4 md:gap-4">
            <span className="text-primary font-medium">
              {Math.round(featured.averageRating * 10)}% Match
            </span>
            <span>
              {featured.type === "movie"
                ? new Date((featured as Movie).releaseDate).getFullYear()
                : new Date((featured as Series).firstAirDate).getFullYear()}
            </span>
            <span className="border border-gray-600 px-1">
              {featured.rating}
            </span>
            {featured.type === "movie" && (
              <span>
                {Math.floor((featured as Movie).runtime / 60)}h{" "}
                {(featured as Movie).runtime % 60}m
              </span>
            )}
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-gray-300 sm:line-clamp-3 md:mb-6 md:line-clamp-4 md:text-base">
            {featured.overview}
          </p>

          <div className="flex gap-3">
            <Link href={contentUrl}>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 rounded-md text-white"
              >
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
            </Link>
            <Link href={contentUrl}>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-md bg-gray-600/80 text-white hover:bg-gray-600"
              >
                <Info className="mr-2 h-4 w-4" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute right-4 bottom-4 flex gap-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-primary scale-125" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
