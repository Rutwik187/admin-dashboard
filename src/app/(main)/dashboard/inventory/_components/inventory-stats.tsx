import { TrendingUp, TrendingDown, Package, AlertTriangle, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function InventoryStats() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">342</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <Package className="size-3" />
              Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Inventory items tracked</div>
          <div className="text-muted-foreground">Across all categories</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Low Stock Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">12</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1 border-orange-500/50 text-orange-600 dark:text-orange-400">
              <AlertTriangle className="size-3" />
              Alert
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Needs reordering <AlertTriangle className="size-4" />
          </div>
          <div className="text-muted-foreground">Action required soon</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Inventory Value</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$52,840</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="size-3" />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Increased value <DollarSign className="size-4" />
          </div>
          <div className="text-muted-foreground">Compared to last month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Consumption</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$38,520</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingDown className="size-3" />
              -3.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Optimized usage <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Lower than last month</div>
        </CardFooter>
      </Card>
    </div>
  );
}


