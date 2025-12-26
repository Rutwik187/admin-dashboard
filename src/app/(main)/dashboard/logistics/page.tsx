"use client";

import Link from "next/link";

import { Truck, ClipboardCheck, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogisticsPage() {
  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Logistics Module</h1>
        <p className="text-muted-foreground">Manage transit between Factory and Outlets. Stop theft during delivery</p>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="size-5" />
              Digital Challan
            </CardTitle>
            <CardDescription>
              Create manifest by dragging items into van folder. Driver cannot leave until accepted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/logistics/challan">
              <Button className="w-full">Create Challan</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="size-5" />
              Handshake
            </CardTitle>
            <CardDescription>
              Digital transfer confirmation. Stock moves from Factory → In-Transit → Outlet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/logistics/handshake">
              <Button className="w-full">View Handshakes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
