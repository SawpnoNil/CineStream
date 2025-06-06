"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Film, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginAdmin } from "@/lib/auth";
import { websiteSettings } from "@/lib/mock/data";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make a request to a protected admin endpoint to check auth
        const res = await fetch("/api/admin/check-auth");
        if (res.ok) {
          // If authenticated, redirect to dashboard
          router.push("/admin/dashboard");
        }
      } catch (err) {
        // If error, user is not authenticated - do nothing and show login form
        console.error("Auth check error:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Execute the async function and handle the promise
    void checkAuth();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await loginAdmin(username, password);

      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black opacity-95" />
        <div className="z-10 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black opacity-95" />

      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Film className="h-10 w-10 text-white" />
            <span className="text-2xl font-bold text-white">
              {websiteSettings.title} Admin
            </span>
          </div>
        </div>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Admin Login
            </CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-500">
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
