"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import type { sectionSchema } from "./schema";
import type { z } from "zod";

type Section = z.infer<typeof sectionSchema>;

export const dashboardColumns: ColumnDef<Section>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-12 font-mono text-sm">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span className="max-w-[200px] truncate font-medium">{row.getValue("itemName")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant="secondary" className="text-xs">
            {row.getValue("category")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Quantity
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      const unit = row.original.unit;
      const reorderLevel = row.original.reorderLevel;

      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold tabular-nums">
            {quantity} {unit}
          </span>
          {quantity <= reorderLevel && quantity > 0 && <AlertTriangle className="size-4 text-orange-500" />}
          {quantity === 0 && <AlertTriangle className="size-4 text-red-500" />}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          variant={status === "In Stock" ? "default" : status === "Low Stock" ? "outline" : "destructive"}
          className={status === "Low Stock" ? "border-orange-500/50 text-orange-600 dark:text-orange-400" : ""}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Supplier" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate text-sm">{row.getValue("supplier")}</div>;
    },
  },
  {
    accessorKey: "lastRestocked",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Restocked" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastRestocked"));
      return <div className="text-sm tabular-nums">{date.toLocaleDateString()}</div>;
    },
  },
];
