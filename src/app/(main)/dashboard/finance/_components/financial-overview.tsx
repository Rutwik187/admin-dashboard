"use client";

import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

const chartData = [
  { month: "Jan", expenses: 42000, revenue: 68000, profit: 26000 },
  { month: "Feb", expenses: 44000, revenue: 72000, profit: 28000 },
  { month: "Mar", expenses: 43000, revenue: 70000, profit: 27000 },
  { month: "Apr", expenses: 45000, revenue: 75000, profit: 30000 },
  { month: "May", expenses: 46000, revenue: 78000, profit: 32000 },
  { month: "Jun", expenses: 48000, revenue: 82000, profit: 34000 },
  { month: "Jul", expenses: 47000, revenue: 80000, profit: 33000 },
  { month: "Aug", expenses: 49000, revenue: 85000, profit: 36000 },
  { month: "Sep", expenses: 48000, revenue: 83000, profit: 35000 },
  { month: "Oct", expenses: 50000, revenue: 88000, profit: 38000 },
  { month: "Nov", expenses: 51000, revenue: 90000, profit: 39000 },
  { month: "Dec", expenses: 52000, revenue: 95000, profit: 43000 },
];

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-3)",
  },
} as ChartConfig;

export function FinancialOverview() {
  const totalRevenue = chartData.reduce((acc, item) => acc + item.revenue, 0);
  const totalExpenses = chartData.reduce((acc, item) => acc + item.expenses, 0);
  const totalProfit = chartData.reduce((acc, item) => acc + item.profit, 0);
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Track your restaurant's revenue, expenses, and profit at a glance.</CardDescription>
        <CardAction>
          <Select defaultValue="last-year">
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col items-start justify-between gap-2 py-5 md:flex-row md:items-stretch md:gap-0">
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border">
              <ArrowDownLeft className="stroke-chart-2 size-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase">Revenue</p>
              <p className="font-medium tabular-nums">{formatCurrency(totalRevenue, { noDecimals: true })}</p>
            </div>
          </div>
          <Separator orientation="vertical" className="!h-auto" />
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border">
              <ArrowUpRight className="stroke-chart-1 size-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase">Expenses</p>
              <p className="font-medium tabular-nums">{formatCurrency(totalExpenses, { noDecimals: true })}</p>
            </div>
          </div>
          <Separator orientation="vertical" className="!h-auto" />
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border">
              <TrendingUp className="stroke-chart-3 size-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase">Profit</p>
              <p className="font-medium tabular-nums">{formatCurrency(totalProfit, { noDecimals: true })}</p>
            </div>
          </div>
        </div>
        <Separator />
        <ChartContainer className="max-h-72 w-full" config={chartConfig}>
          <BarChart margin={{ left: -25, right: 0, top: 25, bottom: 0 }} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value >= 1000 ? value / 1000 + "k" : value}`}
              domain={[0, 100000]}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="expenses" stackId="a" fill={chartConfig.expenses.color} />
            <Bar dataKey="revenue" stackId="a" fill={chartConfig.revenue.color} />
            <Bar dataKey="profit" stackId="a" fill={chartConfig.profit.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
