"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Filter,
  Trash2,
  Pencil,
  MoreHorizontal,
  Download,
  Eye,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { movies } from "@/lib/mock/data";
import type { Movie } from "@/lib/types";

export default function AdminMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  // Extract all unique genres from movies
  const allGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres.map((g) => g.name))),
  ).sort();

  // Filter and sort movies
  const filteredMovies = movies
    .filter(
      (movie) =>
        // Search filter
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        // Genre filter
        (genreFilter === null ||
          movie.genres.some((g) => g.name === genreFilter)),
    )
    .sort((a, b) => {
      // Sort logic
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
          );
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "rating-high":
          return Number(b.rating) - Number(a.rating);
        case "rating-low":
          return Number(a.rating) - Number(b.rating);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-zinc-800 pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          <p className="text-muted-foreground">
            Manage your movie content ({filteredMovies.length} of{" "}
            {movies.length} movies)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/movies/new">
            <Plus className="mr-2 h-4 w-4" /> Add Movie
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search movies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={genreFilter ?? "all"}
            onValueChange={(value) =>
              setGenreFilter(value === "all" ? null : (value as string))
            }
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by Genre" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="rating-high">Rating (High-Low)</SelectItem>
              <SelectItem value="rating-low">Rating (Low-High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card/50 border-b border-zinc-800">
                <tr>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                    Movie
                  </th>
                  <th className="text-muted-foreground hidden px-4 py-3 text-left text-sm font-medium md:table-cell">
                    Genre
                  </th>
                  <th className="text-muted-foreground hidden px-4 py-3 text-left text-sm font-medium sm:table-cell">
                    Release Date
                  </th>
                  <th className="text-muted-foreground hidden px-4 py-3 text-left text-sm font-medium lg:table-cell">
                    Rating
                  </th>
                  <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <MovieRow key={movie.id} movie={movie} />
                ))}
                {filteredMovies.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-muted-foreground px-4 py-8 text-center"
                    >
                      No movies found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MovieRow({ movie }: { movie: Movie }) {
  const [imgError, setImgError] = useState(false);
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString();

  const getPosterUrl = () => {
    if (imgError) return "/placeholder-poster.jpg";
    return movie.posterPath.startsWith("/")
      ? `https://image.tmdb.org/t/p/w92${movie.posterPath}`
      : movie.posterPath || "/placeholder-poster.jpg";
  };

  return (
    <tr className="border-b border-zinc-800">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-sm">
            <Image
              src={getPosterUrl()}
              alt={movie.title}
              width={48}
              height={64}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
          <div>
            <div className="leading-tight font-medium">{movie.title}</div>
            <div className="text-muted-foreground text-xs">ID: {movie.id}</div>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <Badge key={genre.id} variant="secondary" className="text-xs">
              {genre.name}
            </Badge>
          ))}
          {movie.genres.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{movie.genres.length - 2}
            </Badge>
          )}
        </div>
      </td>
      <td className="hidden px-4 py-3 sm:table-cell">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="text-muted-foreground h-3.5 w-3.5" />
          {formattedDate}
        </div>
      </td>
      <td className="hidden px-4 py-3 lg:table-cell">
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          <span>{Number(movie.rating).toFixed(1)}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild>
            <Link href={`/movie/${movie.id}`} target="_blank">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href={`/admin/movies/${movie.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
