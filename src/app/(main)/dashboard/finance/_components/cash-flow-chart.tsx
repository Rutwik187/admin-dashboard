"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

const chartData = [
  { week: "Week 1", cashFlow: 12500 },
  { week: "Week 2", cashFlow: 15800 },
  { week: "Week 3", cashFlow: 11200 },
  { week: "Week 4", cashFlow: 18900 },
];

const chartConfig = {
  cashFlow: {
    label: "Cash Flow",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CashFlowChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Trend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <ChartContainer config={chartConfig} className="h-32 w-full">
          <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillCashFlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cashFlow)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-cashFlow)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="cashFlow" type="natural" fill="url(#fillCashFlow)" stroke="var(--color-cashFlow)" />
          </AreaChart>
        </ChartContainer>
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Average Weekly</span>
            <span className="font-medium tabular-nums">$14,600</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Best Week</span>
            <span className="font-medium tabular-nums">$18,900</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trend</span>
            <span className="font-medium text-green-500">Positive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}





