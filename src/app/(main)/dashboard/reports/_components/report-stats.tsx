import { TrendingUp, TrendingDown, FileText, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportStats() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$105,000</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="size-3" />
              +12.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Strong performance</div>
          <div className="text-muted-foreground">Compared to last month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Order Value</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$42.50</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="size-3" />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Increasing trend</div>
          <div className="text-muted-foreground">Higher ticket size</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cost of Goods Sold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">32.5%</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <TrendingDown className="size-3" />
              -2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Improved efficiency</div>
          <div className="text-muted-foreground">Better cost control</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Reports Generated</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">24</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <FileText className="size-3" />
              This Month
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Regular reporting <Calendar className="size-4" />
          </div>
          <div className="text-muted-foreground">All categories covered</div>
        </CardFooter>
      </Card>
    </div>
  );
}





