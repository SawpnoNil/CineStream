"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Movie, Series } from "@/lib/types";
import { featuredContent, movies, series } from "@/lib/mock/data";
import ImageWithFallback from "@/components/custom/ImageWithFallback";

export default function FeaturedHero() {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
        containScroll: "trimSnaps",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {featuredContent.map((item) => {
          const content =
            item.type === "movie"
              ? movies.find((m) => m.id === item.id)
              : series.find((s) => s.id === item.id);

          if (!content) return null;

          const backUrl = content.backdropPath?.startsWith("/")
            ? `https://image.tmdb.org/t/p/original${content.backdropPath}`
            : content.backdropPath || "/placeholder-backdrop.jpg";

          const itemUrl =
            item.type === "movie"
              ? `/movie/${content.id}`
              : `/series/${content.id}`;

          return (
            <CarouselItem key={`${item.type}-${item.id}`}>
              <div className="relative h-[60vh] max-h-[800px] min-h-[400px] w-full sm:h-[70vh] md:h-[80vh]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={backUrl}
                    alt={content.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                    fallbackSrc={"/placeholder-backdrop.jpg"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative container flex h-full flex-col justify-end px-4 pb-12 md:px-16 md:pb-24">
                  <div className="max-w-2xl">
                    <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:mb-4 md:text-6xl">
                      {content.title}
                    </h1>

                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-300 sm:text-sm md:mb-4 md:gap-4">
                      <span className="text-primary font-medium">
                        {Math.round(content.averageRating * 10)}% Match
                      </span>
                      <span>
                        {item.type === "movie"
                          ? new Date(
                              (content as Movie).releaseDate,
                            ).getFullYear()
                          : new Date(
                              (content as Series).firstAirDate,
                            ).getFullYear()}
                      </span>
                      <span className="border border-gray-600 px-1">
                        {content.rating}
                      </span>
                      {item.type === "movie" && (
                        <span>
                          {Math.floor((content as Movie).runtime / 60)}h{" "}
                          {(content as Movie).runtime % 60}m
                        </span>
                      )}
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm text-gray-300 sm:line-clamp-3 md:mb-6 md:line-clamp-4 md:text-base">
                      {content.overview}
                    </p>

                    <div className="flex gap-3 px-3">
                      <Link href={itemUrl}>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 rounded-md text-white"
                        >
                          <Play className="mr-2 h-4 w-4" /> Play
                        </Button>
                      </Link>
                      <Link href={itemUrl}>
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
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
