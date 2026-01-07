import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import CampusManagement from "@/pages/CampusManagement";
import RolesPermissions from "@/pages/RolesPermissions";
import AuditLogs from "@/pages/AuditLogs";
import SystemSettings from "@/pages/SystemSettings";
import MyProfile from "@/pages/MyProfile";
import AccountSettings from "@/pages/AccountSettings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/campuses" element={<CampusManagement />} />
            <Route path="/roles" element={<RolesPermissions />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/account-settings" element={<AccountSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
