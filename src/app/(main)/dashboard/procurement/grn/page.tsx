"use client";

import { useState } from "react";

import { CheckCircle2, Upload, Camera, FileText } from "lucide-react";

import { PhotoValidation } from "@/components/inventory/photo-validation";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { UnitIcon, type UnitType } from "@/components/inventory/unit-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GRNItem {
  id: string;
  name: string;
  expectedQty: number;
  receivedQty: number;
  unit: UnitType;
  expectedImage?: string;
  status: "pending" | "verified" | "completed";
}

const sampleGRNItems: GRNItem[] = [
  {
    id: "1",
    name: "Amul Butter Pack",
    expectedQty: 50,
    receivedQty: 0,
    unit: "package",
    expectedImage: "/api/placeholder/200/200",
    status: "pending",
  },
  {
    id: "2",
    name: "Sugar (1kg bags)",
    expectedQty: 100,
    receivedQty: 0,
    unit: "weight",
    status: "pending",
  },
  {
    id: "3",
    name: "Fresh Milk",
    expectedQty: 200,
    receivedQty: 0,
    unit: "volume",
    status: "pending",
  },
];

export default function VisualGRNPage() {
  const [items, setItems] = useState<GRNItem[]>(sampleGRNItems);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [billPhoto, setBillPhoto] = useState<string | null>(null);

  const currentItem = items[currentItemIndex];

  const handlePhotoVerified = (verified: boolean) => {
    if (verified) {
      const updated = [...items];
      updated[currentItemIndex] = { ...updated[currentItemIndex], status: "verified" };
      setItems(updated);
    }
  };

  const handleQtyChange = (qty: number) => {
    const updated = [...items];
    updated[currentItemIndex] = { ...updated[currentItemIndex], receivedQty: qty };
    setItems(updated);
  };

  const completeItem = () => {
    const updated = [...items];
    updated[currentItemIndex] = { ...updated[currentItemIndex], status: "completed" };
    setItems(updated);

    // Move to next pending item
    const nextPending = updated.findIndex((item, idx) => idx > currentItemIndex && item.status === "pending");
    if (nextPending !== -1) {
      setCurrentItemIndex(nextPending);
    } else {
      // Find first pending
      const firstPending = updated.findIndex((item) => item.status === "pending");
      if (firstPending !== -1) {
        setCurrentItemIndex(firstPending);
      }
    }
  };

  const handleBillUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setBillPhoto(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const allCompleted = items.every((item) => item.status === "completed");
  const completedCount = items.filter((item) => item.status === "completed").length;

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Visual GRN (Goods Receipt Note)</h1>
        <p className="text-muted-foreground">
          Verify physical items against photos. Enter quantity received and upload vendor bill
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Receipt Progress</CardTitle>
          <CardDescription>
            {completedCount} of {items.length} items completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  idx === currentItemIndex ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <UnitIcon type={item.unit} size={20} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <StatusIndicator
                    status={
                      item.status === "completed"
                        ? "completed"
                        : item.status === "verified"
                          ? "action-needed"
                          : "pending"
                    }
                    label={item.status}
                  />
                </div>
                <div className="text-muted-foreground text-sm">
                  Expected: {item.expectedQty} | Received: {item.receivedQty}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Item Verification */}
      {!allCompleted && (
        <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2">
          <PhotoValidation
            expectedImage={currentItem.expectedImage}
            expectedName={currentItem.name}
            onVerified={handlePhotoVerified}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UnitIcon type={currentItem.unit} size={24} />
                {currentItem.name}
              </CardTitle>
              <CardDescription>Enter quantity received</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Expected Quantity</Label>
                <div className="mt-1 text-2xl font-bold">{currentItem.expectedQty}</div>
              </div>
              <div>
                <Label htmlFor="received-qty">Received Quantity</Label>
                <Input
                  id="received-qty"
                  type="number"
                  value={currentItem.receivedQty || ""}
                  onChange={(e) => handleQtyChange(Number(e.target.value))}
                  min={0}
                  className="mt-1 text-lg"
                />
              </div>
              {currentItem.status === "verified" && currentItem.receivedQty > 0 && (
                <Button onClick={completeItem} className="w-full" size="lg">
                  <CheckCircle2 className="mr-2 size-4" />
                  Complete Receipt
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bill Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Vendor Bill
          </CardTitle>
          <CardDescription>Upload photo of vendor's paper bill</CardDescription>
        </CardHeader>
        <CardContent>
          {billPhoto ? (
            <div className="space-y-4">
              <div className="relative aspect-auto w-full max-w-md overflow-hidden rounded-lg border">
                <img src={billPhoto} alt="Vendor Bill" className="h-full w-full object-contain" />
              </div>
              <Button variant="outline" onClick={handleBillUpload}>
                <Upload className="mr-2 size-4" />
                Replace Bill Photo
              </Button>
            </div>
          ) : (
            <Button onClick={handleBillUpload} className="w-full" size="lg">
              <Camera className="mr-2 size-4" />
              Capture Bill Photo
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Complete GRN */}
      {allCompleted && (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="size-5" />
              GRN Completed
            </CardTitle>
            <CardDescription>All items received and verified. Stock updated automatically.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              Update Factory Raw Material Stock
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
