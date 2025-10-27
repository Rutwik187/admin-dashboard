import {
  Package,
  TruckIcon,
  UtensilsCrossed,
  Banknote,
  BarChart3,
  LayoutDashboard,
  PackageSearch,
  Users,
  Settings,
  Fingerprint,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Restaurant Management",
    items: [
      {
        title: "Inventory",
        url: "/dashboard/inventory",
        icon: Package,
      },
      {
        title: "Suppliers",
        url: "/dashboard/suppliers",
        icon: TruckIcon,
      },
      {
        title: "Products",
        url: "/dashboard/products",
        icon: UtensilsCrossed,
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    id: 3,
    label: "System",
    items: [
      {
        title: "Stock Alerts",
        url: "/dashboard/stock-alerts",
        icon: PackageSearch,
      },
      {
        title: "Staff",
        url: "/dashboard/staff",
        icon: Users,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "Authentication",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Login v1", url: "/auth/v1/login", newTab: true },
          { title: "Login v2", url: "/auth/v2/login", newTab: true },
          { title: "Register v1", url: "/auth/v1/register", newTab: true },
          { title: "Register v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
];
