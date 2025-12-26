"use client";

import { useState } from "react";
import { AlertTriangle, Send, Package, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { UnitIcon, type UnitType } from "@/components/inventory/unit-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IndentItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  required: number;
  unit: UnitType;
  status: "low" | "critical" | "ok";
}

const sampleItems: IndentItem[] = [
  {
    id: "1",
    name: "Sugar",
    currentStock: 50,
    minStock: 200,
    required: 500,
    unit: "weight",
    status: "critical",
  },
  {
    id: "2",
    name: "Milk",
    currentStock: 100,
    minStock: 300,
    required: 200,
    unit: "volume",
    status: "low",
  },
  {
    id: "3",
    name: "Flour",
    currentStock: 150,
    minStock: 200,
    required: 300,
    unit: "weight",
    status: "low",
  },
  {
    id: "4",
    name: "Butter",
    currentStock: 20,
    minStock: 50,
    required: 100,
    unit: "package",
    status: "critical",
  },
];

export default function DigitalIndentPage() {
  const [items, setItems] = useState<IndentItem[]>(sampleItems);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const sendIndent = () => {
    const selected = items.filter((item) => selectedItems.has(item.id));
    console.log("Sending indent:", selected);
    // In real app, send to vendors via WhatsApp/Email
    alert(`Indent sent for ${selected.length} items to approved vendors!`);
  };

  const criticalItems = items.filter((item) => item.status === "critical");
  const lowStockItems = items.filter((item) => item.status === "low");

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Digital Indent</h1>
        <p className="text-muted-foreground">
          Tap "Low Stock" icon to generate consolidated requirements. Auto-sends to approved vendors
        </p>
      </div>

      {/* Alerts */}
      {criticalItems.length > 0 && (
        <Card className="border-red-500/50 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="size-5" />
              Critical Stock Alert
            </CardTitle>
            <CardDescription>
              {criticalItems.length} items are critically low and need immediate attention
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Critical Items</CardDescription>
            <CardTitle className="text-3xl">{criticalItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Low Stock Items</CardDescription>
            <CardTitle className="text-3xl">{lowStockItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Selected for Indent</CardDescription>
            <CardTitle className="text-3xl">{selectedItems.size}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Requirements</CardTitle>
          <CardDescription>Select items to include in the indent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => {
              const isSelected = selectedItems.has(item.id);
              const isLow = item.currentStock < item.minStock;

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                    isSelected ? "border-primary bg-primary/5" : ""
                  } ${isLow ? "border-orange-500/50 bg-orange-500/5" : ""}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleItem(item.id)}
                      className="size-5 rounded border-gray-300"
                    />
                    <div className="flex items-center gap-2">
                      <UnitIcon type={item.unit} size={24} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          {item.status === "critical" && (
                            <Badge variant="destructive" className="animate-pulse">
                              Critical
                            </Badge>
                          )}
                          {item.status === "low" && (
                            <Badge variant="outline" className="border-orange-500 text-orange-600">
                              Low
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Current: {item.currentStock} | Min: {item.minStock} | Required: {item.required}
                        </p>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`qty-${item.id}`} className="text-sm">
                        Qty:
                      </Label>
                      <Input
                        id={`qty-${item.id}`}
                        type="number"
                        defaultValue={item.required}
                        className="w-24"
                        min={1}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedItems.size > 0 && (
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedItems(new Set())}>
                Clear Selection
              </Button>
              <Button onClick={sendIndent} className="gap-2">
                <Send className="size-4" />
                Send Indent to Vendors
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

