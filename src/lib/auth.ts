"use server";

import { cookies } from "next/headers";
import { env } from "@/env";

// Simple .env-based authentication for admin panel
export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("admin_auth_token")?.value;

  if (!authToken) {
    return false;
  }

  try {
    // In a real app, you'd validate the token properly
    // This is a simplified version for demo purposes
    const [username, password] = Buffer.from(authToken, "base64")
      .toString()
      .split(":");

    return username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD;
  } catch (error) {
    console.error("Auth validation error:", error);
    return false;
  }
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<boolean> {
  if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
    const authToken = Buffer.from(`${username}:${password}`).toString("base64");

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_auth_token",
      value: authToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return true;
  }

  return false;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth_token");
}
