"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Tv,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { series } from "@/lib/mock/data";

export default function AdminSeriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter and search series
  const filteredSeries = series.filter((show) => {
    if (searchQuery) {
      return show.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Series Management</h1>
        <Button className="hidden sm:flex">
          <Plus className="mr-2 h-4 w-4" /> Add New Series
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Series
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("published")}>
                Published
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("draft")}>
                Drafts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("popular")}>
                Popular
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuItem>Recently Added</DropdownMenuItem>
              <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Alphabetical (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>Most Seasons</DropdownMenuItem>
              <DropdownMenuItem>Most Episodes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSeries.map((show) => (
          <Card key={show.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={show.coverImage}
                alt={show.title}
                fill
                className="object-cover"
              />
              <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge>{show.seasons.length} Seasons</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1">{show.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/series/${show.id}`}>View/Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex items-center">
                <Tv className="mr-1 h-3 w-3" /> TV Series • {show.releaseYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  {show.seasons.reduce(
                    (acc, season) => acc + season.episodes.length,
                    0,
                  )}{" "}
                  Episodes
                </div>
                <Link
                  href={`/admin/series/${show.id}`}
                  className="text-primary hover:underline"
                >
                  Manage
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
