import {
  Film,
  Tv,
  Users,
  BarChart,
  Settings,
  Upload,
  Tags,
  Database,
  Activity,
  MessageSquare,
  Search,
  LayoutDashboard,
} from "lucide-react";

export const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
    count: null,
  },
  {
    icon: Film,
    label: "Movies",
    href: "/admin/movies",
    count: null,
  },
  {
    icon: Tv,
    label: "TV Series",
    href: "/admin/series",
    count: null,
  },
  {
    icon: Search,
    label: "TMDB Import",
    href: "/admin/tmdb",
    count: null,
  },
  {
    icon: Upload,
    label: "Uploads",
    href: "/admin/uploads",
    count: null,
  },
  {
    icon: Tags,
    label: "Tags",
    href: "/admin/tags",
    count: null,
  },
  {
    icon: Database,
    label: "Categories",
    href: "/admin/categories",
    count: null,
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/users",
    count: null,
  },
  {
    icon: Activity,
    label: "Logs",
    href: "/admin/logs",
    count: null,
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics",
    count: null,
  },
  {
    icon: MessageSquare,
    label: "Feedback",
    href: "/admin/feedback",
    count: null,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    count: null,
  },
];
