"use client";

import { useState } from "react";
import { Calendar, RefreshCw, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockItem {
  id: string;
  name: string;
  openingStock: number;
  received: number;
  sold: number;
  closingStock: number;
  variance: number;
}

const sampleStock: StockItem[] = [
  { id: "1", name: "Black Forest Cake", openingStock: 6, received: 10, sold: 8, closingStock: 8, variance: 0 },
  { id: "2", name: "Chocolate Cake", openingStock: 4, received: 5, sold: 6, closingStock: 3, variance: 0 },
  { id: "3", name: "Vanilla Cake", openingStock: 5, received: 8, sold: 7, closingStock: 6, variance: 0 },
];

export default function EODSyncPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [stock, setStock] = useState<StockItem[]>(sampleStock);

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate API call to billing software
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Calculate closing stock: Opening + Received - Sold
    setStock(
      stock.map((item) => ({
        ...item,
        closingStock: item.openingStock + item.received - item.sold,
      }))
    );
    
    setIsSyncing(false);
    setIsSynced(true);
  };

  const totalSales = stock.reduce((sum, item) => sum + item.sold, 0);
  const totalWastage = stock.filter((item) => item.closingStock < item.openingStock).length;

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">End of Day (EOD) Sync</h1>
        <p className="text-muted-foreground">
          Pull sales data from billing software. Calculate: Opening Stock + Received - Sold = Closing Stock
        </p>
      </div>

      {/* Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Daily Sync
          </CardTitle>
          <CardDescription>Sync with billing software to update closing stock</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Last Sync</p>
              <p className="text-sm text-muted-foreground">
                {isSynced ? new Date().toLocaleString() : "Not synced today"}
              </p>
            </div>
            {isSynced && <StatusIndicator status="completed" label="Synced" />}
          </div>
          <Button
            onClick={handleSync}
            disabled={isSyncing || isSynced}
            className="w-full"
            size="lg"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 size-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 size-4" />
                Sync with Billing Software
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Items Sold</CardDescription>
            <CardTitle className="text-3xl">{totalSales}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Items with Variance</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{totalWastage}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Sync Status</CardDescription>
            <CardTitle className="text-2xl">
              {isSynced ? (
                <span className="text-green-600">Completed</span>
              ) : (
                <span className="text-muted-foreground">Pending</span>
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Stock Reconciliation */}
      {isSynced && (
        <Card>
          <CardHeader>
            <CardTitle>Stock Reconciliation</CardTitle>
            <CardDescription>Opening Stock + Received - Sold = Closing Stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stock.map((item) => (
                <div key={item.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge variant="outline">Closing: {item.closingStock}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Opening</p>
                      <p className="font-medium">{item.openingStock}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Received</p>
                      <p className="font-medium text-green-600">+{item.received}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sold</p>
                      <p className="font-medium text-red-600">-{item.sold}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Closing</p>
                      <p className="font-medium">{item.closingStock}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


