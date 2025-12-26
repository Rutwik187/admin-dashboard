"use client";

import { Bell, Lock, Palette, Globe, CreditCard, Users, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const settingsSections = [
  {
    id: 1,
    icon: Users,
    title: "Restaurant Profile",
    description: "Update your restaurant information, logo, and contact details",
    action: "Manage",
  },
  {
    id: 2,
    icon: Bell,
    title: "Notifications",
    description: "Configure email and push notifications for alerts and updates",
    action: "Configure",
  },
  {
    id: 3,
    icon: Lock,
    title: "Security",
    description: "Manage passwords, two-factor authentication, and access control",
    action: "Manage",
  },
  {
    id: 4,
    icon: Palette,
    title: "Appearance",
    description: "Customize theme, colors, and display preferences",
    action: "Customize",
  },
  {
    id: 5,
    icon: Globe,
    title: "Localization",
    description: "Set language, timezone, currency, and regional preferences",
    action: "Configure",
  },
  {
    id: 6,
    icon: CreditCard,
    title: "Payment Methods",
    description: "Manage accepted payment methods and billing information",
    action: "Manage",
  },
  {
    id: 7,
    icon: Database,
    title: "Data & Backup",
    description: "Configure automatic backups and data export options",
    action: "Configure",
  },
  {
    id: 8,
    icon: Users,
    title: "User Roles",
    description: "Define user roles and permission levels for staff access",
    action: "Manage",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your restaurant settings, preferences, and system configuration
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic restaurant and system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Restaurant Name</h4>
                <p className="text-muted-foreground text-sm">The Gourmet Kitchen</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Business Address</h4>
                <p className="text-muted-foreground text-sm">123 Main Street, City, State 12345</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Contact Email</h4>
                <p className="text-muted-foreground text-sm">contact@gourmetkitchen.com</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Phone Number</h4>
                <p className="text-muted-foreground text-sm">(555) 123-4567</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Settings Sections */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Advanced settings and configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
            {settingsSections.map((section) => (
              <div
                key={section.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full">
                  <section.icon className="size-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className="font-semibold">{section.title}</h4>
                    <p className="text-muted-foreground text-sm">{section.description}</p>
                  </div>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    {section.action} →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Operating Hours</CardTitle>
          <CardDescription>Set your restaurant's operating hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { day: "Monday", hours: "11:00 AM - 10:00 PM" },
              { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
              { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
              { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
              { day: "Friday", hours: "11:00 AM - 11:00 PM" },
              { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
              { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
            ].map((schedule) => (
              <div key={schedule.day} className="flex items-center justify-between">
                <span className="font-medium">{schedule.day}</span>
                <span className="text-muted-foreground tabular-nums">{schedule.hours}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            Edit Hours
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Reset All Settings</h4>
                <p className="text-muted-foreground text-sm">Restore all settings to default values</p>
              </div>
              <Button variant="destructive" size="sm">
                Reset
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete All Data</h4>
                <p className="text-muted-foreground text-sm">Permanently delete all restaurant data</p>
              </div>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}






