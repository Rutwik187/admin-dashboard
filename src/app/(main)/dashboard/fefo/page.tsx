"use client";

import { useState } from "react";
import { AlertCircle, Calendar, Package, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BatchItem {
  id: string;
  name: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  location: string;
  priority: "critical" | "warning" | "ok";
  daysUntilExpiry: number;
}

const sampleBatches: BatchItem[] = [
  {
    id: "1",
    name: "Black Forest Cake",
    batchNumber: "BF-2024-001",
    expiryDate: "2024-01-20",
    quantity: 10,
    location: "Outlet A - Back Shelf",
    priority: "critical",
    daysUntilExpiry: 2,
  },
  {
    id: "2",
    name: "Black Forest Cake",
    batchNumber: "BF-2024-002",
    expiryDate: "2024-01-25",
    quantity: 15,
    location: "Outlet A - Front Shelf",
    priority: "warning",
    daysUntilExpiry: 7,
  },
  {
    id: "3",
    name: "Chocolate Cake",
    batchNumber: "CH-2024-001",
    expiryDate: "2024-01-18",
    quantity: 8,
    location: "Outlet B - Back",
    priority: "critical",
    daysUntilExpiry: 0,
  },
  {
    id: "4",
    name: "Vanilla Cake",
    batchNumber: "VA-2024-001",
    expiryDate: "2024-02-01",
    quantity: 12,
    location: "Outlet C",
    priority: "ok",
    daysUntilExpiry: 14,
  },
];

export default function FEFOPage() {
  const [batches, setBatches] = useState<BatchItem[]>(sampleBatches);

  const criticalBatches = batches.filter((b) => b.priority === "critical");
  const warningBatches = batches.filter((b) => b.priority === "warning");
  const okBatches = batches.filter((b) => b.priority === "ok");

  const markAsSold = (id: string) => {
    setBatches(batches.filter((b) => b.id !== id));
    // In real app, update inventory
  };

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">FEFO Tracking (First Expired, First Out)</h1>
        <p className="text-muted-foreground">
          System tracks expiry of every batch. Alerts staff to sell older items first
        </p>
      </div>

      {/* Alerts */}
      {criticalBatches.length > 0 && (
        <Card className="border-red-500/50 bg-red-500/5 animate-pulse">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="size-5" />
              Critical: {criticalBatches.length} Batch(es) Expiring Soon
            </CardTitle>
            <CardDescription>
              These items must be sold immediately to avoid wastage
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card className="border-red-500/50">
          <CardHeader>
            <CardDescription>Critical (Expiring ≤ 3 days)</CardDescription>
            <CardTitle className="text-3xl text-red-600">{criticalBatches.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-orange-500/50">
          <CardHeader>
            <CardDescription>Warning (Expiring ≤ 7 days)</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{warningBatches.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Safe (&gt; 7 days)</CardDescription>
            <CardTitle className="text-3xl text-green-600">{okBatches.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Batch List */}
      <Tabs defaultValue="critical" className="w-full">
        <TabsList>
          <TabsTrigger value="critical">
            Critical ({criticalBatches.length})
          </TabsTrigger>
          <TabsTrigger value="warning">
            Warning ({warningBatches.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Batches</TabsTrigger>
        </TabsList>

        <TabsContent value="critical" className="space-y-3">
          {criticalBatches.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No critical batches</p>
              </CardContent>
            </Card>
          ) : (
            criticalBatches.map((batch) => (
              <Card key={batch.id} className="border-red-500/50 bg-red-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="size-5" />
                        {batch.name} - {batch.batchNumber}
                      </CardTitle>
                      <CardDescription>{batch.location}</CardDescription>
                    </div>
                    <StatusIndicator status="critical" label={`${batch.daysUntilExpiry} days`} pulse />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{new Date(batch.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{batch.quantity} units</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                      ⚠️ Sell Batch #{batch.batchNumber} first! Expiring in {batch.daysUntilExpiry} day(s)
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsSold(batch.id)}
                    className="w-full"
                  >
                    Mark as Sold
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="warning" className="space-y-3">
          {warningBatches.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No warning batches</p>
              </CardContent>
            </Card>
          ) : (
            warningBatches.map((batch) => (
              <Card key={batch.id} className="border-orange-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="size-5" />
                        {batch.name} - {batch.batchNumber}
                      </CardTitle>
                      <CardDescription>{batch.location}</CardDescription>
                    </div>
                    <StatusIndicator status="action-needed" label={`${batch.daysUntilExpiry} days`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{new Date(batch.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{batch.quantity} units</p>
                    </div>
                  </div>
                  <p className="text-sm text-orange-600">
                    Priority: Sell this batch before newer ones
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-3">
          {batches.map((batch) => (
            <Card key={batch.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="size-5" />
                      {batch.name} - {batch.batchNumber}
                    </CardTitle>
                    <CardDescription>{batch.location}</CardDescription>
                  </div>
                  <StatusIndicator
                    status={
                      batch.priority === "critical"
                        ? "critical"
                        : batch.priority === "warning"
                          ? "action-needed"
                          : "completed"
                    }
                    label={`${batch.daysUntilExpiry} days`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Expiry Date</p>
                    <p className="font-medium">{new Date(batch.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">{batch.quantity} units</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}


