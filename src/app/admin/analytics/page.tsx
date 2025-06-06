"use client";

import { useState } from "react";
import {
  BarChart as ChartIcon,
  LineChart,
  PieChart,
  RefreshCw,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock analytics data components
// In a real app, you would use a charting library like recharts, chart.js, or d3.js

// Mock chart component for users
const UserChart = () => (
  <div className="space-y-4">
    <div className="rounded-lg bg-zinc-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">User Growth</h3>
        <span className="text-xs text-emerald-500">+12% from last month</span>
      </div>
      <div className="h-64 w-full rounded-md bg-zinc-800 p-4">
        <div className="flex h-full items-end justify-between gap-2">
          {[30, 45, 25, 60, 75, 35, 80, 65, 45, 70, 85, 90].map((value, i) => (
            <div key={i} className="relative h-full w-full">
              <div
                className="bg-primary absolute bottom-0 w-full rounded-sm transition-all"
                style={{ height: `${value}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-zinc-400">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Total Users</p>
        <p className="text-2xl font-semibold">12,486</p>
        <div className="mt-2 text-xs text-emerald-500">
          +2.5% from last week
        </div>
      </div>

      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Active Users</p>
        <p className="text-2xl font-semibold">8,241</p>
        <div className="mt-2 text-xs text-emerald-500">
          +3.2% from last week
        </div>
      </div>

      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">New Signups</p>
        <p className="text-2xl font-semibold">267</p>
        <div className="mt-2 text-xs text-amber-500">-1.4% from last week</div>
      </div>
    </div>
  </div>
);

// Mock chart component for content
const ContentChart = () => (
  <div className="space-y-4">
    <div className="rounded-lg bg-zinc-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">Most Watched Content</h3>
        <span className="text-xs text-zinc-400">Last 30 days</span>
      </div>
      <div className="h-64 w-full rounded-md bg-zinc-800 p-4">
        <div className="grid h-full grid-cols-2 gap-4">
          <div className="space-y-3">
            {["Action", "Comedy", "Drama", "Sci-Fi", "Horror"].map(
              (genre, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-sm"
                    style={{
                      width: `${80 - i * 12}%`,
                      backgroundColor: `hsl(${120 + i * 45}, 70%, 60%)`,
                    }}
                  ></div>
                  <span className="text-xs">{genre}</span>
                </div>
              ),
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-40 w-40 rounded-full border-8 border-zinc-700">
              <div
                className="border-primary absolute inset-0 rounded-full border-8"
                style={{
                  clipPath:
                    "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 35% 0%)",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Total Views</p>
        <p className="text-2xl font-semibold">547,392</p>
        <div className="mt-2 text-xs text-emerald-500">
          +18.3% from last month
        </div>
      </div>

      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Average Session</p>
        <p className="text-2xl font-semibold">24m 18s</p>
        <div className="mt-2 text-xs text-emerald-500">
          +2.7% from last month
        </div>
      </div>

      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Content Count</p>
        <p className="text-2xl font-semibold">2,846</p>
        <div className="mt-2 text-xs text-emerald-500">+124 new items</div>
      </div>
    </div>
  </div>
);

// Mock chart component for revenue
const RevenueChart = () => (
  <div className="space-y-4">
    <div className="rounded-lg bg-zinc-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">Revenue Trends</h3>
        <span className="text-xs text-emerald-500">+8% from last quarter</span>
      </div>
      <div className="h-64 w-full rounded-md bg-zinc-800 p-4">
        <div className="flex h-full flex-col justify-between">
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="h-px w-full bg-zinc-700"></div>
            ))}
          </div>

          <div className="relative h-full py-4">
            <svg className="h-full w-full">
              <path
                d="M0,120 C20,100 40,110 60,80 C80,50 100,30 120,40 C140,50 160,120 180,100 C200,80 220,70 240,60 C260,50 280,40 300,30 C320,20 340,10 360,20"
                fill="none"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="flex justify-between text-xs text-zinc-400">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Total Revenue</p>
        <p className="text-2xl font-semibold">$142,384</p>
        <div className="mt-2 text-xs text-emerald-500">
          +12.3% from last year
        </div>
      </div>

      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Avg. Subscription</p>
        <p className="text-2xl font-semibold">$14.99</p>
        <div className="mt-2 text-xs">No change</div>
      </div>

      <div className="rounded-lg bg-zinc-900 p-4">
        <p className="text-xs text-zinc-400">Recurring Revenue</p>
        <p className="text-2xl font-semibold">$11,642</p>
        <div className="mt-2 text-xs text-emerald-500">
          +3.7% from last month
        </div>
      </div>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, you would fetch fresh analytics from your API
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading && "animate-spin"}`}
            />
            Refresh Data
          </Button>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-950/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Total Users</CardTitle>
              <ChartIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">12,486</div>
            <div className="flex items-center text-xs text-emerald-500">
              <span className="inline-block">+8.2%</span>
              <span className="ml-1 text-zinc-400">from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Total Views</CardTitle>
              <LineChart className="h-4 w-4 text-zinc-400" />
            </div>
            <CardDescription>Content views</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">547,392</div>
            <div className="flex items-center text-xs text-emerald-500">
              <span className="inline-block">+12.4%</span>
              <span className="ml-1 text-zinc-400">from previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Revenue</CardTitle>
              <PieChart className="h-4 w-4 text-zinc-400" />
            </div>
            <CardDescription>Total platform revenue</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold">$142,384</div>
            <div className="flex items-center text-xs text-emerald-500">
              <span className="inline-block">+5.3%</span>
              <span className="ml-1 text-zinc-400">from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-950/50">
        <CardHeader className="pb-0">
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>
            Monitor platform performance across key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="mt-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <TabsContent value="users">
                <UserChart />
              </TabsContent>

              <TabsContent value="content">
                <ContentChart />
              </TabsContent>

              <TabsContent value="revenue">
                <RevenueChart />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
