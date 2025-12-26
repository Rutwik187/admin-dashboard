"use client";

import { Command, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommandCenterPage() {
  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
        <p className="text-muted-foreground">
          Owner's dashboard for profitability and control
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              Variance Analysis
            </CardTitle>
            <CardDescription>
              See exactly where money is leaking. Compare wastage across outlets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/command-center/variance">
              <Button className="w-full">View Analysis</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              COGS Live
            </CardTitle>
            <CardDescription>
              Real-time Cost of Goods Sold. Auto-calculates profit margin as market prices change
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/command-center/cogs">
              <Button className="w-full">View COGS</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


