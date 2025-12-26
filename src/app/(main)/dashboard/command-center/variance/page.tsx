"use client";

import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface OutletVariance {
  outlet: string;
  wastage: number;
  wastagePercent: number;
  revenue: number;
  variance: number;
}

const varianceData: OutletVariance[] = [
  { outlet: "Outlet A", wastage: 2.5, wastagePercent: 5, revenue: 50000, variance: -2500 },
  { outlet: "Outlet B", wastage: 3.0, wastagePercent: 6, revenue: 45000, variance: -2700 },
  { outlet: "Outlet C", wastage: 1.8, wastagePercent: 3.6, revenue: 55000, variance: -1980 },
  { outlet: "Outlet D", wastage: 4.2, wastagePercent: 8.4, revenue: 40000, variance: -3360 },
];

const chartConfig = {
  wastage: {
    label: "Wastage %",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function VarianceAnalysisPage() {
  const avgWastage = varianceData.reduce((sum, d) => sum + d.wastagePercent, 0) / varianceData.length;
  const worstOutlet = varianceData.reduce((worst, current) =>
    current.wastagePercent > worst.wastagePercent ? current : worst
  );
  const bestOutlet = varianceData.reduce((best, current) =>
    current.wastagePercent < best.wastagePercent ? current : best
  );

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Variance Analysis</h1>
        <p className="text-muted-foreground">
          Identify where money is leaking. Compare wastage across outlets
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Average Wastage</CardDescription>
            <CardTitle className="text-3xl">{avgWastage.toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-green-500/50">
          <CardHeader>
            <CardDescription>Best Performer</CardDescription>
            <CardTitle className="text-2xl text-green-600">{bestOutlet.outlet}</CardTitle>
            <CardDescription>{bestOutlet.wastagePercent}% wastage</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-red-500/50">
          <CardHeader>
            <CardDescription>Needs Attention</CardDescription>
            <CardTitle className="text-2xl text-red-600">{worstOutlet.outlet}</CardTitle>
            <CardDescription>{worstOutlet.wastagePercent}% wastage</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Wastage Comparison</CardTitle>
          <CardDescription>Wastage percentage by outlet</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={varianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="outlet" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="wastagePercent" fill="var(--color-wastage)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Outlet Details</CardTitle>
          <CardDescription>Detailed variance breakdown by outlet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {varianceData.map((outlet) => (
              <div
                key={outlet.outlet}
                className={`rounded-lg border p-4 ${
                  outlet.wastagePercent > avgWastage
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-green-500/50 bg-green-500/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{outlet.outlet}</h3>
                      {outlet.wastagePercent > avgWastage && (
                        <Badge variant="destructive" className="animate-pulse">
                          Above Average
                        </Badge>
                      )}
                      {outlet.wastagePercent < avgWastage && (
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          Below Average
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Wastage</p>
                        <p className="font-medium">{outlet.wastage}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">₹{outlet.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Variance Cost</p>
                        <p className="font-medium text-red-600">₹{Math.abs(outlet.variance).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {outlet.wastagePercent > avgWastage ? (
                      <TrendingUp className="size-5 text-red-600" />
                    ) : (
                      <TrendingDown className="size-5 text-green-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

