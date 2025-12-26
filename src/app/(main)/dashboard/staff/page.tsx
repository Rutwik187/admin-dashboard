"use client";

import { Plus, Mail, Phone, Calendar } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const staffMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Head Chef",
    department: "Kitchen",
    email: "john.smith@restaurant.com",
    phone: "(555) 123-4567",
    status: "Active",
    hireDate: "2020-03-15",
    shift: "Morning",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Sous Chef",
    department: "Kitchen",
    email: "sarah.j@restaurant.com",
    phone: "(555) 234-5678",
    status: "Active",
    hireDate: "2021-06-20",
    shift: "Evening",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Restaurant Manager",
    department: "Management",
    email: "m.brown@restaurant.com",
    phone: "(555) 345-6789",
    status: "Active",
    hireDate: "2019-01-10",
    shift: "Full Day",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Server",
    department: "Front of House",
    email: "emily.d@restaurant.com",
    phone: "(555) 456-7890",
    status: "Active",
    hireDate: "2022-09-05",
    shift: "Evening",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Bartender",
    department: "Bar",
    email: "d.wilson@restaurant.com",
    phone: "(555) 567-8901",
    status: "Active",
    hireDate: "2021-11-12",
    shift: "Evening",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Server",
    department: "Front of House",
    email: "lisa.a@restaurant.com",
    phone: "(555) 678-9012",
    status: "On Leave",
    hireDate: "2023-02-28",
    shift: "Morning",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 @container">
      {/* Header */}
      <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage your restaurant staff, schedules, and employee information
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 size-4" />
            Schedules
          </Button>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Staff</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">28</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Active employees</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>On Duty Today</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">18</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Currently working</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Morning Shift</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">6 AM - 2 PM</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Evening Shift</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">10</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">2 PM - 10 PM</div>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>All restaurant employees and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <Avatar className="size-12">
                  <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{staff.name}</h4>
                      <p className="text-muted-foreground text-sm">{staff.role}</p>
                    </div>
                    <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                      {staff.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="size-3" />
                      {staff.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-3" />
                      {staff.phone}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {staff.department}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {staff.shift}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Kitchen</CardTitle>
            <CardDescription>Kitchen staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Chefs</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Prep Cooks</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Dishwashers</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Front of House</CardTitle>
            <CardDescription>Service staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Servers</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Hosts</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bartenders</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
            <CardDescription>Management team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Managers</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Supervisors</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Admin Staff</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}






