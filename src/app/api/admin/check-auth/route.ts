import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const isAuthenticated = await checkAdminAuth();

    if (isAuthenticated) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Authentication check failed" },
      { status: 500 },
    );
  }
}
