"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Package } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { category: "Meat", consumption: 245 },
  { category: "Vegetables", consumption: 189 },
  { category: "Seafood", consumption: 167 },
  { category: "Dairy", consumption: 156 },
  { category: "Dry Goods", consumption: 142 },
  { category: "Beverages", consumption: 98 },
];

const chartConfig = {
  consumption: {
    label: "Consumption",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function InventoryReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Consumption</CardTitle>
        <CardDescription>Category-wise inventory usage this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 0 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
            />
            <XAxis type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="consumption" fill="var(--color-consumption)" radius={4} />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <Package className="size-4 text-blue-500" />
          <span className="font-medium">Total items consumed: 997 units</span>
        </div>
      </CardContent>
    </Card>
  );
}




