"use client";

import { type ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ContentCard from "../cards/ContentCard";
import type { Movie, Series } from "@/lib/types";

interface ContentRowProps {
  title: string;
  items: (Movie | Series)[];
  type: "movie" | "series";
}

export default function ContentRow({ title, items, type }: ContentRowProps) {
  return (
    <div className="py-4 md:py-6">
      <h2 className="mb-2 px-4 text-lg font-medium text-white md:mb-4 md:px-6 md:text-2xl">
        {title}
      </h2>

      <div className="group relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="px-4 md:px-6">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="mr-2 w-[140px] flex-none sm:w-[160px] md:mr-3 md:w-[200px]"
              >
                <ContentCard content={item} type={type} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-1 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 md:h-10 md:w-10" />
          <CarouselNext className="absolute top-1/2 right-1 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 md:h-10 md:w-10" />
        </Carousel>
      </div>
    </div>
  );
}
