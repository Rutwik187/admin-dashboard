"use client";

import { ChefHat, Recipe, PackageCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function KitchenPage() {
  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Central Kitchen</h1>
        <p className="text-muted-foreground">
          Convert raw materials into finished goods with minimal waste
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recipe className="size-5" />
              Recipe Lockdown
            </CardTitle>
            <CardDescription>
              Define "Gold Standard" recipes. Staff sees only required ingredients for selected batch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/kitchen/recipes">
              <Button className="w-full">Manage Recipes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="size-5" />
              One-Tap Production
            </CardTitle>
            <CardDescription>
              Tap "Finished" after baking. System auto-deducts ingredients and flags yield errors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/kitchen/production">
              <Button className="w-full">Start Production</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

