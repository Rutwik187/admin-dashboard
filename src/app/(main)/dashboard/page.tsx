"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Package, AlertTriangle, DollarSign, ShoppingCart } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for revenue chart
const revenueData = [
  { date: "2024-10-01", revenue: 4500 },
  { date: "2024-10-02", revenue: 5200 },
  { date: "2024-10-03", revenue: 4800 },
  { date: "2024-10-04", revenue: 6100 },
  { date: "2024-10-05", revenue: 5900 },
  { date: "2024-10-06", revenue: 7200 },
  { date: "2024-10-07", revenue: 6800 },
  { date: "2024-10-08", revenue: 5500 },
  { date: "2024-10-09", revenue: 6300 },
  { date: "2024-10-10", revenue: 5800 },
  { date: "2024-10-11", revenue: 6700 },
  { date: "2024-10-12", revenue: 7500 },
  { date: "2024-10-13", revenue: 8100 },
  { date: "2024-10-14", revenue: 7800 },
];

// Sample data for top selling items
const topItemsData = [
  { name: "Burger Deluxe", sales: 156 },
  { name: "Caesar Salad", sales: 132 },
  { name: "Grilled Salmon", sales: 121 },
  { name: "Margherita Pizza", sales: 98 },
  { name: "Chicken Wings", sales: 87 },
];

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const itemsChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function Page() {
  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Aamchi Mumbai Dashboard</h1>
        <p className="text-muted-foreground">Overview of your bakery operations and key metrics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Today's Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$8,145.00</CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="size-3" />
                +18.2%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Strong sales today <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Compared to yesterday</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Orders Today</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">247</CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="size-3" />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              High order volume <ShoppingCart className="size-4" />
            </div>
            <div className="text-muted-foreground">Peak hours: 12-2 PM</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Low Stock Items</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">12</CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1 border-orange-500/50 text-orange-600 dark:text-orange-400">
                <AlertTriangle className="size-3" />
                Alert
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Reorder needed <Package className="size-4" />
            </div>
            <div className="text-muted-foreground">View stock alerts</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Monthly Expenses</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">₹42,350</CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                <TrendingDown className="size-3" />
                -5.3%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Reduced costs ₹
            </div>
            <div className="text-muted-foreground">Better than last month</div>
          </CardFooter>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
            <CardDescription>Last 14 days of revenue performance</CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer config={revenueChartConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      formatter={(value) => `$${value}`}
                      indicator="dot"
                    />
                  }
                />
                <Area dataKey="revenue" type="natural" fill="url(#fillRevenue)" stroke="var(--color-revenue)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Selling Items */}
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Best performing menu items this week</CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer config={itemsChartConfig} className="aspect-auto h-[250px] w-full">
              <BarChart data={topItemsData} layout="vertical" margin={{ left: 0 }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={120}
                />
                <XAxis type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Package className="size-5" />
              <span>Add Inventory Item</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <ShoppingCart className="size-5" />
              <span>Update Stock</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <DollarSign className="size-5" />
              <span>Record Expense</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <TrendingUp className="size-5" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
