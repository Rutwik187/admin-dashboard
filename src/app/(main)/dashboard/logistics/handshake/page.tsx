"use client";

import { useState } from "react";

import { Handshake, CheckCircle2, Clock, Package, Truck } from "lucide-react";

import { StatusIndicator } from "@/components/inventory/status-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HandshakeRecord {
  id: string;
  vanId: string;
  vanName: string;
  driver: string;
  items: { name: string; quantity: number }[];
  status: "in-transit" | "pending-acceptance" | "accepted" | "rejected";
  dispatchedAt: string;
  acceptedAt?: string;
  outlet: string;
}

const sampleHandshakes: HandshakeRecord[] = [
  {
    id: "1",
    vanId: "van1",
    vanName: "Van 1",
    driver: "Rajesh Kumar",
    items: [
      { name: "Black Forest Cake", quantity: 50 },
      { name: "Chocolate Cake", quantity: 30 },
    ],
    status: "pending-acceptance",
    dispatchedAt: "2024-01-15T10:30:00",
    outlet: "Outlet A",
  },
  {
    id: "2",
    vanId: "van2",
    vanName: "Van 2",
    driver: "Amit Singh",
    items: [
      { name: "Vanilla Cake", quantity: 40 },
      { name: "Red Velvet Cake", quantity: 25 },
    ],
    status: "in-transit",
    dispatchedAt: "2024-01-15T09:00:00",
    outlet: "Outlet B",
  },
  {
    id: "3",
    vanId: "van3",
    vanName: "Van 3",
    driver: "Priya Sharma",
    items: [{ name: "Black Forest Cake", quantity: 20 }],
    status: "accepted",
    dispatchedAt: "2024-01-15T08:00:00",
    acceptedAt: "2024-01-15T11:00:00",
    outlet: "Outlet C",
  },
];

export default function HandshakePage() {
  const [handshakes, setHandshakes] = useState<HandshakeRecord[]>(sampleHandshakes);

  const acceptHandshake = (id: string) => {
    setHandshakes(
      handshakes.map((h) => (h.id === id ? { ...h, status: "accepted", acceptedAt: new Date().toISOString() } : h)),
    );
    // In real app, update stock: In-Transit → Outlet
  };

  const pendingHandshakes = handshakes.filter((h) => h.status === "pending-acceptance");
  const inTransitHandshakes = handshakes.filter((h) => h.status === "in-transit");
  const acceptedHandshakes = handshakes.filter((h) => h.status === "accepted");

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Handshake (Digital Transfer)</h1>
        <p className="text-muted-foreground">Stock moves from Factory → In-Transit → Outlet without manual typing</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Acceptance ({pendingHandshakes.length})</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit ({inTransitHandshakes.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedHandshakes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingHandshakes.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending handshakes</p>
              </CardContent>
            </Card>
          ) : (
            pendingHandshakes.map((handshake) => (
              <Card key={handshake.id} className="border-blue-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="size-5" />
                        {handshake.vanName} - {handshake.outlet}
                      </CardTitle>
                      <CardDescription>Driver: {handshake.driver}</CardDescription>
                    </div>
                    <StatusIndicator status="action-needed" label="Pending" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Items:</p>
                    <div className="space-y-1">
                      {handshake.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Package className="text-muted-foreground size-4" />
                          <span>
                            {item.name} - Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => acceptHandshake(handshake.id)}>
                      Reject
                    </Button>
                    <Button className="flex-1" onClick={() => acceptHandshake(handshake.id)}>
                      <Handshake className="mr-2 size-4" />
                      Accept Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="in-transit" className="space-y-4">
          {inTransitHandshakes.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No items in transit</p>
              </CardContent>
            </Card>
          ) : (
            inTransitHandshakes.map((handshake) => (
              <Card key={handshake.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="size-5" />
                        {handshake.vanName} - {handshake.outlet}
                      </CardTitle>
                      <CardDescription>Driver: {handshake.driver}</CardDescription>
                    </div>
                    <StatusIndicator status="pending" label="In Transit" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="mb-2 text-sm font-medium">Items:</p>
                    <div className="space-y-1">
                      {handshake.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Package className="text-muted-foreground size-4" />
                          <span>
                            {item.name} - Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedHandshakes.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No accepted handshakes</p>
              </CardContent>
            </Card>
          ) : (
            acceptedHandshakes.map((handshake) => (
              <Card key={handshake.id} className="border-green-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="size-5 text-green-600" />
                        {handshake.vanName} - {handshake.outlet}
                      </CardTitle>
                      <CardDescription>
                        Accepted at: {handshake.acceptedAt ? new Date(handshake.acceptedAt).toLocaleString() : "N/A"}
                      </CardDescription>
                    </div>
                    <StatusIndicator status="completed" label="Accepted" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="mb-2 text-sm font-medium">Items (now in outlet stock):</p>
                    <div className="space-y-1">
                      {handshake.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Package className="text-muted-foreground size-4" />
                          <span>
                            {item.name} - Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
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
