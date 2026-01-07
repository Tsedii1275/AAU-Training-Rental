import { Building2, Users, Shield, Activity, TrendingUp, Calendar } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import aauLogo from "@/assets/aau-logo.png";

const recentActivity = [
  {
    id: 1,
    action: "User Created",
    description: "New ICT Administrator added",
    user: "Admin",
    time: "2 minutes ago",
    type: "create",
  },
  {
    id: 2,
    action: "Campus Updated",
    description: "Main Campus settings modified",
    user: "System",
    time: "15 minutes ago",
    type: "update",
  },
  {
    id: 3,
    action: "Role Modified",
    description: "Finance Officer permissions updated",
    user: "Admin",
    time: "1 hour ago",
    type: "update",
  },
  {
    id: 4,
    action: "User Deactivated",
    description: "Training Coordinator account disabled",
    user: "Admin",
    time: "3 hours ago",
    type: "delete",
  },
  {
    id: 5,
    action: "System Backup",
    description: "Automated backup completed successfully",
    user: "System",
    time: "6 hours ago",
    type: "system",
  },
];

const getActivityBadgeVariant = (type: string) => {
  switch (type) {
    case "create":
      return "default";
    case "update":
      return "secondary";
    case "delete":
      return "destructive";
    default:
      return "outline";
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-aau-gradient p-6 text-primary-foreground shadow-lg">
        <div className="absolute right-0 top-0 opacity-10">
          <img src={aauLogo} alt="" className="h-40 w-40 object-contain" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">January 7, 2025</span>
          </div>
          <h1 className="text-2xl font-bold mb-1 text-white">Welcome back, System Administrator</h1>
          <p className="text-primary-foreground/80 max-w-xl">
            Monitor and manage the URTFMS system across all Addis Ababa University campuses.
          </p>
        </div>
      </div>

      <PageHeader
        title="System Overview"
        description="Real-time statistics and recent system activity"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Campuses"
          value={12}
          description="Active campuses in the system"
          icon={Building2}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value="1,247"
          description="Registered system users"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Active Roles"
          value={6}
          description="Defined permission roles"
          icon={Shield}
        />
        <StatCard
          title="System Activity"
          value={328}
          description="Actions in the last 24 hours"
          icon={Activity}
          trend={{ value: 3.1, isPositive: false }}
        />
      </div>

      {/* Users by Role & Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Users by Role</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: "ICT Administrator", count: 8, color: "bg-primary" },
                { role: "Campus Administrator", count: 24, color: "bg-aau-red" },
                { role: "Training Coordinator", count: 156, color: "bg-success" },
                { role: "Rental Officer", count: 89, color: "bg-info" },
                { role: "Finance Officer", count: 234, color: "bg-warning" },
                { role: "Auditor", count: 12, color: "bg-muted-foreground" },
              ].map((item) => (
                <div key={item.role} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-sm text-foreground">{item.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full`} 
                        style={{ width: `${Math.min((item.count / 250) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-8 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-l-4 border-l-aau-red">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Activity className="h-5 w-5 text-aau-red" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {activity.action}
                      </span>
                      <Badge variant={getActivityBadgeVariant(activity.type)}>
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
