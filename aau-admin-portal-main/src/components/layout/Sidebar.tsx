import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Shield,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import aauLogo from "@/assets/aau-logo.png";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "User Management",
    icon: Users,
    href: "/users",
  },
  {
    title: "Campus Management",
    icon: Building2,
    href: "/campuses",
  },
  {
    title: "Roles & Permissions",
    icon: Shield,
    href: "/roles",
  },
  {
    title: "Audit Logs",
    icon: FileText,
    href: "/audit-logs",
  },
  {
    title: "System Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Close mobile sidebar when route changes
  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-sidebar transition-all duration-300 ease-in-out",
          // Desktop: always visible, can be collapsed
          !isMobile && (collapsed ? "w-16" : "w-64"),
          // Mobile: off-canvas drawer
          isMobile && "w-64",
          isMobile && (mobileOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
            className="absolute right-2 top-2 h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        {/* Logo Section */}
        <div className="flex h-20 items-center justify-center border-b border-sidebar-border px-4">
          {(!collapsed || isMobile) ? (
            <div className="flex items-center gap-3">
              <img src={aauLogo} alt="AAU Logo" className="h-12 w-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-sidebar-foreground/70">
                  አዲስ አበባ ዩኒቨርሲቲ
                </span>
                <span className="text-sm font-bold text-sidebar-foreground">
                  ADDIS ABABA UNIVERSITY
                </span>
                <span className="text-[10px] text-sidebar-foreground/60">
                  SINCE 1950
                </span>
              </div>
            </div>
          ) : (
            <img src={aauLogo} alt="AAU Logo" className="h-10 w-10 object-contain" />
          )}
        </div>

        {/* System Title */}
        {(!collapsed || isMobile) && (
          <div className="border-b border-sidebar-border px-4 py-3">
            <div className="rounded-md bg-sidebar-accent/50 px-3 py-2">
              <span className="text-xs font-medium text-sidebar-foreground">
                URTFMS
              </span>
              <p className="text-[10px] text-sidebar-foreground/70">
                System Administrator Portal
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3 mt-2">
          <span className={cn(
            "text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2",
            collapsed && !isMobile && "sr-only"
          )}>
            Main Menu
          </span>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border-l-4 border-l-aau-red"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-sidebar-primary")} />
                {(!collapsed || isMobile) && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle - Desktop Only */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-24 h-6 w-6 rounded-full border border-border bg-card text-foreground shadow-md hover:bg-accent hover:shadow-lg transition-all"
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>
        )}

        {/* Footer */}
        {(!collapsed || isMobile) && (
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="rounded-md bg-sidebar-accent/30 px-3 py-2 text-center">
              <p className="text-[10px] text-sidebar-foreground/60">
                © 2025 Addis Ababa University
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
