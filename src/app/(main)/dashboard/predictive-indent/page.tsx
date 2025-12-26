"use client";

import { TrendingUp, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/inventory/status-indicator";
import { UnitIcon, type UnitType } from "@/components/inventory/unit-icons";

interface ForecastItem {
  id: string;
  name: string;
  currentStock: number;
  forecastedDemand: number;
  daysUntilShortage: number;
  recommendation: "start-now" | "prepare" | "ok";
  unit: UnitType;
}

const forecastData: ForecastItem[] = [
  {
    id: "1",
    name: "Puffs",
    currentStock: 100,
    forecastedDemand: 300,
    daysUntilShortage: 2,
    recommendation: "start-now",
    unit: "count",
  },
  {
    id: "2",
    name: "Black Forest Cake",
    currentStock: 50,
    forecastedDemand: 150,
    daysUntilShortage: 3,
    recommendation: "start-now",
    unit: "count",
  },
  {
    id: "3",
    name: "Chocolate Cake",
    currentStock: 80,
    forecastedDemand: 120,
    daysUntilShortage: 5,
    recommendation: "prepare",
    unit: "count",
  },
  {
    id: "4",
    name: "Sugar",
    currentStock: 200,
    forecastedDemand: 250,
    daysUntilShortage: 7,
    recommendation: "prepare",
    unit: "weight",
  },
];

export default function PredictiveIndentPage() {
  const urgentItems = forecastData.filter((item) => item.recommendation === "start-now");
  const prepareItems = forecastData.filter((item) => item.recommendation === "prepare");

  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Predictive Indent (Smart Ordering)</h1>
        <p className="text-muted-foreground">
          System learns sales patterns and alerts when to start production or order supplies
        </p>
      </div>

      {/* Urgent Alerts */}
      {urgentItems.length > 0 && (
        <Card className="border-red-500/50 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="size-5" />
              Urgent: Start Production Now
            </CardTitle>
            <CardDescription>
              {urgentItems.length} item(s) will run out soon based on forecast
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3">
        <Card className="border-red-500/50">
          <CardHeader>
            <CardDescription>Urgent Actions</CardDescription>
            <CardTitle className="text-3xl text-red-600">{urgentItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-orange-500/50">
          <CardHeader>
            <CardDescription>Prepare Soon</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{prepareItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Items Tracked</CardDescription>
            <CardTitle className="text-3xl">{forecastData.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Forecast Details */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Forecast & Recommendations</CardTitle>
          <CardDescription>Based on historical sales patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastData.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 ${
                  item.recommendation === "start-now"
                    ? "border-red-500/50 bg-red-500/5"
                    : item.recommendation === "prepare"
                      ? "border-orange-500/50 bg-orange-500/5"
                      : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <UnitIcon type={item.unit} size={24} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.recommendation === "start-now" && (
                          <Badge variant="destructive" className="animate-pulse">
                            Start Now
                          </Badge>
                        )}
                        {item.recommendation === "prepare" && (
                          <Badge variant="outline" className="border-orange-500 text-orange-600">
                            Prepare
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Current Stock: {item.currentStock} | Forecasted Demand: {item.forecastedDemand}
                      </p>
                    </div>
                  </div>
                  <StatusIndicator
                    status={
                      item.recommendation === "start-now"
                        ? "critical"
                        : item.recommendation === "prepare"
                          ? "action-needed"
                          : "completed"
                    }
                  />
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="font-medium">
                      {item.recommendation === "start-now" && (
                        <>
                          ⚠️ Detailed forecast: You usually sell {item.forecastedDemand} {item.name} on
                          weekends. You only have stock for {item.currentStock}. Start baking now!
                        </>
                      )}
                      {item.recommendation === "prepare" && (
                        <>
                          📅 Forecast: Expected demand of {item.forecastedDemand} in {item.daysUntilShortage}{" "}
                          days. Prepare to start production.
                        </>
                      )}
                      {item.recommendation === "ok" && (
                        <>✅ Stock levels adequate for forecasted demand</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

