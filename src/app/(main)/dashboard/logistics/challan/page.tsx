"use client";

import { useState } from "react";
import { Truck, Package, CheckCircle2, X, GripVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StockItem {
  id: string;
  name: string;
  quantity: number;
  location: "factory" | "van" | null;
}

const availableItems: StockItem[] = [
  { id: "1", name: "Black Forest Cake", quantity: 50, location: "factory" },
  { id: "2", name: "Chocolate Cake", quantity: 30, location: "factory" },
  { id: "3", name: "Vanilla Cake", quantity: 40, location: "factory" },
  { id: "4", name: "Red Velvet Cake", quantity: 25, location: "factory" },
];

const availableVans = [
  { id: "van1", name: "Van 1", driver: "Rajesh Kumar" },
  { id: "van2", name: "Van 2", driver: "Amit Singh" },
  { id: "van3", name: "Van 3", driver: "Priya Sharma" },
];

export default function DigitalChallanPage() {
  const [items, setItems] = useState<StockItem[]>(availableItems);
  const [selectedVan, setSelectedVan] = useState<string>("");
  const [vanItems, setVanItems] = useState<StockItem[]>([]);
  const [isDispatched, setIsDispatched] = useState(false);

  const factoryItems = items.filter((item) => item.location === "factory");
  const currentVan = availableVans.find((v) => v.id === selectedVan);

  const moveToVan = (itemId: string) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, location: "van" } : item)));
    const item = items.find((i) => i.id === itemId);
    if (item) {
      setVanItems([...vanItems, { ...item, location: "van" }]);
    }
  };

  const removeFromVan = (itemId: string) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, location: "factory" } : item)));
    setVanItems(vanItems.filter((item) => item.id !== itemId));
  };

  const dispatch = () => {
    if (selectedVan && vanItems.length > 0) {
      setIsDispatched(true);
      // In real app, update stock status to "in-transit"
      console.log("Dispatched to", currentVan?.name);
    }
  };

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Digital Challan (Manifest)</h1>
        <p className="text-muted-foreground">
          Drag items into van folder. Driver cannot leave until Outlet Manager accepts
        </p>
      </div>

      {/* Van Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="size-5" />
            Select Van
          </CardTitle>
          <CardDescription>Choose the delivery vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedVan} onValueChange={setSelectedVan}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a van..." />
            </SelectTrigger>
            <SelectContent>
              {availableVans.map((van) => (
                <SelectItem key={van.id} value={van.id}>
                  {van.name} - {van.driver}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedVan && (
        <>
          {/* Factory Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Factory Stock Available</CardTitle>
              <CardDescription>Click items to add to van</CardDescription>
            </CardHeader>
            <CardContent>
              {factoryItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No items available</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @lg:grid-cols-3">
                  {factoryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => moveToVan(item.id)}
                      className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="size-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Van Contents */}
          <Card className={vanItems.length > 0 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="size-5" />
                {currentVan?.name} Contents
              </CardTitle>
              <CardDescription>
                Items loaded in van. Driver: {currentVan?.driver}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {vanItems.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Package className="size-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No items in van yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click items above to add them
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vanItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-4 bg-accent/50"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="size-5 text-muted-foreground" />
                        <Package className="size-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromVan(item.id)}
                        className="text-destructive"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dispatch */}
          {vanItems.length > 0 && !isDispatched && (
            <Card>
              <CardHeader>
                <CardTitle>Dispatch Van</CardTitle>
                <CardDescription>
                  Once dispatched, driver cannot leave until Outlet Manager accepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4 space-y-2">
                    <p className="font-medium">Summary:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Van: {currentVan?.name}</li>
                      <li>Driver: {currentVan?.driver}</li>
                      <li>Items: {vanItems.length}</li>
                      <li>Total Quantity: {vanItems.reduce((sum, item) => sum + item.quantity, 0)}</li>
                    </ul>
                  </div>
                  <Button onClick={dispatch} className="w-full" size="lg">
                    <CheckCircle2 className="mr-2 size-4" />
                    Dispatch Van
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isDispatched && (
            <Card className="border-green-500/50 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="size-5" />
                  Van Dispatched
                </CardTitle>
                <CardDescription>
                  Stock status updated to "In-Transit". Waiting for Outlet Manager acceptance.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </>
      )}
    </div>
  );
}


