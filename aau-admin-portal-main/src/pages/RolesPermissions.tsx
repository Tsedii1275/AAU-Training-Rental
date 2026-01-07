import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Building2, FileText, Settings, DollarSign, Eye, Edit, Trash, Plus } from "lucide-react";

const roles = [
  { id: "ict", name: "ICT Administrator", icon: Shield, users: 8, description: "Full system access and configuration" },
  { id: "campus", name: "Campus Administrator", icon: Building2, users: 24, description: "Manage campus-specific resources" },
  { id: "training", name: "Training Coordinator", icon: Users, users: 156, description: "Manage training programs and schedules" },
  { id: "rental", name: "Rental Officer", icon: Building2, users: 89, description: "Handle facility rental requests" },
  { id: "finance", name: "Finance Officer", icon: DollarSign, users: 234, description: "Manage financial transactions" },
  { id: "auditor", name: "Auditor", icon: FileText, users: 12, description: "View-only access for auditing" },
];

const permissionGroups = [
  {
    module: "User Management",
    permissions: [
      { id: "users.view", name: "View Users", icon: Eye },
      { id: "users.create", name: "Create Users", icon: Plus },
      { id: "users.edit", name: "Edit Users", icon: Edit },
      { id: "users.delete", name: "Delete Users", icon: Trash },
    ],
  },
  {
    module: "Campus Management",
    permissions: [
      { id: "campus.view", name: "View Campuses", icon: Eye },
      { id: "campus.create", name: "Create Campus", icon: Plus },
      { id: "campus.edit", name: "Edit Campus", icon: Edit },
      { id: "campus.delete", name: "Delete Campus", icon: Trash },
    ],
  },
  {
    module: "Audit & Reports",
    permissions: [
      { id: "audit.view", name: "View Audit Logs", icon: Eye },
      { id: "reports.view", name: "View Reports", icon: Eye },
      { id: "reports.export", name: "Export Reports", icon: FileText },
    ],
  },
  {
    module: "System Settings",
    permissions: [
      { id: "settings.view", name: "View Settings", icon: Eye },
      { id: "settings.edit", name: "Edit Settings", icon: Edit },
    ],
  },
];

const rolePermissions: Record<string, string[]> = {
  ict: ["users.view", "users.create", "users.edit", "users.delete", "campus.view", "campus.create", "campus.edit", "campus.delete", "audit.view", "reports.view", "reports.export", "settings.view", "settings.edit"],
  campus: ["users.view", "campus.view", "campus.edit", "audit.view", "reports.view"],
  training: ["users.view", "campus.view", "reports.view"],
  rental: ["users.view", "campus.view", "reports.view"],
  finance: ["users.view", "campus.view", "audit.view", "reports.view", "reports.export"],
  auditor: ["users.view", "campus.view", "audit.view", "reports.view", "settings.view"],
};

export default function RolesPermissions() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Roles & Permissions"
        description="Manage system roles and their associated permissions"
      />

      <Tabs defaultValue="ict" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1 bg-muted">
          {roles.map((role) => (
            <TabsTrigger 
              key={role.id} 
              value={role.id} 
              className="text-xs py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <role.icon className="h-3 w-3 mr-1" />
              {role.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {roles.map((role) => (
          <TabsContent key={role.id} value={role.id}>
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Role Info Card */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <role.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-2xl font-bold text-secondary-foreground">{role.users}</p>
                      <p className="text-xs text-muted-foreground">Users assigned</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-2xl font-bold text-secondary-foreground">{rolePermissions[role.id]?.length || 0}</p>
                      <p className="text-xs text-muted-foreground">Permissions</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant="default" className="bg-success">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Permissions Card */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Permissions Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {permissionGroups.map((group) => (
                      <div key={group.module} className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 pb-2 border-b border-border">
                          {group.module}
                        </h4>
                        <div className="space-y-2">
                          {group.permissions.map((permission) => {
                            const isGranted = rolePermissions[role.id]?.includes(permission.id);
                            return (
                              <div
                                key={permission.id}
                                className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                                  isGranted ? "bg-success/10" : "bg-muted/50"
                                }`}
                              >
                                <Checkbox
                                  checked={isGranted}
                                  disabled
                                  className={isGranted ? "border-success data-[state=checked]:bg-success" : ""}
                                />
                                <permission.icon className={`h-3.5 w-3.5 ${isGranted ? "text-success" : "text-muted-foreground"}`} />
                                <span className={`text-sm ${isGranted ? "text-foreground" : "text-muted-foreground"}`}>
                                  {permission.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
