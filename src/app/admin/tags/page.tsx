"use client";

import { useState } from "react";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

// Mock tags data - would be replaced with real data from your database
const initialTags = [
  { id: "1", name: "Action", slug: "action", count: 24 },
  { id: "2", name: "Comedy", slug: "comedy", count: 18 },
  { id: "3", name: "Drama", slug: "drama", count: 31 },
  { id: "4", name: "Horror", slug: "horror", count: 12 },
  { id: "5", name: "Sci-Fi", slug: "sci-fi", count: 16 },
  { id: "6", name: "Thriller", slug: "thriller", count: 9 },
];

export default function TagsPage() {
  const [tags, setTags] = useState(initialTags);
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Add new tag
  const handleAddTag = () => {
    if (!newTag.trim()) return;

    const slug = newTag.toLowerCase().replace(/\s+/g, "-");
    const newTagObj = {
      id: (tags.length + 1).toString(),
      name: newTag,
      slug,
      count: 0,
    };

    setTags([...tags, newTagObj]);
    setNewTag("");
  };

  // Start editing a tag
  const handleStartEdit = (tag: (typeof tags)[0]) => {
    setEditingTag(tag.id);
    setEditValue(tag.name);
  };

  // Save edited tag
  const handleSaveEdit = (id: string) => {
    if (!editValue.trim()) return;

    setTags(
      tags.map((tag) => {
        if (tag.id === id) {
          return {
            ...tag,
            name: editValue,
            slug: editValue.toLowerCase().replace(/\s+/g, "-"),
          };
        }
        return tag;
      }),
    );

    setEditingTag(null);
  };

  // Delete tag
  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
    if (editingTag === id) setEditingTag(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-950/50">
        <CardHeader>
          <CardTitle>Tag Management</CardTitle>
          <CardDescription>
            Create and manage tags for categorizing content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <Input
              placeholder="New tag name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={handleAddTag} size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add Tag
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Content Count</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    {editingTag === tag.id ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="max-w-[200px]"
                      />
                    ) : (
                      tag.name
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-zinc-800/30">
                      {tag.slug}
                    </Badge>
                  </TableCell>
                  <TableCell>{tag.count}</TableCell>
                  <TableCell className="space-x-1">
                    {editingTag === tag.id ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleSaveEdit(tag.id)}
                          className="h-8 w-8"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingTag(null)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleStartEdit(tag)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteTag(tag.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
