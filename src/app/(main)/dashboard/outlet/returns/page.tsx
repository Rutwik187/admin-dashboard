"use client";

import { useState } from "react";

import { Package, ArrowLeft, AlertTriangle, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReturnItem {
  id: string;
  name: string;
  currentStock: number;
  returnQty: number;
  reason: "expired" | "damaged" | "unsold" | "";
  cost: number;
}

const availableItems = [
  { id: "1", name: "Black Forest Cake", currentStock: 3, cost: 150 },
  { id: "2", name: "Chocolate Cake", currentStock: 2, cost: 120 },
  { id: "3", name: "Vanilla Cake", currentStock: 1, cost: 100 },
];

export default function ReturnsPage() {
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [returnQty, setReturnQty] = useState<number>(0);
  const [reason, setReason] = useState<"expired" | "damaged" | "unsold" | "">("");

  const addReturn = () => {
    if (selectedItem && returnQty > 0 && reason) {
      const item = availableItems.find((i) => i.id === selectedItem);
      if (item) {
        setReturns([
          ...returns,
          {
            id: Date.now().toString(),
            name: item.name,
            currentStock: item.currentStock,
            returnQty,
            reason,
            cost: item.cost * returnQty,
          },
        ]);
        setSelectedItem("");
        setReturnQty(0);
        setReason("");
      }
    }
  };

  const removeReturn = (id: string) => {
    setReturns(returns.filter((r) => r.id !== id));
  };

  const processReturns = () => {
    const totalWastage = returns.reduce((sum, item) => sum + item.cost, 0);
    alert(`Returns processed! Total wastage cost: ₹${totalWastage.toFixed(2)}`);
    setReturns([]);
  };

  const totalWastageCost = returns.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Return to Factory</h1>
        <p className="text-muted-foreground">Scan unsold items back into van. System tracks wastage cost</p>
      </div>

      {/* Add Return */}
      <Card>
        <CardHeader>
          <CardTitle>Add Return Item</CardTitle>
          <CardDescription>Select item to return to factory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Item</Label>
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select item..." />
              </SelectTrigger>
              <SelectContent>
                {availableItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} (Stock: {item.currentStock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedItem && (
            <>
              <div>
                <Label>Return Quantity</Label>
                <Input
                  type="number"
                  value={returnQty || ""}
                  onChange={(e) => setReturnQty(Number(e.target.value))}
                  min={1}
                  max={availableItems.find((i) => i.id === selectedItem)?.currentStock || 0}
                />
              </div>
              <div>
                <Label>Reason</Label>
                <Select value={reason} onValueChange={(v) => setReason(v as typeof reason)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                    <SelectItem value="unsold">Unsold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addReturn} className="w-full" disabled={!reason || returnQty === 0}>
                Add to Returns
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Returns List */}
      {returns.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Returns List</CardTitle>
              <CardDescription>Items to be returned to factory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {returns.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Package className="text-muted-foreground size-4" />
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant="outline">{item.reason}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Qty: {item.returnQty} | Cost: ₹{item.cost.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReturn(item.id)}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wastage Summary */}
          <Card className="border-orange-500/50 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="size-5" />
                Wastage Cost Summary
              </CardTitle>
              <CardDescription>Total cost of items being returned</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">₹{totalWastageCost.toFixed(2)}</div>
              <Button onClick={processReturns} className="w-full" size="lg">
                <ArrowLeft className="mr-2 size-4" />
                Process Returns & Scan to Van
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
