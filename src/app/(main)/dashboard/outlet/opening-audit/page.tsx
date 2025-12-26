"use client";

import { useState } from "react";
import { ClipboardCheck, AlertTriangle, CheckCircle2, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Input } from "@/components/ui/input";

interface AuditItem {
  id: string;
  name: string;
  expectedQty: number;
  countedQty: number;
  variance: number;
  status: "pending" | "variance" | "ok";
}

const sampleItems: AuditItem[] = [
  { id: "1", name: "Black Forest Cake", expectedQty: 6, countedQty: 0, variance: 0, status: "pending" },
  { id: "2", name: "Chocolate Cake", expectedQty: 4, countedQty: 0, variance: 0, status: "pending" },
  { id: "3", name: "Vanilla Cake", expectedQty: 5, countedQty: 0, variance: 0, status: "pending" },
  { id: "4", name: "Red Velvet Cake", expectedQty: 3, countedQty: 0, variance: 0, status: "pending" },
];

export default function OpeningAuditPage() {
  const [items, setItems] = useState<AuditItem[]>(sampleItems);
  const [isCompleted, setIsCompleted] = useState(false);

  const updateCount = (id: string, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.countedQty + delta);
          const variance = newCount - item.expectedQty;
          return {
            ...item,
            countedQty: newCount,
            variance,
            status: variance === 0 ? "ok" : "variance",
          };
        }
        return item;
      })
    );
  };

  const handleComplete = () => {
    const hasVariance = items.some((item) => item.variance !== 0);
    if (hasVariance) {
      const varianceItems = items.filter((item) => item.variance !== 0);
      alert(
        `Variance detected in ${varianceItems.length} items:\n${varianceItems
          .map((item) => `${item.name}: Expected ${item.expectedQty}, Counted ${item.countedQty}`)
          .join("\n")}\n\nIs one missing or damaged?`
      );
    }
    setIsCompleted(true);
  };

  const pendingItems = items.filter((item) => item.countedQty === 0);
  const varianceItems = items.filter((item) => item.variance !== 0);
  const completedItems = items.filter((item) => item.countedQty > 0 && item.variance === 0);

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Opening Stock Audit</h1>
        <p className="text-muted-foreground">
          Walk around with tablet, see items, tap count. System checks against expected stock
        </p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Pending Count</CardDescription>
            <CardTitle className="text-3xl">{pendingItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Variance Detected</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{varianceItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Verified OK</CardDescription>
            <CardTitle className="text-3xl text-green-600">{completedItems.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Audit Items */}
      <Card>
        <CardHeader>
          <CardTitle>Visual Count</CardTitle>
          <CardDescription>Tap +/- to count each item</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 ${
                  item.variance !== 0 ? "border-orange-500/50 bg-orange-500/5" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.variance !== 0 && (
                        <Badge variant="outline" className="border-orange-500 text-orange-600 animate-pulse">
                          Variance: {item.variance > 0 ? "+" : ""}{item.variance}
                        </Badge>
                      )}
                      {item.variance === 0 && item.countedQty > 0 && (
                        <StatusIndicator status="completed" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expected: {item.expectedQty} | Counted: {item.countedQty}
                    </p>
                    {item.variance !== 0 && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-orange-600">
                        <AlertTriangle className="size-4" />
                        <span>
                          {item.variance > 0
                            ? `Extra ${item.variance} item(s) found`
                            : `Missing ${Math.abs(item.variance)} item(s)`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCount(item.id, -1)}
                      disabled={item.countedQty === 0}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <div className="w-16 text-center text-2xl font-bold">{item.countedQty}</div>
                    <Button variant="outline" size="icon" onClick={() => updateCount(item.id, 1)}>
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.every((item) => item.countedQty > 0) && (
            <div className="mt-6">
              <Button onClick={handleComplete} className="w-full" size="lg">
                <CheckCircle2 className="mr-2 size-4" />
                Complete Audit
              </Button>
            </div>
          )}

          {isCompleted && (
            <div className="mt-4 rounded-lg border border-green-500/50 bg-green-500/5 p-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="size-5" />
                <span className="font-medium">Audit completed! Stock updated.</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

