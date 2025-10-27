"use client";

import { Download, Calendar, FileText, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesReport } from "./_components/sales-report";
import { InventoryReport } from "./_components/inventory-report";
import { RevenueBreakdown } from "./_components/revenue-breakdown";
import { ReportStats } from "./_components/report-stats";

const reportTemplates = [
  {
    id: 1,
    name: "Daily Sales Summary",
    description: "Complete breakdown of daily sales and transactions",
    icon: FileText,
  },
  {
    id: 2,
    name: "Monthly Financial Report",
    description: "Comprehensive monthly financial performance analysis",
    icon: FileText,
  },
  {
    id: 3,
    name: "Inventory Status Report",
    description: "Current inventory levels and reorder recommendations",
    icon: FileText,
  },
  {
    id: 4,
    name: "Supplier Performance",
    description: "Analysis of supplier delivery times and quality",
    icon: FileText,
  },
  {
    id: 5,
    name: "Product Performance",
    description: "Best and worst performing menu items",
    icon: FileText,
  },
  {
    id: 6,
    name: "Expense Analysis",
    description: "Detailed breakdown of operational expenses",
    icon: FileText,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports and analyze your restaurant's performance
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 size-4" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 size-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <ReportStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-2">
        <SalesReport />
        <InventoryReport />
      </div>

      <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3">
        <div className="@3xl:col-span-2">
          <RevenueBreakdown />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Peak Hours</span>
                <span className="font-medium">12-2 PM, 6-8 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Busiest Day</span>
                <span className="font-medium">Saturday</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Top Category</span>
                <span className="font-medium">Burgers</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Customer Rating</span>
                <span className="font-medium">4.6 / 5.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Repeat Customers</span>
                <span className="font-medium">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Generate pre-configured reports with a single click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-3">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                  <template.icon className="size-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-medium">{template.name}</h4>
                  <p className="text-muted-foreground text-xs">{template.description}</p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Generate Report →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




