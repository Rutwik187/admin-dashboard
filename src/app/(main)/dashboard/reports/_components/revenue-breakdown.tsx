"use client";

import { Cell, Pie, PieChart } from "recharts";
import { DollarSign } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { category: "Dine-in", revenue: 45600, fill: "var(--chart-1)" },
  { category: "Takeout", revenue: 28900, fill: "var(--chart-2)" },
  { category: "Delivery", revenue: 18400, fill: "var(--chart-3)" },
  { category: "Catering", revenue: 12100, fill: "var(--chart-4)" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  dineIn: {
    label: "Dine-in",
    color: "var(--chart-1)",
  },
  takeout: {
    label: "Takeout",
    color: "var(--chart-2)",
  },
  delivery: {
    label: "Delivery",
    color: "var(--chart-3)",
  },
  catering: {
    label: "Catering",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function RevenueBreakdown() {
  const total = chartData.reduce((acc, item) => acc + item.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Source</CardTitle>
        <CardDescription>Revenue distribution across different channels</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="revenue" nameKey="category" innerRadius={60} strokeWidth={5}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span>{item.category}</span>
              </div>
              <span className="font-medium tabular-nums">
                ₹{item.revenue.toLocaleString()} ({((item.revenue / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium">
          <DollarSign className="size-4 text-green-500" />
          <span>Total Revenue: ₹{total.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}






