"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import MainLayout from "@/app/_components/layout/MainLayout";
import ContentCard from "@/app/_components/cards/ContentCard";
import { movies, series, genres } from "@/lib/mock/data";
import type { ContentWithType, SearchFilters } from "@/lib/types";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<ContentWithType[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    query: queryParam,
    genres: [],
    type: undefined,
  });

  // Handle search when query or filters change
  useEffect(() => {
    if (!filters.query && filters.genres?.length === 0 && !filters.type) {
      setResults([]);
      return;
    }

    // Combine movies and series with their type
    const allContent: ContentWithType[] = [
      ...movies.map((movie) => ({ ...movie, type: "movie" as const })),
      ...series.map((show) => ({ ...show, type: "series" as const })),
    ];

    // Filter based on search criteria
    const filteredResults = allContent.filter((item) => {
      // Filter by query
      const matchesQuery =
        !filters.query ||
        item.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        item.overview.toLowerCase().includes(filters.query.toLowerCase());

      // Filter by content type
      const matchesType = !filters.type || item.type === filters.type;

      // Filter by genres
      const matchesGenres =
        !filters.genres?.length ||
        item.genres.some((genre) => filters.genres?.includes(genre.name));

      return matchesQuery && matchesType && matchesGenres;
    });

    setResults(filteredResults);
  }, [filters]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, query }));

    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Toggle genre selection
  const toggleGenre = (genreName: string) => {
    setFilters((prev) => {
      const currentGenres = prev.genres ?? [];
      const newGenres = currentGenres.includes(genreName)
        ? currentGenres.filter((g) => g !== genreName)
        : [...currentGenres, genreName];

      return { ...prev, genres: newGenres };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ query, genres: [], type: undefined });
  };

  // Check if any filters are active
  const hasActiveFilters = (): boolean => {
    if (filters.query) return true;
    if ((filters.genres?.length ?? 0) > 0) return true;
    if (filters.type) return true;
    return false;
  };

  return (
    <MainLayout>
      <div className="container px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold">Search</h1>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="search"
                placeholder="Search titles, people, genres"
                className="border-zinc-700 bg-zinc-900 py-2 pr-4 pl-10 text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>

            {/* Filters button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="ml-2">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="border-zinc-800 bg-zinc-900 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Filters</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 py-6">
                  {/* Content type filter */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Content Type</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={
                          filters.type === "movie" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleFilterChange(
                            "type",
                            filters.type === "movie" ? undefined : "movie",
                          )
                        }
                      >
                        Movies
                      </Button>
                      <Button
                        variant={
                          filters.type === "series" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          handleFilterChange(
                            "type",
                            filters.type === "series" ? undefined : "series",
                          )
                        }
                      >
                        TV Series
                      </Button>
                    </div>
                  </div>

                  {/* Genres filter */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <Button
                          key={genre.id}
                          variant={
                            filters.genres?.includes(genre.name)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleGenre(genre.name)}
                        >
                          {genre.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Clear filters */}
                  <div className="border-t border-zinc-800 pt-4">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={clearFilters}>
                        <X className="mr-2 h-4 w-4" /> Clear Filters
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </form>
        </div>

        {/* Active filters */}
        {((filters.genres?.length ?? 0) > 0 || filters.type) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {filters.type && (
              <div className="flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm text-white">
                {filters.type === "movie" ? "Movies" : "TV Series"}
                <button
                  onClick={() => handleFilterChange("type", undefined)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.genres?.map((genre) => (
              <div
                key={genre}
                className="flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm text-white"
              >
                {genre}
                <button
                  onClick={() => toggleGenre(genre)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        <div>
          {filters.query && (
            <h2 className="mb-6 text-xl font-medium">
              {results.length} results for &ldquo;{filters.query}&rdquo;
            </h2>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {results.map((item) => (
                <ContentCard
                  key={`${item.type}-${item.id}`}
                  content={item}
                  type={item.type}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              {hasActiveFilters() ? (
                <>
                  <h3 className="mb-2 text-xl font-medium">No results found</h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </>
              ) : (
                <>
                  <h3 className="mb-2 text-xl font-medium">
                    Search for movies and TV series
                  </h3>
                  <p className="text-gray-400">
                    Use the search bar above to find content
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// Add a loading fallback component
function SearchLoadingFallback() {
  return (
    <MainLayout>
      <div className="container px-4 py-12 md:px-6">
        <div className="flex items-center justify-center py-12">
          <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-zinc-700"></div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoadingFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}
