"use client";

import { useState } from "react";
import { Plus, Trash2, Edit, Save, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock categories data - would be replaced with real data from your database
const initialCategories = [
  {
    id: "1",
    name: "Movies",
    slug: "movies",
    description: "All movies in the catalog",
    count: 124,
    featured: true,
  },
  {
    id: "2",
    name: "TV Shows",
    slug: "tv-shows",
    description: "All TV series and episodes",
    count: 84,
    featured: true,
  },
  {
    id: "3",
    name: "Documentaries",
    slug: "documentaries",
    description: "Educational documentary content",
    count: 42,
    featured: false,
  },
  {
    id: "4",
    name: "Kids",
    slug: "kids",
    description: "Content suitable for children",
    count: 63,
    featured: true,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Add new category
  const handleAddCategory = () => {
    if (!formData.name.trim()) return;

    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");
    const newCategory = {
      id: (categories.length + 1).toString(),
      name: formData.name,
      slug,
      description: formData.description,
      count: 0,
      featured: formData.featured,
    };

    setCategories([...categories, newCategory]);
    setFormData({ name: "", description: "", featured: false });
    setIsDialogOpen(false);
  };

  // Start editing a category
  const handleStartEdit = (category: (typeof categories)[0]) => {
    setEditingCategory(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      featured: category.featured,
    });
    setIsDialogOpen(true);
  };

  // Save edited category
  const handleSaveEdit = () => {
    if (!formData.name.trim()) return;

    setCategories(
      categories.map((category) => {
        if (category.id === editingCategory) {
          return {
            ...category,
            name: formData.name,
            slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
            description: formData.description,
            featured: formData.featured,
          };
        }
        return category;
      }),
    );

    setEditingCategory(null);
    setFormData({ name: "", description: "", featured: false });
    setIsDialogOpen(false);
  };

  // Delete category
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Reset and open dialog for new category
  const handleNewCategory = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", featured: false });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-950/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>
              Create and manage content categories
            </CardDescription>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewCategory}>
                <Plus className="mr-1 h-4 w-4" /> New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="border-zinc-800 bg-zinc-900 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit Category" : "Create New Category"}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory
                    ? "Update the details for this category"
                    : "Add a new category to organize your content"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Category name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of this category"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Featured category</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingCategory ? handleSaveEdit : handleAddCategory}
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    {category.name}
                    <div className="mt-1 text-xs text-zinc-400">
                      {category.slug}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-zinc-800/30">
                      {category.count} items
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {category.featured ? (
                      <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-zinc-800/30">
                        Regular
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 border-zinc-800 bg-zinc-900">
                        <DropdownMenuItem
                          onClick={() => handleStartEdit(category)}
                          className="flex cursor-pointer items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCategory(category.id)}
                          className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
