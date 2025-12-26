"use client";

import { Plus, DollarSign, CreditCard, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, cn } from "@/lib/utils";

const recentTransactions = [
  {
    id: 1,
    title: "Weekend Sales",
    subtitle: "Cakes, pastries, and bread orders",
    type: "credit",
    amount: 12450,
    date: "Oct 24",
  },
  {
    id: 2,
    title: "Sugar & Flour Supplier",
    subtitle: "Inventory purchase - raw materials",
    type: "debit",
    amount: 3450,
    date: "Oct 23",
  },
  {
    id: 3,
    title: "Staff Salaries",
    subtitle: "Bi-weekly payroll - bakers & staff",
    type: "debit",
    amount: 6800,
    date: "Oct 22",
  },
  {
    id: 4,
    title: "Daily Revenue",
    subtitle: "Friday bakery sales",
    type: "credit",
    amount: 8950,
    date: "Oct 21",
  },
  {
    id: 5,
    title: "Utility Bill",
    subtitle: "Electricity for ovens and equipment",
    type: "debit",
    amount: 1250,
    date: "Oct 20",
  },
];

export function AccountOverview() {
  return (
    <Card className="shadow-xs">
      <CardHeader className="items-center">
        <CardTitle>Financial Accounts</CardTitle>
        <CardDescription>Your bakery's financial summary and recent transactions.</CardDescription>
        <CardAction>
          <Button size="icon" variant="outline">
            <Plus className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Tabs className="gap-4" defaultValue="main">
          <TabsList className="w-full">
            <TabsTrigger value="main">Main Account</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
          <TabsContent value="main">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary to-primary/80 relative aspect-8/5 w-full max-w-96 overflow-hidden rounded-xl perspective-distant">
                <div className="absolute top-6 left-6">
                  <CreditCard className="text-primary-foreground size-8" />
                </div>
                <div className="absolute top-1/2 w-full -translate-y-1/2">
                  <div className="flex items-end justify-between px-6">
                    <span className="text-accent font-mono text-lg leading-none font-medium tracking-wide uppercase">
                      Bakery Business
                    </span>
                    <DollarSign className="text-accent size-14" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Account Number</span>
                  <span className="font-medium tabular-nums">•••• •••• 8924</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Account Type</span>
                  <span className="font-medium">Business Checking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-medium tabular-nums">₹127,340.85</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Monthly Revenue</span>
                  <span className="font-medium tabular-nums">₹152,890.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Monthly Expenses</span>
                  <span className="font-medium tabular-nums">₹89,450.00</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline" size="sm">
                  Transfer
                </Button>
                <Button className="flex-1" variant="outline" size="sm">
                  Pay Bills
                </Button>
                <Button className="flex-1" variant="outline" size="sm">
                  More
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h6 className="text-muted-foreground text-sm uppercase">Recent Transactions</h6>

                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center gap-2">
                      <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-full">
                        {transaction.type === "credit" ? (
                          <TrendingUp className="size-5 text-green-500" />
                        ) : (
                          <DollarSign className="size-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex w-full items-end justify-between">
                        <div>
                          <p className="text-sm font-medium">{transaction.title}</p>
                          <p className="text-muted-foreground line-clamp-1 text-xs">{transaction.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={cn(
                              "text-sm leading-none font-medium tabular-nums",
                              transaction.type === "debit" ? "text-destructive" : "text-green-500",
                            )}
                          >
                            {transaction.type === "debit" ? "-" : "+"}
                            {formatCurrency(transaction.amount, { noDecimals: true })}
                          </span>
                          <p className="text-muted-foreground text-xs">{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full" size="sm" variant="outline">
                  View All Transactions
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="savings">
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground py-8">
                <p>Savings account details</p>
                <p className="mt-2">Balance: ₹45,200.00</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
