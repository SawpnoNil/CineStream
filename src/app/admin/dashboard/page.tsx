"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Film,
  Tv,
  Users,
  BarChart,
  Settings,
  Search,
  Plus,
  Trash2,
  Home,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { movies, series, websiteSettings } from "@/lib/mock/data";
import type { Movie, Series } from "@/lib/types";

// Admin sidebar navigation items
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", count: null },
  { icon: Film, label: "Movies", count: movies.length },
  { icon: Tv, label: "TV Series", count: series.length },
  { icon: Users, label: "Users", count: 1205 },
  { icon: BarChart, label: "Analytics", count: null },
  { icon: Settings, label: "Settings", count: null },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("movies");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter content based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredSeries = series.filter((show) =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} hidden border-r border-zinc-800 p-4 transition-all duration-300 md:block`}
      >
        <div className="mb-8 flex items-center justify-center md:justify-start">
          <Link
            href="/"
            className={`flex items-center gap-2 ${!sidebarOpen && "justify-center"}`}
          >
            {websiteSettings.logoUrl ? (
              <Image
                src={websiteSettings.logoUrl}
                alt={websiteSettings.title}
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            ) : (
              <Film className="h-8 w-8 text-white" />
            )}
            {sidebarOpen && (
              <span className="text-xl font-bold">
                {websiteSettings.title} Admin
              </span>
            )}
          </Link>
        </div>

        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-zinc-800/60 ${
                    activeTab.toLowerCase() === item.label.toLowerCase()
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400"
                  }`}
                  onClick={() => setActiveTab(item.label.toLowerCase())}
                >
                  <div
                    className={`flex items-center ${!sidebarOpen && "w-full justify-center"}`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`}
                    />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                  {sidebarOpen && item.count !== null && (
                    <Badge variant="outline" className="bg-zinc-800 text-xs">
                      {item.count}
                    </Badge>
                  )}
                </button>
              </li>
            ))}

            <li className="mt-4 border-t border-zinc-800 pt-4">
              <Link
                href="/"
                className={`flex items-center ${!sidebarOpen ? "justify-center" : ""} w-full rounded-lg px-4 py-3 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-white`}
              >
                <Home className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`} />
                {sidebarOpen && <span>Back to Site</span>}
              </Link>
            </li>

            <li>
              <button
                className={`flex items-center ${!sidebarOpen ? "justify-center" : ""} w-full rounded-lg px-4 py-3 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-white`}
              >
                <LogOut className={`h-5 w-5 ${sidebarOpen ? "mr-3" : ""}`} />
                {sidebarOpen && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-4 text-zinc-400 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="w-[180px] rounded-full border-zinc-700 bg-zinc-900 py-2 pr-4 pl-10 text-white md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="hidden items-center bg-zinc-800 text-white hover:bg-zinc-700 md:flex">
                <Plus className="mr-2 h-4 w-4" /> Add Content
              </Button>
              <Button
                size="icon"
                className="bg-zinc-800 text-white hover:bg-zinc-700 md:hidden"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="overflow-auto p-4 md:p-6">
          <Tabs defaultValue="movies" className="space-y-6">
            <TabsList className="rounded-lg border border-zinc-700/20 bg-zinc-800/50 p-1 backdrop-blur-sm">
              <TabsTrigger
                value="movies"
                onClick={() => setActiveTab("movies")}
              >
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="series"
                onClick={() => setActiveTab("series")}
              >
                TV Series
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Movies Tab */}
            <TabsContent value="movies">
              <div className="grid grid-cols-1 gap-4">
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Movies</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage your movie content
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-zinc-800">
                            <th className="pr-4 pb-3 font-medium">Title</th>
                            <th className="hidden px-4 pb-3 font-medium md:table-cell">
                              Release Date
                            </th>
                            <th className="hidden px-4 pb-3 font-medium sm:table-cell">
                              Rating
                            </th>
                            <th className="hidden px-4 pb-3 font-medium lg:table-cell">
                              Popularity
                            </th>
                            <th className="pb-3 pl-4 text-right font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMovies.map((movie) => (
                            <MovieRow key={movie.id} movie={movie} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Series Tab */}
            <TabsContent value="series">
              <div className="grid grid-cols-1 gap-4">
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>TV Series</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage your TV series content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-zinc-800">
                            <th className="pr-4 pb-3 font-medium">Title</th>
                            <th className="hidden px-4 pb-3 font-medium md:table-cell">
                              First Air Date
                            </th>
                            <th className="hidden px-4 pb-3 font-medium sm:table-cell">
                              Status
                            </th>
                            <th className="hidden px-4 pb-3 font-medium lg:table-cell">
                              Seasons
                            </th>
                            <th className="pb-3 pl-4 text-right font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSeries.map((show) => (
                            <SeriesRow key={show.id} series={show} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Content Overview</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Summary of your content library
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Total Movies</span>
                        <span className="font-medium">{movies.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Total TV Series</span>
                        <span className="font-medium">{series.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Total Episodes</span>
                        <span className="font-medium">
                          {series.reduce(
                            (total, show) =>
                              total +
                              show.seasons.reduce(
                                (count, season) =>
                                  count + season.episodes.length,
                                0,
                              ),
                            0,
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription className="text-zinc-400">
                      User engagement metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Active Users</span>
                        <span className="font-medium">1,205</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>New Sign-ups (Last 7 days)</span>
                        <span className="font-medium">124</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Total Watch Time (hrs)</span>
                        <span className="font-medium">8,432</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Movie row component
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
      <td className="py-3 pr-4">
        <div className="flex items-center">
          <div className="mr-3 h-14 w-10 flex-shrink-0 overflow-hidden rounded">
            <Image
              src={getPosterUrl()}
              alt={movie.title}
              width={40}
              height={56}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="max-w-[120px] truncate sm:max-w-[200px]">
            <p className="truncate font-medium">{movie.title}</p>
            <p className="truncate text-xs text-zinc-400">
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">{formattedDate}</td>
      <td className="hidden px-4 py-3 sm:table-cell">{movie.rating}</td>
      <td className="hidden px-4 py-3 lg:table-cell">
        {movie.popularity.toFixed(1)}
      </td>
      <td className="py-3 pl-4 text-right">
        <div className="flex justify-end gap-2">
          <Button size="icon" className="text-zinc-400 hover:text-white">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" className="text-zinc-400 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// Series row component
function SeriesRow({ series }: { series: Series }) {
  const [imgError, setImgError] = useState(false);
  const formattedDate = new Date(series.firstAirDate).toLocaleDateString();

  const getPosterUrl = () => {
    if (imgError) return "/placeholder-poster.jpg";
    return series.posterPath.startsWith("/")
      ? `https://image.tmdb.org/t/p/w92${series.posterPath}`
      : series.posterPath || "/placeholder-poster.jpg";
  };

  return (
    <tr className="border-b border-zinc-800">
      <td className="py-3 pr-4">
        <div className="flex items-center">
          <div className="mr-3 h-14 w-10 flex-shrink-0 overflow-hidden rounded">
            <Image
              src={getPosterUrl()}
              alt={series.title}
              width={40}
              height={56}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="max-w-[120px] truncate sm:max-w-[200px]">
            <p className="truncate font-medium">{series.title}</p>
            <p className="truncate text-xs text-zinc-400">
              {series.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">{formattedDate}</td>
      <td className="hidden px-4 py-3 sm:table-cell">{series.status}</td>
      <td className="hidden px-4 py-3 lg:table-cell">
        {series.seasons.length}
      </td>
      <td className="py-3 pl-4 text-right">
        <div className="flex justify-end gap-2">
          <Button size="icon" className="text-zinc-400 hover:text-white">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" className="text-zinc-400 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
