"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface COGSItem {
  id: string;
  name: string;
  currentCost: number;
  previousCost: number;
  profitMargin: number;
  salesPrice: number;
  trend: "up" | "down" | "stable";
}

const cogsData: COGSItem[] = [
  {
    id: "1",
    name: "Black Forest Cake",
    currentCost: 80,
    previousCost: 75,
    profitMargin: 46.7,
    salesPrice: 150,
    trend: "down",
  },
  {
    id: "2",
    name: "Chocolate Cake",
    currentCost: 60,
    previousCost: 65,
    profitMargin: 50,
    salesPrice: 120,
    trend: "up",
  },
  {
    id: "3",
    name: "Vanilla Cake",
    currentCost: 50,
    previousCost: 50,
    profitMargin: 50,
    salesPrice: 100,
    trend: "stable",
  },
];

const priceHistory = [
  { date: "2024-01-01", sugar: 45, flour: 35, milk: 60 },
  { date: "2024-01-08", sugar: 48, flour: 36, milk: 62 },
  { date: "2024-01-15", sugar: 50, flour: 38, milk: 65 },
];

const chartConfig = {
  sugar: { label: "Sugar", color: "hsl(var(--chart-1))" },
  flour: { label: "Flour", color: "hsl(var(--chart-2))" },
  milk: { label: "Milk", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function COGSLivePage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In real app, fetch latest market prices
  };

  const avgMargin = cogsData.reduce((sum, item) => sum + item.profitMargin, 0) / cogsData.length;

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">COGS Live</h1>
            <p className="text-muted-foreground">
              Real-time Cost of Goods Sold. Auto-calculates profit margin as market prices change
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
            <button onClick={handleRefresh} className="p-2 hover:bg-accent rounded-lg">
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Average Profit Margin</CardDescription>
            <CardTitle className="text-3xl">{avgMargin.toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Items Tracked</CardDescription>
            <CardTitle className="text-3xl">{cogsData.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Price Changes Today</CardDescription>
            <CardTitle className="text-3xl">
              {cogsData.filter((item) => item.currentCost !== item.previousCost).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Market Price Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Material Price Trends</CardTitle>
          <CardDescription>Market prices for key ingredients</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={priceHistory}>
              <defs>
                <linearGradient id="fillSugar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sugar)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-sugar)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillFlour" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-flour)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-flour)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMilk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-milk)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-milk)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="sugar"
                type="natural"
                fill="url(#fillSugar)"
                stroke="var(--color-sugar)"
              />
              <Area
                dataKey="flour"
                type="natural"
                fill="url(#fillFlour)"
                stroke="var(--color-flour)"
              />
              <Area
                dataKey="milk"
                type="natural"
                fill="url(#fillMilk)"
                stroke="var(--color-milk)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Product COGS */}
      <Card>
        <CardHeader>
          <CardTitle>Product COGS & Profit Margins</CardTitle>
          <CardDescription>Live calculation for each product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cogsData.map((item) => {
              const costChange = item.currentCost - item.previousCost;
              const costChangePercent = ((costChange / item.previousCost) * 100).toFixed(1);

              return (
                <div key={item.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Sales Price: ₹{item.salesPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.profitMargin > 50
                              ? "outline"
                              : item.profitMargin > 40
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {item.profitMargin.toFixed(1)}% Margin
                        </Badge>
                        {item.trend === "up" && (
                          <TrendingUp className="size-4 text-green-600" />
                        )}
                        {item.trend === "down" && (
                          <TrendingDown className="size-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current COGS</p>
                      <p className="font-medium">₹{item.currentCost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Previous COGS</p>
                      <p className="font-medium">₹{item.previousCost}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Change</p>
                      <p
                        className={`font-medium ${
                          costChange > 0 ? "text-red-600" : costChange < 0 ? "text-green-600" : ""
                        }`}
                      >
                        {costChange > 0 ? "+" : ""}₹{costChange} ({costChangePercent}%)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


