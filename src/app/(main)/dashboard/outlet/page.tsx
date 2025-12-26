"use client";

import { Store, ClipboardCheck, Calendar, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OutletPage() {
  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Outlet Module</h1>
        <p className="text-muted-foreground">
          Manage outlet stock, track sales, and handle returns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="size-5" />
              Opening Stock Audit
            </CardTitle>
            <CardDescription>
              2-minute visual count every morning. System checks against expected stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/outlet/opening-audit">
              <Button className="w-full">Start Audit</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              EOD Sync
            </CardTitle>
            <CardDescription>
              End of Day sync with billing software. Auto-calculates closing stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/outlet/eod-sync">
              <Button className="w-full">Sync Now</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="size-5" />
              Return to Factory
            </CardTitle>
            <CardDescription>
              Scan unsold items back into van. System tracks wastage cost
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/outlet/returns">
              <Button className="w-full">Process Returns</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

