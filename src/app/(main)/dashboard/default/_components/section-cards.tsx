import { TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Daily Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$7,845.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +15.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong sales today <DollarSign className="size-4" />
          </div>
          <div className="text-muted-foreground">Compared to yesterday</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Orders Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">186</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +8.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Higher order volume <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Above daily average</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Inventory Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">342</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Package />
              Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Well-stocked inventory <Package className="size-4" />
          </div>
          <div className="text-muted-foreground">12 items need reorder</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Profit Margin</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">38.5%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Improved profitability <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Better cost control</div>
        </CardFooter>
      </Card>
    </div>
  );
}
