import { TrendingUp, Cake, DollarSign, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductStats() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bakery Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">52</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <Cake className="size-3" />
              Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Complete bakery catalog</div>
          <div className="text-muted-foreground">3 new items this month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Price</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">₹125.50</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <DollarSign className="size-3" />
              Item Avg ₹
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Competitive pricing</div>
          <div className="text-muted-foreground">Market aligned</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Best Seller</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">Black Forest</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              Top
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Most popular cake <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">89 units sold this week</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Margin</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">58.5%</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="size-3" />
              Healthy
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Strong profitability</div>
          <div className="text-muted-foreground">Above target of 55%</div>
        </CardFooter>
      </Card>
    </div>
  );
}


