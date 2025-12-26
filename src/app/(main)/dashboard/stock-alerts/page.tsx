"use client";

import { AlertTriangle, Package, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const alertItems = [
  {
    id: 1,
    itemName: "Tomatoes",
    category: "Vegetables",
    currentStock: 12,
    reorderLevel: 15,
    unit: "kg",
    urgency: "medium",
    supplier: "Garden Fresh Supplies",
  },
  {
    id: 2,
    itemName: "Flour",
    category: "Dry Goods",
    currentStock: 8,
    reorderLevel: 25,
    unit: "kg",
    urgency: "high",
    supplier: "Bakery Essentials Ltd.",
  },
  {
    id: 3,
    itemName: "Mozzarella Cheese",
    category: "Dairy",
    currentStock: 0,
    reorderLevel: 15,
    unit: "kg",
    urgency: "critical",
    supplier: "Dairy Delights Inc.",
  },
  {
    id: 4,
    itemName: "Garlic",
    category: "Vegetables",
    currentStock: 5,
    reorderLevel: 8,
    unit: "kg",
    urgency: "medium",
    supplier: "Garden Fresh Supplies",
  },
  {
    id: 5,
    itemName: "Butter",
    category: "Dairy",
    currentStock: 10,
    reorderLevel: 15,
    unit: "kg",
    urgency: "low",
    supplier: "Dairy Delights Inc.",
  },
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    default:
      return "bg-blue-500";
  }
};

const getUrgencyBadge = (urgency: string) => {
  switch (urgency) {
    case "critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "high":
      return <Badge className="border-orange-500/50 text-orange-600 dark:text-orange-400" variant="outline">High</Badge>;
    case "medium":
      return <Badge className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400" variant="outline">Medium</Badge>;
    default:
      return <Badge variant="outline">Low</Badge>;
  }
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Stock Alerts</h1>
          <p className="text-muted-foreground">
            Monitor low inventory items and receive alerts when stock needs replenishment
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 size-4" />
            Refresh
          </Button>
          <Button>
            <Package className="mr-2 size-4" />
            Reorder All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Critical Alerts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-2 rounded-full bg-red-500" />
              <span>Requires immediate action</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>High Priority</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-2 rounded-full bg-orange-500" />
              <span>Reorder within 2 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Medium Priority</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-2 rounded-full bg-yellow-500" />
              <span>Reorder within a week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Low Priority</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-2 rounded-full bg-blue-500" />
              <span>Monitor closely</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Items requiring attention sorted by urgency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className={`size-1 rounded-full ${getUrgencyColor(item.urgency)}`} />
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <AlertTriangle className={`size-6 ${
                    item.urgency === "critical" ? "text-red-500" :
                    item.urgency === "high" ? "text-orange-500" :
                    item.urgency === "medium" ? "text-yellow-500" :
                    "text-blue-500"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{item.itemName}</h4>
                    {getUrgencyBadge(item.urgency)}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {item.category} • Supplier: {item.supplier}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold tabular-nums">
                    {item.currentStock} {item.unit}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Reorder at: {item.reorderLevel} {item.unit}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>Configure how and when you receive stock alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-muted-foreground text-sm">Receive alerts via email</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Critical Alert Threshold</h4>
                <p className="text-muted-foreground text-sm">Set when items become critical</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-Reorder</h4>
                <p className="text-muted-foreground text-sm">Automatically create purchase orders</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}






