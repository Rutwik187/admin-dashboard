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
  ShoppingCart,
  ChefHat,
  Truck,
  Store,
  Command,
  FileText,
  Camera,
  WheatIcon,
  PackageCheck,
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
  Star,
  Calendar,
  ShoppingBag,
  Factory,
  Boxes,
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
    label: "Operational Zones",
    items: [
      {
        title: "Order Management",
        url: "/dashboard/orders",
        icon: ShoppingBag,
        subItems: [
          { title: "Create Order", url: "/dashboard/orders/create", icon: ShoppingBag },
          { title: "Production", url: "/dashboard/orders/production", icon: Factory },
          { title: "Packaging", url: "/dashboard/orders/packaging", icon: Boxes },
        ],
      },
      {
        title: "Outlet",
        url: "/dashboard/outlet",
        icon: Store,
        subItems: [
          { title: "Opening Stock Audit", url: "/dashboard/outlet/opening-audit", icon: ClipboardCheck },
          { title: "EOD Sync", url: "/dashboard/outlet/eod-sync", icon: Calendar },
          { title: "Return to Factory", url: "/dashboard/outlet/returns", icon: Package },
        ],
      },
      {
        title: "Procurement",
        url: "/dashboard/procurement",
        icon: ShoppingCart,
        subItems: [
          { title: "Digital Indent", url: "/dashboard/procurement/indent", icon: FileText },
          { title: "Visual GRN", url: "/dashboard/procurement/grn", icon: Camera },
        ],
      },
      {
        title: "Central Kitchen",
        url: "/dashboard/kitchen",
        icon: ChefHat,
        subItems: [
          { title: "Recipe Lockdown", url: "/dashboard/kitchen/recipes", icon: WheatIcon },
          { title: "One-Tap Production", url: "/dashboard/kitchen/production", icon: PackageCheck },
        ],
      },
      {
        title: "Logistics",
        url: "/dashboard/logistics",
        icon: Truck,
        subItems: [
          { title: "Digital Challan", url: "/dashboard/logistics/challan", icon: ClipboardCheck },
          { title: "Handshake", url: "/dashboard/logistics/handshake", icon: PackageCheck },
        ],
      },

      {
        title: "Command Center",
        url: "/dashboard/command-center",
        icon: Command,
        subItems: [
          { title: "Variance Analysis", url: "/dashboard/command-center/variance", icon: TrendingUp },
          { title: "COGS Live", url: "/dashboard/command-center/cogs", icon: BarChart3 },
        ],
      },
   
    ],
  },
  {
    id: 3,
    label: "Inventory & Supply",
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
        subItems: [{ title: "Supplier Rating", url: "/dashboard/suppliers/rating", icon: Star }],
      },
      {
        title: "Products",
        url: "/dashboard/products",
        icon: UtensilsCrossed,
      },
      {
        title: "FEFO Tracking",
        url: "/dashboard/fefo",
        icon: AlertCircle,
      },
      {
        title: "Predictive Indent",
        url: "/dashboard/predictive-indent",
        icon: TrendingUp,
      },
      {
        title: "Stock Alerts",
        url: "/dashboard/stock-alerts",
        icon: PackageSearch,
      },
    ],
  },
  {
    id: 4,
    label: "Reports & Finance",
    items: [
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
    id: 5,
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
