"use client";

import { Plus, Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { columns } from "./_components/columns";
import { productsData } from "./_components/products-data";
import { ProductStats } from "./_components/product-stats";

export default function Page() {
  const table = useDataTableInstance({
    data: productsData,
    columns,
    getRowId: (row) => row.id,
  });

  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your menu items, pricing, availability, and track product performance
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            Export Menu
          </Button>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <ProductStats />

      {/* Products Table */}
      <div className="overflow-hidden rounded-lg border">
        <DataTable table={table} columns={columns} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

