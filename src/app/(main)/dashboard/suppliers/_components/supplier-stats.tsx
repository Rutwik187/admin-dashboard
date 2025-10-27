import { TrendingUp, Users, Star, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SupplierStats() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Suppliers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">23</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <Users className="size-3" />
              Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Reliable partnerships</div>
          <div className="text-muted-foreground">2 new suppliers this month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">148</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="size-3" />
              +15.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Increased ordering <ShoppingCart className="size-4" />
          </div>
          <div className="text-muted-foreground">Higher than last month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Rating</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">4.7</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              Excellent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            High quality suppliers <Star className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on performance</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Procurement</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$45,280</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="size-3" />
              +8.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Procurement spending</div>
          <div className="text-muted-foreground">Within budget</div>
        </CardFooter>
      </Card>
    </div>
  );
}


