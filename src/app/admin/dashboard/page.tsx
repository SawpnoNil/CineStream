"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Film,
  Tv,
  Users,
  BarChart,
  Search,
  Plus,
  ArrowUpRight,
  CalendarDays,
  Eye,
} from "lucide-react";
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
import { movies, series } from "@/lib/mock/data";

// Dashboard summary cards
const summaryCards = [
  {
    title: "Total Movies",
    value: movies.length,
    change: "+12%",
    icon: Film,
    trend: "up",
    link: "/admin/movies",
  },
  {
    title: "Total Series",
    value: series.length,
    change: "+7%",
    icon: Tv,
    trend: "up",
    link: "/admin/series",
  },
  {
    title: "Users",
    value: 1205,
    change: "+22%",
    icon: Users,
    trend: "up",
    link: "/admin/users",
  },
  {
    title: "Views Today",
    value: 843,
    change: "-3%",
    icon: Eye,
    trend: "down",
    link: "/admin/analytics",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Get total episodes count
  const totalEpisodes = series.reduce(
    (total, show) =>
      total +
      show.seasons.reduce((count, season) => count + season.episodes.length, 0),
    0,
  );

  // Get most viewed content (mock data)
  const mostViewedContent = [
    { id: 1, title: "Interstellar", type: "movie", views: 1256 },
    { id: 2, title: "Breaking Bad", type: "series", views: 987 },
    { id: 3, title: "The Dark Knight", type: "movie", views: 879 },
    { id: 4, title: "Stranger Things", type: "series", views: 764 },
    { id: 5, title: "Inception", type: "movie", views: 692 },
  ];

  // Recent user activity (mock data)
  const recentActivity = [
    {
      user: "user123",
      action: "watched",
      content: "Inception",
      time: "2 hours ago",
    },
    {
      user: "cinephile22",
      action: "signed up",
      content: null,
      time: "3 hours ago",
    },
    {
      user: "movielover",
      action: "rated",
      content: "The Dark Knight",
      time: "5 hours ago",
    },
    {
      user: "seriesfan",
      action: "watched",
      content: "Breaking Bad S3:E4",
      time: "8 hours ago",
    },
    {
      user: "newuser42",
      action: "subscribed",
      content: null,
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <Button className="hidden items-center md:flex">
          <Plus className="mr-2 h-4 w-4" /> Add Content
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Link href={card.link} key={card.title} className="group">
            <Card className="bg-card/50 hover:border-primary/50 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <card.icon className="text-muted-foreground h-5 w-5" />
                  <span
                    className={`flex items-center gap-1 text-xs ${
                      card.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold">
                  {card.value}
                </CardTitle>
                <CardDescription>{card.title}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-1">
                <span className="text-muted-foreground group-hover:text-primary text-xs">
                  View details
                </span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Content Summary</CardTitle>
                <CardDescription>
                  Overview of your library and content stats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">
                      Total Movies
                    </div>
                    <div className="text-2xl font-bold">{movies.length}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">
                      Total Series
                    </div>
                    <div className="text-2xl font-bold">{series.length}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">
                      Total Episodes
                    </div>
                    <div className="text-2xl font-bold">{totalEpisodes}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">
                      File Storage
                    </div>
                    <div className="text-2xl font-bold">238 GB</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">Storage Usage</div>
                    <div className="font-medium">72%</div>
                  </div>
                  <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-[72%] rounded-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/uploads">Manage Storage</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[128px] items-center justify-center">
                  <div className="text-muted-foreground text-center">
                    <CalendarDays className="mx-auto h-12 w-12 opacity-50" />
                    <p className="mt-2">Detailed analytics available</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/admin/analytics">View Analytics</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Content</CardTitle>
                <CardDescription>Top performing content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostViewedContent.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.type === "movie"
                              ? "bg-blue-500/10"
                              : "bg-rose-500/10"
                          }`}
                        >
                          {item.type === "movie" ? (
                            <Film
                              className={`h-4 w-4 ${item.type === "movie" ? "text-blue-500" : "text-rose-500"}`}
                            />
                          ) : (
                            <Tv
                              className={`h-4 w-4 ${item.type === "movie" ? "text-blue-500" : "text-rose-500"}`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-muted-foreground text-xs capitalize">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {item.views.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/admin/analytics">View All Stats</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                        <Users className="text-primary h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          {activity.content && (
                            <span className="font-medium">
                              {activity.content}
                            </span>
                          )}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/admin/logs">View All Activity</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Detailed view of user interactions with your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  Activity panel content will be displayed here
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/admin/logs">Go to Activity Logs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Quick access to your content library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  asChild
                >
                  <Link href="/admin/movies">
                    <Film className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">Movies</div>
                      <div className="text-muted-foreground text-xs">
                        Manage your movie catalog
                      </div>
                    </div>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  asChild
                >
                  <Link href="/admin/series">
                    <Tv className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">TV Series</div>
                      <div className="text-muted-foreground text-xs">
                        Manage your series catalog
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
