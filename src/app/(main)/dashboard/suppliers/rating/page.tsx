"use client";

import { Star, Clock, DollarSign, CheckCircle2, XCircle, TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SupplierRating {
  id: string;
  name: string;
  overallRating: number;
  priceRating: number;
  reliabilityRating: number;
  qualityRating: number;
  onTimeDelivery: number; // percentage
  lateDeliveries: number;
  totalOrders: number;
  avgPrice: number;
  recommendation: "preferred" | "good" | "acceptable" | "poor";
}

const supplierRatings: SupplierRating[] = [
  {
    id: "1",
    name: "Vendor A",
    overallRating: 3.2,
    priceRating: 4.5,
    reliabilityRating: 2.0,
    qualityRating: 3.5,
    onTimeDelivery: 60,
    lateDeliveries: 8,
    totalOrders: 20,
    avgPrice: 450,
    recommendation: "acceptable",
  },
  {
    id: "2",
    name: "Vendor B",
    overallRating: 4.5,
    priceRating: 3.0,
    reliabilityRating: 5.0,
    qualityRating: 4.5,
    onTimeDelivery: 100,
    lateDeliveries: 0,
    totalOrders: 25,
    avgPrice: 550,
    recommendation: "preferred",
  },
  {
    id: "3",
    name: "Vendor C",
    overallRating: 2.8,
    priceRating: 2.5,
    reliabilityRating: 3.0,
    qualityRating: 2.5,
    onTimeDelivery: 70,
    lateDeliveries: 6,
    totalOrders: 15,
    avgPrice: 500,
    recommendation: "poor",
  },
];

export default function SupplierRatingPage() {
  const preferredSuppliers = supplierRatings.filter((s) => s.recommendation === "preferred");
  const poorSuppliers = supplierRatings.filter((s) => s.recommendation === "poor");

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case "preferred":
        return <Badge className="bg-green-500 text-white">Preferred</Badge>;
      case "good":
        return <Badge className="bg-blue-500 text-white">Good</Badge>;
      case "acceptable":
        return <Badge variant="outline">Acceptable</Badge>;
      case "poor":
        return <Badge variant="destructive">Poor</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Supplier Rating System</h1>
        <p className="text-muted-foreground">
          Track vendor reliability. See which vendor is cheaper vs. always on time
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Preferred Suppliers</CardDescription>
            <CardTitle className="text-3xl text-green-600">{preferredSuppliers.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Suppliers</CardDescription>
            <CardTitle className="text-3xl">{supplierRatings.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Suppliers Needing Attention</CardDescription>
            <CardTitle className="text-3xl text-red-600">{poorSuppliers.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Supplier Ratings */}
      <div className="space-y-4">
        {supplierRatings.map((supplier) => (
          <Card
            key={supplier.id}
            className={
              supplier.recommendation === "preferred"
                ? "border-green-500/50 bg-green-500/5"
                : supplier.recommendation === "poor"
                  ? "border-red-500/50 bg-red-500/5"
                  : ""
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {supplier.name}
                    {getRecommendationBadge(supplier.recommendation)}
                  </CardTitle>
                  <CardDescription>
                    {supplier.totalOrders} total orders | Avg Price: ₹{supplier.avgPrice}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getRatingColor(supplier.overallRating)}`}>
                    {supplier.overallRating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(supplier.overallRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Insight */}
              <div className="bg-background rounded-lg border p-3">
                <p className="text-sm">
                  {supplier.name} is{" "}
                  {supplier.priceRating > supplier.reliabilityRating ? (
                    <>
                      <span className="font-medium text-green-600">cheaper</span>, but is late{" "}
                      <span className="font-medium text-red-600">
                        {((supplier.lateDeliveries / supplier.totalOrders) * 100).toFixed(0)}%
                      </span>{" "}
                      of the time.
                    </>
                  ) : (
                    <>
                      <span className="font-medium text-green-600">expensive</span>, but{" "}
                      <span className="font-medium text-green-600">always on time</span>.
                    </>
                  )}
                </p>
              </div>

              {/* Rating Breakdown */}
              <div className="grid grid-cols-1 gap-3 @md:grid-cols-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <DollarSign className="size-4" />
                      Price
                    </span>
                    <span className={`text-sm font-bold ${getRatingColor(supplier.priceRating)}`}>
                      {supplier.priceRating.toFixed(1)}
                    </span>
                  </div>
                  <Progress value={(supplier.priceRating / 5) * 100} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="size-4" />
                      Reliability
                    </span>
                    <span className={`text-sm font-bold ${getRatingColor(supplier.reliabilityRating)}`}>
                      {supplier.reliabilityRating.toFixed(1)}
                    </span>
                  </div>
                  <Progress value={(supplier.reliabilityRating / 5) * 100} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <CheckCircle2 className="size-4" />
                      Quality
                    </span>
                    <span className={`text-sm font-bold ${getRatingColor(supplier.qualityRating)}`}>
                      {supplier.qualityRating.toFixed(1)}
                    </span>
                  </div>
                  <Progress value={(supplier.qualityRating / 5) * 100} className="h-2" />
                </div>
              </div>

              {/* Delivery Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">On-Time Delivery</p>
                  <div className="flex items-center gap-2">
                    <Progress value={supplier.onTimeDelivery} className="h-2 flex-1" />
                    <span className="font-medium">{supplier.onTimeDelivery}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Late Deliveries</p>
                  <p className="font-medium text-red-600">{supplier.lateDeliveries} orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
