"use client";

import Link from "next/link";

import { ShoppingBag, Factory, Boxes } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">
          Complete order workflow from creation to packaging. No Excel sheets needed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="size-5" />
              Create Order
            </CardTitle>
            <CardDescription>
              Point of contact order creation. Select products and quantities from dropdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/orders/create">
              <Button className="w-full">Create New Order</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="size-5" />
              Production
            </CardTitle>
            <CardDescription>Production department receives orders and marks as completed with images</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/orders/production">
              <Button className="w-full">View Production</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Boxes className="size-5" />
              Packaging
            </CardTitle>
            <CardDescription>Packaging department tracks packaging progress as items are packed</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/orders/packaging">
              <Button className="w-full">View Packaging</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
