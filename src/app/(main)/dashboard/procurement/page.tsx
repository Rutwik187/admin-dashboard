"use client";

import { ShoppingCart, FileText, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProcurementPage() {
  return (
    <div className="flex flex-col gap-6 @container">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Procurement Module</h1>
        <p className="text-muted-foreground">
          Manage raw material procurement, digital indents, and goods receipt
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Digital Indent
            </CardTitle>
            <CardDescription>
              Request stock automatically. Generate consolidated requirements and send to vendors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/procurement/indent">
              <Button className="w-full">Open Digital Indent</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="size-5" />
              Visual GRN
            </CardTitle>
            <CardDescription>
              Goods Receipt Note with photo validation. Verify items visually and update stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/procurement/grn">
              <Button className="w-full">Open Visual GRN</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

