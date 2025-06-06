"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Shield,
  Calendar,
  UserPlus,
  Ban,
  CheckCircle,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "suspended" | "pending";
  avatarUrl?: string;
  joinedDate: string;
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    avatarUrl: "/avatars/alex.jpg",
    joinedDate: "2023-02-14",
    lastLogin: "2023-09-01",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "user",
    status: "active",
    avatarUrl: "/avatars/maria.jpg",
    joinedDate: "2023-03-22",
    lastLogin: "2023-08-30",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james@example.com",
    role: "moderator",
    status: "active",
    avatarUrl: "/avatars/james.jpg",
    joinedDate: "2023-01-05",
    lastLogin: "2023-09-02",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    status: "suspended",
    avatarUrl: "/avatars/emily.jpg",
    joinedDate: "2023-04-18",
    lastLogin: "2023-07-12",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    status: "pending",
    joinedDate: "2023-08-29",
    lastLogin: "N/A",
  },
  {
    id: "6",
    name: "Sara Miller",
    email: "sara@example.com",
    role: "user",
    status: "active",
    avatarUrl: "/avatars/sara.jpg",
    joinedDate: "2023-06-07",
    lastLogin: "2023-08-25",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === null || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === null || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  function getRoleBadge(role: string) {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-primary text-primary-foreground">Admin</Badge>
        );
      case "moderator":
        return (
          <Badge className="text-primary-foreground bg-blue-600">
            Moderator
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground">
            User
          </Badge>
        );
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="border-green-500 bg-green-500/10 text-green-500"
          >
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge
            variant="outline"
            className="border-red-500 bg-red-500/10 text-red-500"
          >
            Suspended
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 bg-yellow-500/10 text-yellow-500"
          >
            Pending
          </Badge>
        );
      default:
        return null;
    }
  }

  // Handle user actions (in real app, would connect to API)
  const handleUserAction = (action: string, userId: string) => {
    console.log(`Action: ${action}, User ID: ${userId}`);

    // Mock actions with state updates
    if (action === "suspend" || action === "activate") {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: action === "suspend" ? "suspended" : "active",
              }
            : user,
        ),
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button className="hidden sm:flex">
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search users..."
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
                Role
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By Role</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedRole(null)}>
                All Roles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedRole("admin")}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("moderator")}>
                Moderator
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("user")}>
                User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedStatus("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("suspended")}>
                Suspended
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("pending")}>
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Users Table */}
      <div className="border-border rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Joined</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {user.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                      ) : null}
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Calendar className="mr-2 h-3.5 w-3.5" />
                    {user.joinedDate}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="text-muted-foreground text-sm">
                    {user.lastLogin}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" /> Email User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.role !== "admin" && (
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" /> Change Role
                        </DropdownMenuItem>
                      )}
                      {user.status === "active" ? (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleUserAction("suspend", user.id)}
                        >
                          <Ban className="mr-2 h-4 w-4" /> Suspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleUserAction("activate", user.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" /> Activate User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
