"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Star, Mail, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Supplier } from "./schema";

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Supplier Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="text-sm">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium">{row.getValue("contactPerson")}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="size-3" />
          {row.original.email}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="size-3" />
          {row.original.phone}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rating
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center gap-1">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold tabular-nums">{rating.toFixed(1)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Orders
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="tabular-nums">{row.getValue("totalOrders")}</div>,
  },
  {
    accessorKey: "lastOrderDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Order
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastOrderDate"));
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Active" ? "default" : status === "On Hold" ? "outline" : "secondary"}
          className={
            status === "On Hold" ? "border-orange-500/50 text-orange-600 dark:text-orange-400" : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const supplier = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(supplier.id)}>
              Copy supplier ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Create order</DropdownMenuItem>
            <DropdownMenuItem>View order history</DropdownMenuItem>
            <DropdownMenuItem>Edit supplier</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Deactivate supplier</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


