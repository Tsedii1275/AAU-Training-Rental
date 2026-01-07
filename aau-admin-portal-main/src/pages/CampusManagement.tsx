import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Building2, MapPin, Users, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const mockCampuses = [
  {
    id: 1,
    name: "Main Campus (6 Kilo)",
    location: "6 Kilo, Addis Ababa",
    schools: 12,
    users: 456,
    status: true,
    admin: "Dr. Alemayehu Bekele",
  },
  {
    id: 2,
    name: "Technology Campus (5 Kilo)",
    location: "5 Kilo, Addis Ababa",
    schools: 8,
    users: 289,
    status: true,
    admin: "Dr. Tigist Haile",
  },
  {
    id: 3,
    name: "Science Campus (4 Kilo)",
    location: "4 Kilo, Addis Ababa",
    schools: 6,
    users: 178,
    status: true,
    admin: "Prof. Kebede Meskel",
  },
  {
    id: 4,
    name: "Commerce Campus",
    location: "Mexico Square",
    schools: 4,
    users: 234,
    status: false,
    admin: "Dr. Sara Mengistu",
  },
  {
    id: 5,
    name: "Medical Campus (Black Lion)",
    location: "Black Lion, Addis Ababa",
    schools: 3,
    users: 567,
    status: true,
    admin: "Prof. Yohannes Tefera",
  },
  {
    id: 6,
    name: "Law Campus (Sidist Kilo)",
    location: "Sidist Kilo, Addis Ababa",
    schools: 2,
    users: 123,
    status: true,
    admin: "Dr. Meseret Abebe",
  },
];

export default function CampusManagement() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Campus Management"
        description="Manage university campuses, schools, and departments"
        actions={
          <Button className="bg-aau-gradient hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add Campus
          </Button>
        }
      />

      {/* Campus Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Campuses</p>
                <p className="text-2xl font-bold text-foreground">{mockCampuses.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">{mockCampuses.filter(c => c.status).length}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-success animate-pulse-soft" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Schools</p>
                <p className="text-2xl font-bold text-foreground">{mockCampuses.reduce((sum, c) => sum + c.schools, 0)}</p>
              </div>
              <Building2 className="h-8 w-8 text-warning/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-info">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{mockCampuses.reduce((sum, c) => sum + c.users, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-info/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campus Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCampuses.map((campus) => (
          <Card key={campus.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${campus.status ? 'bg-primary' : 'bg-muted'}`} />
            
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base leading-tight">{campus.name}</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {campus.location}
                    </div>
                  </div>
                </div>
                <Switch checked={campus.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Campus Admin</span>
                <span className="font-medium text-foreground">{campus.admin}</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
                  <Building2 className="h-4 w-4 text-secondary-foreground" />
                  <span className="text-sm text-secondary-foreground">
                    <span className="font-semibold">{campus.schools}</span> Schools
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
                  <Users className="h-4 w-4 text-secondary-foreground" />
                  <span className="text-sm text-secondary-foreground">
                    <span className="font-semibold">{campus.users}</span> Users
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Badge variant={campus.status ? "default" : "secondary"}>
                  {campus.status ? "Active" : "Inactive"}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    View Schools
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
