import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import MainLayout from "./_components/layout/MainLayout";
import FeaturedHero from "./_components/layout/FeaturedHero";
import ContentRow from "./_components/layout/ContentRow";
import { movies, series } from "@/lib/mock/data";

export default function HomePage() {
  // Get popular movies
  const popularMovies = [...movies].sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  
  // Get popular series
  const popularSeries = [...series].sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  
  // Get top rated movies
  const topRatedMovies = [...movies].sort((a, b) => b.averageRating - a.averageRating).slice(0, 10);
  
  // Get top rated series
  const topRatedSeries = [...series].sort((a, b) => b.averageRating - a.averageRating).slice(0, 10);
  
  // Get action movies
  const actionMovies = movies.filter(movie => 
    movie.genres.some(genre => genre.name === "Action")
  );
  
  // Get drama series
  const dramaSeries = series.filter(show => 
    show.genres.some(genre => genre.name === "Drama")
  );
  
  return (
    <MainLayout>
      <FeaturedHero />
      
      <div className="mt-4 space-y-2">
        <ContentRow title="Popular Movies" items={popularMovies} type="movie" />
        <ContentRow title="Popular TV Shows" items={popularSeries} type="series" />
        <ContentRow title="Top Rated Movies" items={topRatedMovies} type="movie" />
        <ContentRow title="Top Rated TV Shows" items={topRatedSeries} type="series" />
        <ContentRow title="Action Movies" items={actionMovies} type="movie" />
        <ContentRow title="Drama Series" items={dramaSeries} type="series" />
      </div>
    </MainLayout>
  );
}
