"use client";

import { useState } from "react";

import { Factory, CheckCircle2, Clock, Camera, Image as ImageIcon } from "lucide-react";

import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductionOrder {
  id: string;
  orderNumber: string;
  items: {
    id: string;
    productName: string;
    quantity: number;
    image?: string;
    productionImage?: string;
  }[];
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  completedAt?: string;
}

const sampleOrders: ProductionOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-123456",
    items: [
      {
        id: "1",
        productName: "Black Forest Cake",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      },
      {
        id: "2",
        productName: "Chocolate Eclair",
        quantity: 12,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
      },
    ],
    status: "pending",
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-123457",
    items: [
      {
        id: "1",
        productName: "Vada Pav",
        quantity: 50,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
      },
      {
        id: "2",
        productName: "Samosa",
        quantity: 30,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70987?w=400&h=400&fit=crop",
      },
    ],
    status: "in-progress",
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: "3",
    orderNumber: "ORD-123458",
    items: [
      {
        id: "1",
        productName: "Red Velvet Cake",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
        productionImage: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
      },
    ],
    status: "completed",
    createdAt: "2024-01-15T08:00:00",
    completedAt: "2024-01-15T11:00:00",
  },
];

export default function ProductionPage() {
  const [orders, setOrders] = useState<ProductionOrder[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [productionImages, setProductionImages] = useState<Record<string, Record<string, string>>>({});

  const handleImageUpload = (orderId: string, itemId: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          setProductionImages((prev) => ({
            ...prev,
            [orderId]: {
              ...prev[orderId],
              [itemId]: imageUrl,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const markOrderComplete = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "completed", completedAt: new Date().toISOString() } : order,
      ),
    );
    // In real app, send to packaging department
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const inProgressOrders = orders.filter((o) => o.status === "in-progress");
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Production Department</h1>
        <p className="text-muted-foreground">
          Receive orders, produce items, and mark as completed with production images
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Pending Orders</CardDescription>
            <CardTitle className="text-3xl">{pendingOrders.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-500/50">
          <CardHeader>
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{inProgressOrders.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-green-500/50">
          <CardHeader>
            <CardDescription>Completed Today</CardDescription>
            <CardTitle className="text-3xl text-green-600">{completedOrders.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressOrders.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending orders</p>
              </CardContent>
            </Card>
          ) : (
            pendingOrders.map((order) => (
              <Card key={order.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Factory className="size-5" />
                        Order #{order.orderNumber}
                      </CardTitle>
                      <CardDescription>Created: {new Date(order.createdAt).toLocaleString()}</CardDescription>
                    </div>
                    <StatusIndicator status="action-needed" label="Pending" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 rounded-lg border p-3">
                        {item.image && (
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border">
                            <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "in-progress" } : o)));
                    }}
                    className="w-full"
                  >
                    Start Production
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No orders in progress</p>
              </CardContent>
            </Card>
          ) : (
            inProgressOrders.map((order) => (
              <Card key={order.id} className="border-blue-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Factory className="size-5" />
                        Order #{order.orderNumber}
                      </CardTitle>
                      <CardDescription>Started: {new Date(order.createdAt).toLocaleString()}</CardDescription>
                    </div>
                    <StatusIndicator status="action-needed" label="In Progress" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {order.items.map((item) => {
                      const productionImage = productionImages[order.id]?.[item.id];
                      return (
                        <div key={item.id} className="space-y-3 rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            {item.image && (
                              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border">
                                <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold">{item.productName}</h4>
                              <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="mb-2 block text-sm font-medium">
                              Production Image (Upload photo of completed items)
                            </Label>
                            {productionImage ? (
                              <div className="space-y-2">
                                <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
                                  <img src={productionImage} alt="Production" className="h-full w-full object-cover" />
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleImageUpload(order.id, item.id)}
                                >
                                  <ImageIcon className="mr-2 size-4" />
                                  Change Image
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                onClick={() => handleImageUpload(order.id, item.id)}
                                className="w-full"
                              >
                                <Camera className="mr-2 size-4" />
                                Capture Production Image
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    onClick={() => markOrderComplete(order.id)}
                    className="w-full"
                    size="lg"
                    disabled={!order.items.every((item) => productionImages[order.id]?.[item.id])}
                  >
                    <CheckCircle2 className="mr-2 size-4" />
                    Mark Order as Completed
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No completed orders</p>
              </CardContent>
            </Card>
          ) : (
            completedOrders.map((order) => (
              <Card key={order.id} className="border-green-500/50 bg-green-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="size-5 text-green-600" />
                        Order #{order.orderNumber}
                      </CardTitle>
                      <CardDescription>
                        Completed: {order.completedAt ? new Date(order.completedAt).toLocaleString() : "N/A"}
                      </CardDescription>
                    </div>
                    <StatusIndicator status="completed" label="Completed" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="bg-background flex items-center gap-4 rounded-lg border p-3">
                        {item.productionImage && (
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border">
                            <img
                              src={item.productionImage}
                              alt={item.productName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          Ready for Packaging
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
