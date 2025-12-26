"use client";

import { Plus, Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AccountOverview } from "./_components/account-overview";
import { FinancialOverview } from "./_components/financial-overview";
import { ExpenseSummary } from "./_components/expense-summary";
import { CashFlowChart } from "./_components/cash-flow-chart";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Bakery Financial Management</h1>
          <p className="text-muted-foreground">
            Track revenue, expenses, cash flow, ingredient costs, and financial performance of your bakery
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <AccountOverview />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex-1">
            <FinancialOverview />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:grid-cols-2">
            <ExpenseSummary />
            <CashFlowChart />
          </div>
        </div>
      </div>
    </div>
  );
}
