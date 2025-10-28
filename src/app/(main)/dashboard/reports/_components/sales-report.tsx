"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { date: "Oct 1", sales: 4200 },
  { date: "Oct 2", sales: 3800 },
  { date: "Oct 3", sales: 4500 },
  { date: "Oct 4", sales: 5100 },
  { date: "Oct 5", sales: 4900 },
  { date: "Oct 6", sales: 6200 },
  { date: "Oct 7", sales: 5800 },
  { date: "Oct 8", sales: 5200 },
  { date: "Oct 9", sales: 5600 },
  { date: "Oct 10", sales: 6100 },
  { date: "Oct 11", sales: 6500 },
  { date: "Oct 12", sales: 7200 },
  { date: "Oct 13", sales: 7800 },
  { date: "Oct 14", sales: 7400 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SalesReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Report</CardTitle>
        <CardDescription>Daily sales performance over the last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value >= 1000 ? value / 1000 + "k" : value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="sales" type="natural" fill="url(#fillSales)" stroke="var(--color-sales)" />
          </AreaChart>
        </ChartContainer>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <TrendingUp className="size-4 text-green-500" />
          <span className="font-medium">Average daily sales: $5,871</span>
        </div>
      </CardContent>
    </Card>
  );
}





