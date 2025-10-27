"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";

export function DataTable({ data: initialData }: { data: z.infer<typeof sectionSchema>[] }) {
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  return (
    <Tabs defaultValue="inventory" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="inventory">
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inventory">Inventory Overview</SelectItem>
            <SelectItem value="low-stock">Low Stock Items</SelectItem>
            <SelectItem value="by-category">By Category</SelectItem>
            <SelectItem value="recent">Recently Restocked</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="inventory">Inventory Overview</TabsTrigger>
          <TabsTrigger value="low-stock">
            Low Stock <Badge variant="secondary">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="by-category">
            By Category <Badge variant="secondary">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="recent">Recently Restocked</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Add Item</span>
          </Button>
        </div>
      </div>
      <TabsContent value="inventory" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="low-stock" className="flex flex-col">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew table={table} columns={columns} />
        </div>
      </TabsContent>
      <TabsContent value="by-category" className="flex flex-col">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew table={table} columns={columns} />
        </div>
      </TabsContent>
      <TabsContent value="recent" className="flex flex-col">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew table={table} columns={columns} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
