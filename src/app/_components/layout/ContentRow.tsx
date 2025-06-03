"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentCard from "../cards/ContentCard";
import type { Movie, Series } from "@/lib/types";

interface ContentRowProps {
  title: string;
  items: (Movie | Series)[];
  type: "movie" | "series";
}

export default function ContentRow({ title, items, type }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;

    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;

    rowRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!rowRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  return (
    <div className="py-4 md:py-6">
      <h2 className="mb-2 px-4 text-lg font-medium text-white md:mb-4 md:px-6 md:text-2xl">
        {title}
      </h2>

      <div className="group relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-1 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 md:h-10 md:w-10"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}

        {/* Content Row */}
        <div
          ref={rowRef}
          className="scrollbar-hide flex snap-x gap-2 overflow-x-auto px-4 pb-4 md:gap-3 md:px-6"
          onScroll={handleScroll}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[140px] flex-none snap-start sm:w-[160px] md:w-[200px]"
            >
              <ContentCard content={item} type={type} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 md:h-10 md:w-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </div>
  );
}
