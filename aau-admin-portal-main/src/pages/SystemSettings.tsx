import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Save, RefreshCw, Server, Database, Shield, Bell, Clock, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import aauLogo from "@/assets/aau-logo.png";

export default function SystemSettings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="System Settings"
        description="Configure system modules and approval workflows"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button className="bg-aau-gradient hover:opacity-90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* System Modules */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">System Modules</CardTitle>
            </div>
            <CardDescription>
              Enable or disable system modules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "training", name: "Training Management", enabled: true, description: "Manage training programs" },
              { id: "rental", name: "Facility Rental", enabled: true, description: "Handle facility bookings" },
              { id: "reporting", name: "Advanced Reporting", enabled: true, description: "Generate detailed reports" },
              { id: "notifications", name: "Email Notifications", enabled: false, description: "Send email alerts" },
              { id: "api", name: "External API Access", enabled: false, description: "Third-party integrations" },
            ].map((module) => (
              <div
                key={module.id}
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div>
                  <Label htmlFor={module.id} className="text-sm font-medium cursor-pointer">
                    {module.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </div>
                <Switch id={module.id} defaultChecked={module.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Approval Workflows */}
        <Card className="border-l-4 border-l-aau-red">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-aau-red" />
              <CardTitle className="text-lg">Approval Workflows</CardTitle>
            </div>
            <CardDescription>
              Configure approval requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "user_creation", name: "User Creation Approval", enabled: true, description: "Require approval for new users" },
              { id: "campus_changes", name: "Campus Changes Approval", enabled: true, description: "Approve campus modifications" },
              { id: "role_assignment", name: "Role Assignment Approval", enabled: false, description: "Approve role changes" },
              { id: "facility_booking", name: "Facility Booking Approval", enabled: true, description: "Approve facility requests" },
            ].map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div>
                  <Label htmlFor={workflow.id} className="text-sm font-medium cursor-pointer">
                    {workflow.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{workflow.description}</p>
                </div>
                <Switch id={workflow.id} defaultChecked={workflow.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={aauLogo} alt="AAU" className="h-10 w-10 object-contain" />
                <div>
                  <CardTitle className="text-lg">System Information</CardTitle>
                  <CardDescription>
                    Read-only system metadata
                  </CardDescription>
                </div>
              </div>
              <Badge variant="default" className="bg-success">Operational</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <Label className="text-xs">System Version</Label>
                </div>
                <Input value="URTFMS v2.1.0" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <Label className="text-xs">Last Updated</Label>
                </div>
                <Input value="January 7, 2025" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Database className="h-4 w-4" />
                  <Label className="text-xs">Database Status</Label>
                </div>
                <Input value="Connected" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Server className="h-4 w-4" />
                  <Label className="text-xs">Environment</Label>
                </div>
                <Input value="Production" disabled className="bg-muted" />
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Organization</Label>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="font-medium text-foreground">Addis Ababa University</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">System Administrator</Label>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="font-medium text-foreground">ICT Department</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
