"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, TrendingUp, Clock } from "lucide-react";

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
import { Product } from "./schema";

export const columns: ColumnDef<Product>[] = [
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
          Product Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="font-medium">{row.getValue("name")}</div>
        <div className="text-xs text-muted-foreground">{row.original.description}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const cost = row.original.cost;
      const margin = ((price - cost) / price) * 100;

      return (
        <div className="flex flex-col gap-1">
          <div className="font-semibold tabular-nums">
            ${price.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            Margin: {margin.toFixed(0)}%
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "preparationTime",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Prep Time
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Clock className="size-4" />
        <span className="tabular-nums">{row.getValue("preparationTime")} min</span>
      </div>
    ),
  },
  {
    accessorKey: "popularity",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Popularity
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const popularity = row.getValue("popularity") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-2 w-16 overflow-hidden rounded-full bg-secondary">
            <div
              className="bg-primary"
              style={{ width: `${popularity}%` }}
            />
          </div>
          <span className="text-sm tabular-nums">{popularity}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ row }) => {
      const isAvailable = row.getValue("isAvailable") as boolean;
      return (
        <Badge variant={isAvailable ? "default" : "secondary"}>
          {isAvailable ? "Available" : "Unavailable"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "allergens",
    header: "Allergens",
    cell: ({ row }) => {
      const allergens = row.getValue("allergens") as string[];
      if (allergens.length === 0) {
        return <div className="text-sm text-muted-foreground">None</div>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {allergens.map((allergen) => (
            <Badge key={allergen} variant="outline" className="text-xs">
              {allergen}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
            <DropdownMenuItem>
              {product.isAvailable ? "Mark unavailable" : "Mark available"}
            </DropdownMenuItem>
            <DropdownMenuItem>View sales data</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


