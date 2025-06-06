"use client";

import { useState } from "react";
import {
  Star,
  MessageCircle,
  Trash2,
  ExternalLink,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock feedback data
const initialFeedback = [
  {
    id: "fb-1",
    userId: "user-123",
    username: "sarah.smith",
    email: "sarah@example.com",
    type: "suggestion",
    title: "Add watchlist sharing",
    message:
      "It would be great if we could share our watchlists with friends or family members. This would make it easier to recommend content to others.",
    contentId: null,
    rating: null,
    status: "pending",
    createdAt: "2023-08-02T14:32:11Z",
    resolved: false,
  },
  {
    id: "fb-2",
    userId: "user-456",
    username: "mike.jones",
    email: "mike@example.com",
    type: "bug",
    title: "Video playback freezes",
    message:
      "When watching movies on my iPad, the video freezes every few minutes. I have a good internet connection and this doesn't happen on other streaming services.",
    contentId: null,
    rating: null,
    status: "in-progress",
    createdAt: "2023-08-01T09:14:22Z",
    resolved: false,
  },
  {
    id: "fb-3",
    userId: "user-789",
    username: "lisa.taylor",
    email: "lisa@example.com",
    type: "review",
    title: "Great movie experience",
    message:
      "Really enjoyed the new action movie additions! The streaming quality was excellent and I loved the recommendation system.",
    contentId: "movie-567",
    rating: 5,
    status: "resolved",
    createdAt: "2023-07-29T18:45:37Z",
    resolved: true,
  },
  {
    id: "fb-4",
    userId: "user-246",
    username: "david.wong",
    email: "david@example.com",
    type: "bug",
    title: "Subtitles not syncing",
    message:
      "I noticed that in several shows the subtitles are out of sync with the audio. This happens consistently across different browsers.",
    contentId: "series-321",
    rating: null,
    status: "pending",
    createdAt: "2023-07-27T11:23:05Z",
    resolved: false,
  },
  {
    id: "fb-5",
    userId: "user-357",
    username: "emma.johnson",
    email: "emma@example.com",
    type: "suggestion",
    title: "Profile customization",
    message:
      "Would love to be able to customize profiles with avatars and color themes. It would make the experience more personal and fun.",
    contentId: null,
    rating: null,
    status: "pending",
    createdAt: "2023-07-25T15:17:42Z",
    resolved: false,
  },
];

// Status badge colors
const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-500",
  "in-progress": "bg-blue-500/10 text-blue-500",
  resolved: "bg-emerald-500/10 text-emerald-500",
};

// Type badge colors
const typeColors: Record<string, string> = {
  suggestion: "bg-purple-500/10 text-purple-500",
  bug: "bg-red-500/10 text-red-500",
  review: "bg-blue-500/10 text-blue-500",
};

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [selectedFeedback, setSelectedFeedback] = useState<
    (typeof initialFeedback)[0] | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");

  // Filter feedback based on selected criteria
  const filteredFeedback = feedback.filter((item) => {
    const matchesType = !filterType || item.type === filterType;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  // Format timestamp for display
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Open feedback details
  const openFeedbackDetails = (item: (typeof initialFeedback)[0]) => {
    setSelectedFeedback(item);
    setIsDetailsOpen(true);
  };

  // Mark feedback as resolved
  const markAsResolved = (id: string) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, status: "resolved", resolved: true } : item,
      ),
    );

    if (selectedFeedback?.id === id) {
      setSelectedFeedback({
        ...selectedFeedback,
        status: "resolved",
        resolved: true,
      });
    }
  };

  // Mark feedback as in-progress
  const markAsInProgress = (id: string) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id
          ? { ...item, status: "in-progress", resolved: false }
          : item,
      ),
    );

    if (selectedFeedback?.id === id) {
      setSelectedFeedback({
        ...selectedFeedback,
        status: "in-progress",
        resolved: false,
      });
    }
  };

  // Delete feedback
  const deleteFeedback = (id: string) => {
    setFeedback(feedback.filter((item) => item.id !== id));

    if (selectedFeedback?.id === id) {
      setIsDetailsOpen(false);
    }
  };

  // Send reply (simulated)
  const sendReply = () => {
    if (!replyText.trim() || !selectedFeedback) return;

    alert(`Reply sent to ${selectedFeedback.email}: "${replyText}"`);
    setReplyText("");
    // In a real app, you'd send this to your API and possibly update the feedback status
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-950/50">
        <CardHeader>
          <CardTitle>User Feedback</CardTitle>
          <CardDescription>
            Manage and respond to user feedback, bug reports, and suggestions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex flex-wrap gap-2 md:flex-nowrap">
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="suggestion">Suggestions</SelectItem>
                <SelectItem value="bug">Bug Reports</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[250px]">Title</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredFeedback.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No feedback found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFeedback.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge className={typeColors[item.type] ?? ""}>
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="p-0 text-left font-medium hover:no-underline"
                          onClick={() => openFeedbackDetails(item)}
                        >
                          {item.title}
                        </Button>
                      </TableCell>
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{formatDate(item.createdAt)}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[item.status] ?? ""}>
                          {item.status === "in-progress"
                            ? "In Progress"
                            : item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openFeedbackDetails(item)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          {!item.resolved && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-emerald-500"
                              onClick={() => markAsResolved(item.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteFeedback(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              {selectedFeedback &&
                `From ${selectedFeedback.username} on ${formatDate(selectedFeedback.createdAt)}`}
            </DialogDescription>
          </DialogHeader>

          {selectedFeedback && (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={typeColors[selectedFeedback.type] ?? ""}>
                      {selectedFeedback.type.charAt(0).toUpperCase() +
                        selectedFeedback.type.slice(1)}
                    </Badge>
                    <Badge
                      className={statusColors[selectedFeedback.status] ?? ""}
                    >
                      {selectedFeedback.status === "in-progress"
                        ? "In Progress"
                        : selectedFeedback.status.charAt(0).toUpperCase() +
                          selectedFeedback.status.slice(1)}
                    </Badge>
                  </div>

                  {selectedFeedback.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < selectedFeedback.rating ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium">
                    {selectedFeedback.title}
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-zinc-300">
                    {selectedFeedback.message}
                  </p>
                </div>

                {selectedFeedback.contentId && (
                  <div className="flex items-center gap-2 rounded-md bg-zinc-800 p-2 text-sm">
                    <ExternalLink className="h-4 w-4 text-zinc-400" />
                    <span>
                      Related content ID: {selectedFeedback.contentId}
                    </span>
                    <Button variant="ghost" size="sm" className="ml-auto h-7">
                      View <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                )}

                <div className="border-t border-zinc-800 pt-4">
                  <label className="mb-2 block text-sm font-medium">
                    Reply to user
                  </label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    className="mb-2"
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter className="flex items-center justify-between sm:justify-between">
                <div className="flex gap-2">
                  {!selectedFeedback.resolved ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10"
                      onClick={() => markAsResolved(selectedFeedback.id)}
                    >
                      <Check className="mr-1 h-4 w-4" /> Mark Resolved
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                      onClick={() => markAsInProgress(selectedFeedback.id)}
                    >
                      <MessageCircle className="mr-1 h-4 w-4" /> Reopen
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={sendReply} disabled={!replyText.trim()}>
                    Send Reply
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
