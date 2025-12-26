import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { sectionSchema } from "./schema";

const chartData = [
  { month: "January", current: 186, reorder: 80 },
  { month: "February", current: 305, reorder: 200 },
  { month: "March", current: 237, reorder: 120 },
  { month: "April", current: 73, reorder: 190 },
  { month: "May", current: 209, reorder: 130 },
  { month: "June", current: 214, reorder: 140 },
];

const chartConfig = {
  current: {
    label: "Current Stock",
    color: "var(--primary)",
  },
  reorder: {
    label: "Reorder Level",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export function TableCellViewer({ item }: { item: z.infer<typeof sectionSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.itemName}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.itemName}</DrawerTitle>
          <DrawerDescription>Inventory details and stock management</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="reorder"
                    type="natural"
                    fill="var(--color-reorder)"
                    fillOpacity={0.6}
                    stroke="var(--color-reorder)"
                    stackId="a"
                  />
                  <Area
                    dataKey="current"
                    type="natural"
                    fill="var(--color-current)"
                    fillOpacity={0.4}
                    stroke="var(--color-current)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Stock level: {item.quantity} {item.unit} <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Current inventory status and reorder level monitoring. This item is categorized as {item.category} 
                  and was last restocked on {new Date(item.lastRestocked).toLocaleDateString()}.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="itemName">Item Name</Label>
              <Input id="itemName" defaultValue={item.itemName} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={item.category}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spices & Masalas">Spices & Masalas</SelectItem>
                    <SelectItem value="Grains & Pulses">Grains & Pulses</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Dairy Products">Dairy Products</SelectItem>
                    <SelectItem value="Meat & Poultry">Meat & Poultry</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Oils & Ghee">Oils & Ghee</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" defaultValue={item.quantity} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" defaultValue={item.unit} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="reorderLevel">Reorder Level</Label>
                <Input id="reorderLevel" type="number" defaultValue={item.reorderLevel} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" defaultValue={item.supplier} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="lastRestocked">Last Restocked</Label>
              <Input id="lastRestocked" type="date" defaultValue={new Date(item.lastRestocked).toISOString().split('T')[0]} />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
