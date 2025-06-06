import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminRootPage() {
  const isAuthenticated = await checkAdminAuth();

  // Redirect based on authentication status
  if (isAuthenticated) {
    redirect("/admin/dashboard");
  } else {
    // Go to the auth login page
    redirect("/admin/auth/login");
  }
}
