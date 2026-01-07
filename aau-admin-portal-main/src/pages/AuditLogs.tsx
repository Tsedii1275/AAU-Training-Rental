import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Calendar, Clock, User2, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const mockLogs = [
  {
    id: 1,
    timestamp: "2025-01-07 14:32:15",
    user: "Abebe Kebede",
    role: "ICT Administrator",
    action: "CREATE",
    resource: "User",
    description: "Created new user: Sara Hailu",
    ip: "192.168.1.100",
  },
  {
    id: 2,
    timestamp: "2025-01-07 14:28:42",
    user: "System",
    role: "System",
    action: "UPDATE",
    resource: "Campus",
    description: "Updated Main Campus settings",
    ip: "127.0.0.1",
  },
  {
    id: 3,
    timestamp: "2025-01-07 13:45:33",
    user: "Admin",
    role: "System Admin",
    action: "DELETE",
    resource: "User",
    description: "Deactivated user: Dawit Tesfaye",
    ip: "192.168.1.101",
  },
  {
    id: 4,
    timestamp: "2025-01-07 12:15:08",
    user: "Meron Alemu",
    role: "Finance Officer",
    action: "VIEW",
    resource: "Report",
    description: "Accessed financial report Q4 2024",
    ip: "192.168.1.102",
  },
  {
    id: 5,
    timestamp: "2025-01-07 11:30:22",
    user: "System",
    role: "System",
    action: "BACKUP",
    resource: "Database",
    description: "Automated backup completed",
    ip: "127.0.0.1",
  },
  {
    id: 6,
    timestamp: "2025-01-07 10:15:44",
    user: "Tigist Bekele",
    role: "Auditor",
    action: "VIEW",
    resource: "Audit Log",
    description: "Viewed system audit logs",
    ip: "192.168.1.105",
  },
  {
    id: 7,
    timestamp: "2025-01-07 09:30:11",
    user: "Henok Tadesse",
    role: "Training Coordinator",
    action: "CREATE",
    resource: "Training",
    description: "Created new training session: Advanced IT Skills",
    ip: "192.168.1.108",
  },
];

const getActionBadgeVariant = (action: string) => {
  switch (action) {
    case "CREATE":
      return "default";
    case "UPDATE":
      return "secondary";
    case "DELETE":
      return "destructive";
    case "VIEW":
      return "outline";
    default:
      return "secondary";
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case "CREATE":
      return "bg-success";
    case "UPDATE":
      return "bg-info";
    case "DELETE":
      return "bg-destructive";
    case "VIEW":
      return "bg-muted-foreground";
    default:
      return "bg-primary";
  }
};

export default function AuditLogs() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Audit Logs"
        description="View system activity and user actions (read-only)"
        actions={
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockLogs.length}</p>
                <p className="text-xs text-muted-foreground">Total Logs Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockLogs.filter(l => l.action === "CREATE").length}</p>
                <p className="text-xs text-muted-foreground">Create Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockLogs.filter(l => l.action === "UPDATE").length}</p>
                <p className="text-xs text-muted-foreground">Update Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockLogs.filter(l => l.action === "DELETE").length}</p>
                <p className="text-xs text-muted-foreground">Delete Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <User2 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="User" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timestamp
                </div>
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {log.timestamp}
                </TableCell>
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {log.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getActionColor(log.action)}`} />
                    <Badge variant={getActionBadgeVariant(log.action)}>
                      {log.action}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell className="max-w-[250px] truncate text-muted-foreground">
                  {log.description}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 1-7 of 328 logs</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
