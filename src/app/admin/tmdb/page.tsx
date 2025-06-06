"use client";

import { useState } from "react";
import { Search, Film, Tv, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchResult {
  id: number;
  title: string;
  type: "movie" | "tv";
  year: string;
  poster: string;
  overview: string;
}

export default function AdminTMDBImportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"movie" | "tv">("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search function (in real app would call TMDB API)
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Mock results
      const mockResults: SearchResult[] = [
        {
          id: 1,
          title: "Inception",
          type: "movie",
          year: "2010",
          poster:
            "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          overview:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        },
        {
          id: 2,
          title: "The Dark Knight",
          type: "movie",
          year: "2008",
          poster:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          overview:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        },
        {
          id: 3,
          title: "Interstellar",
          type: "movie",
          year: "2014",
          poster:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          overview:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        },
      ];

      setResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">TMDB Import</h1>
        <p className="text-muted-foreground mt-2">
          Search and import movies and TV series from The Movie Database
        </p>
      </div>

      <Tabs defaultValue="movie" className="space-y-6">
        <TabsList>
          <TabsTrigger value="movie" onClick={() => setSearchType("movie")}>
            <Film className="mr-2 h-4 w-4" /> Movies
          </TabsTrigger>
          <TabsTrigger value="tv" onClick={() => setSearchType("tv")}>
            <Tv className="mr-2 h-4 w-4" /> TV Series
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder={`Search ${searchType === "movie" ? "movies" : "TV series"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        <TabsContent value="movie">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Movies Search Results</CardTitle>
              <CardDescription>
                Find and import movies from TMDB database
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="border-border flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${result.poster})` }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{result.title}</h3>
                          <Badge variant="outline">{result.year}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                          {result.overview}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Import
                        </Button>
                        <div className="text-muted-foreground flex items-center text-xs">
                          <Info className="mr-1 h-3 w-3" /> TMDB ID: {result.id}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground flex h-40 items-center justify-center">
                  {isLoading
                    ? "Searching TMDB..."
                    : searchQuery
                      ? "No results found"
                      : "Search for movies to import"}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tv">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>TV Series Search Results</CardTitle>
              <CardDescription>
                Find and import TV series from TMDB database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground flex h-40 items-center justify-center">
                {isLoading
                  ? "Searching TMDB..."
                  : searchQuery
                    ? "No results found"
                    : "Search for TV series to import"}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Import Settings</CardTitle>
          <CardDescription>
            Configure how content is imported from TMDB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="metadata">Metadata Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-overview" defaultChecked />
                    <Label htmlFor="import-overview">Import overview</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-cast" defaultChecked />
                    <Label htmlFor="import-cast">Import cast information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-crew" defaultChecked />
                    <Label htmlFor="import-crew">Import crew information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-keywords" defaultChecked />
                    <Label htmlFor="import-keywords">
                      Import keywords & genres
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assets">Media Assets</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-poster" defaultChecked />
                    <Label htmlFor="import-poster">Import poster</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-backdrop" defaultChecked />
                    <Label htmlFor="import-backdrop">Import backdrop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-logos" defaultChecked />
                    <Label htmlFor="import-logos">Import logos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="import-videos" defaultChecked />
                    <Label htmlFor="import-videos">
                      Import videos (trailers)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
