"use client";

import { useState } from "react";
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock log data - would be replaced with real data from your server
const initialLogs = [
  {
    id: "log_1",
    timestamp: "2023-08-04T15:32:41Z",
    level: "info",
    message: "User login successful",
    source: "auth",
    details: { userId: "user_123", ip: "192.168.1.1" },
  },
  {
    id: "log_2",
    timestamp: "2023-08-04T15:30:22Z",
    level: "warning",
    message: "Failed login attempt",
    source: "auth",
    details: { attemptedUsername: "admin", ip: "203.0.113.1" },
  },
  {
    id: "log_3",
    timestamp: "2023-08-04T15:28:15Z",
    level: "error",
    message: "Database connection failed",
    source: "database",
    details: { error: "Connection timeout", dbHost: "db-main" },
  },
  {
    id: "log_4",
    timestamp: "2023-08-04T15:25:03Z",
    level: "info",
    message: "Movie added to catalog",
    source: "content",
    details: { movieId: "mv_456", title: "The Matrix" },
  },
  {
    id: "log_5",
    timestamp: "2023-08-04T15:22:47Z",
    level: "success",
    message: "Daily backup completed successfully",
    source: "system",
    details: { backupSize: "2.3GB", duration: "00:04:22" },
  },
  {
    id: "log_6",
    timestamp: "2023-08-04T15:20:11Z",
    level: "info",
    message: "Content synchronization started",
    source: "system",
    details: { trigger: "scheduled", items: 245 },
  },
  {
    id: "log_7",
    timestamp: "2023-08-04T15:18:36Z",
    level: "error",
    message: "API request to TMDB failed",
    source: "api",
    details: { endpoint: "/search/movie", statusCode: 429 },
  },
  {
    id: "log_8",
    timestamp: "2023-08-04T15:15:22Z",
    level: "warning",
    message: "High server load detected",
    source: "system",
    details: { cpuUsage: "87%", memoryUsage: "76%" },
  },
];

// Log level to icon mapping
const levelIcons = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  success: <CheckCircle className="h-4 w-4 text-emerald-500" />,
};

// Log level to badge color mapping
const levelColors: Record<string, string> = {
  info: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  warning: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  error: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  success: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
};

export default function LogsPage() {
  const [logs, setLogs] = useState(initialLogs);
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Unique sources for filter dropdown
  const sources = [...new Set(initialLogs.map((log) => log.source))];

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Filter logs based on selected criteria
  const filteredLogs = logs.filter((log) => {
    const matchesLevel = !filterLevel || log.level === filterLevel;
    const matchesSource = !filterSource || log.source === filterSource;
    const matchesSearch =
      !searchQuery ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.details)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesLevel && matchesSource && matchesSearch;
  });

  // Simulate refreshing logs
  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, you would fetch fresh logs from your API here
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Simulate downloading logs
  const handleDownload = () => {
    // In a real app, you would generate and download a log file
    alert("Downloading logs... This would be a real download in production.");
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-950/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>
              View and analyze system activity logs
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw
                className={`mr-1 h-4 w-4 ${isLoading && "animate-spin"}`}
              />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex flex-wrap gap-2 md:flex-nowrap">
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />

            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sources</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source.charAt(0).toUpperCase() + source.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[100px]">Source</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[200px]">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm text-zinc-400">
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge className={levelColors[log.level] ?? ""}>
                        <span className="flex items-center gap-1">
                          {levelIcons[log.level as keyof typeof levelIcons]}
                          {log.level.charAt(0).toUpperCase() +
                            log.level.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.source.charAt(0).toUpperCase() + log.source.slice(1)}
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>
                      <div className="max-h-20 overflow-auto rounded bg-zinc-900 p-2 font-mono text-xs">
                        {JSON.stringify(log.details, null, 2)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No logs found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
