"use client";

import { useState } from "react";

import { Boxes, CheckCircle2, Package, Clock, TrendingUp } from "lucide-react";

import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PackagingOrder {
  id: string;
  orderNumber: string;
  items: {
    id: string;
    productName: string;
    quantity: number;
    packedQuantity: number;
    image?: string;
  }[];
  status: "pending" | "packaging" | "completed";
  createdAt: string;
  completedAt?: string;
}

const samplePackagingOrders: PackagingOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-123458",
    items: [
      {
        id: "1",
        productName: "Red Velvet Cake",
        quantity: 1,
        packedQuantity: 0,
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
      },
    ],
    status: "pending",
    createdAt: "2024-01-15T11:00:00",
  },
  {
    id: "2",
    orderNumber: "ORD-123459",
    items: [
      {
        id: "1",
        productName: "Black Forest Cake",
        quantity: 3,
        packedQuantity: 2,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      },
      {
        id: "2",
        productName: "Chocolate Eclair",
        quantity: 12,
        packedQuantity: 8,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
      },
    ],
    status: "packaging",
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "3",
    orderNumber: "ORD-123460",
    items: [
      {
        id: "1",
        productName: "Vada Pav",
        quantity: 50,
        packedQuantity: 50,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
      },
    ],
    status: "completed",
    createdAt: "2024-01-15T09:00:00",
    completedAt: "2024-01-15T12:00:00",
  },
];

export default function PackagingPage() {
  const [orders, setOrders] = useState<PackagingOrder[]>(samplePackagingOrders);

  const updatePackedQuantity = (orderId: string, itemId: string, delta: number) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.id === itemId) {
                const newPacked = Math.max(0, Math.min(item.quantity, item.packedQuantity + delta));
                return { ...item, packedQuantity: newPacked };
              }
              return item;
            }),
            status: order.status === "pending" ? "packaging" : order.status,
          };
        }
        return order;
      }),
    );
  };

  const checkOrderComplete = (order: PackagingOrder) => {
    return order.items.every((item) => item.packedQuantity === item.quantity);
  };

  const markOrderComplete = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : order,
      ),
    );
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const packagingOrders = orders.filter((o) => o.status === "packaging");
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Packaging Department</h1>
        <p className="text-muted-foreground">
          Track packaging progress as items are packed. Real-time updates as packaging happens
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Pending Packaging</CardDescription>
            <CardTitle className="text-3xl">{pendingOrders.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-blue-500/50">
          <CardHeader>
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{packagingOrders.length}</CardTitle>
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
      <Tabs defaultValue="packaging" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
          <TabsTrigger value="packaging">In Progress ({packagingOrders.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending packaging orders</p>
              </CardContent>
            </Card>
          ) : (
            pendingOrders.map((order) => (
              <Card key={order.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Boxes className="size-5" />
                        Order #{order.orderNumber}
                      </CardTitle>
                      <CardDescription>Received: {new Date(order.createdAt).toLocaleString()}</CardDescription>
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
                          <p className="text-muted-foreground text-sm">
                            Quantity: {item.quantity} | Packed: {item.packedQuantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "packaging" } : o)));
                    }}
                    className="w-full"
                  >
                    Start Packaging
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="packaging" className="space-y-4">
          {packagingOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No orders being packaged</p>
              </CardContent>
            </Card>
          ) : (
            packagingOrders.map((order) => {
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const totalPacked = order.items.reduce((sum, item) => sum + item.packedQuantity, 0);
              const progressPercent = (totalPacked / totalItems) * 100;
              const isComplete = checkOrderComplete(order);

              return (
                <Card key={order.id} className="border-blue-500/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Boxes className="size-5" />
                          Order #{order.orderNumber}
                        </CardTitle>
                        <CardDescription>
                          Packaging in progress - {totalPacked} of {totalItems} items packed
                        </CardDescription>
                      </div>
                      <StatusIndicator status="action-needed" label="Packaging" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-muted-foreground">{Math.round(progressPercent)}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      {order.items.map((item) => {
                        const itemProgress = (item.packedQuantity / item.quantity) * 100;
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
                                <p className="text-muted-foreground text-sm">
                                  Packed: {item.packedQuantity} / {item.quantity}
                                </p>
                                <Progress value={itemProgress} className="mt-2 h-1.5" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updatePackedQuantity(order.id, item.id, -1)}
                                disabled={item.packedQuantity === 0}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center">
                                <span className="text-2xl font-bold">{item.packedQuantity}</span>
                                <span className="text-muted-foreground"> / {item.quantity}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updatePackedQuantity(order.id, item.id, 1)}
                                disabled={item.packedQuantity >= item.quantity}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {isComplete && (
                      <Button onClick={() => markOrderComplete(order.id)} className="w-full" size="lg">
                        <CheckCircle2 className="mr-2 size-4" />
                        Mark Order as Completed
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })
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
                        {item.image && (
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border">
                            <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-muted-foreground text-sm">
                            Packed: {item.packedQuantity} / {item.quantity}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          <Package className="mr-1 size-3" />
                          Ready for Dispatch
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
