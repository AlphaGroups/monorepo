"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import RoleSwitcher from "@/components/RoleSwitcher";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  FileText,
  School,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  UserCheck,
  GraduationCap,
  Calendar,
  Trophy,
  FileVideo,
  ClipboardList,
  UserCog,
  Building2,
  Activity,
  Shield,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserRole } from "@/services/interfaces";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  userRole?: UserRole; // ✅ add this
}

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

const Sidebar = ({ className, isCollapsed = false }: SidebarProps) => {
  const { userProfile } = useAuth();
  const pathname = usePathname(); // Next.js hook for current path
  const [openGroups, setOpenGroups] = React.useState<string[]>(["main"]);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupTitle)
        ? prev.filter((g) => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const getNavigationItems = (role: UserRole): NavigationItem[] => {
    switch (role) {
      case "superadmin":
        return [
          {
            title: "Dashboard",
            href: "/dashboards/superadmin",
            icon: LayoutDashboard,
          },
          {
            title: "User Management",
            href: "/admin/users",
            icon: Users,
            children: [
              {
                title: "Admins",
                href: "/admin/users/AdminManagement",
                icon: UserCog,
              },
              {
                title: "Class Users",
                href: "/admin/users/TeacherManagement",
                icon: UserCheck,
              },
              {
                title: "Students",
                href: "/admin/users/StudentManagement",
                icon: GraduationCap,
              },
            ],
          },
          {
            title: "Content Management",
            href: "/admin/content",
            icon: BookOpen,
            children: [
              {
                title: "Video Library",
                href: "/admin/content/videos",
                icon: Video,
              },
              {
                title: "Test Repository",
                href: "/admin/content/tests",
                icon: FileText,
              },
              {
                title: "Course Templates",
                href: "/admin/content/courses",
                icon: School,
              },
            ],
          },
          {
            title: "College Management",
            href: "/admin/colleges",
            icon: Building2,
          },
          {
            title: "Analytics & Reports",
            href: "/admin/analytics",
            icon: BarChart3,
          },
          { title: "System Settings", href: "/admin/settings", icon: Settings },
          { title: "Audit Logs", href: "/admin/audit", icon: Shield },
        ];

      case "admin":
        return [
          {
            title: "College Dashboard",
            href: "/admin/college-dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Class Management",
            href: "/admin/classes",
            icon: School,
            children: [
              {
                title: "My Classes",
                href: "/admin/classes/list",
                icon: BookOpen,
              },
              {
                title: "Create Class",
                href: "/admin/classes/create",
                icon: Users,
              },
              {
                title: "Class Templates",
                href: "/admin/classes/templates",
                icon: FileText,
              },
            ],
          },
          {
            title: "Student Management",
            href: "/admin/students",
            icon: GraduationCap,
            children: [
              {
                title: "Enrolled Students",
                href: "/admin/students/enrolled",
                icon: Users,
              },
              {
                title: "Bulk Import",
                href: "/admin/students/import",
                icon: FileVideo,
              },
              {
                title: "Student Progress",
                href: "/admin/students/progress",
                icon: BarChart3,
              },
            ],
          },
          {
            title: "Content Assignment",
            href: "/admin/content",
            icon: BookOpen,
            children: [
              {
                title: "Assign Videos",
                href: "/admin/content/assign-videos",
                icon: Video,
              },
              {
                title: "Assign Tests",
                href: "/admin/content/assign-tests",
                icon: ClipboardList,
              },
            ],
          },
          {
            title: "Reports",
            href: "/admin/reports",
            icon: BarChart3,
            children: [
              {
                title: "Class Performance",
                href: "/admin/reports/class-performance",
                icon: Activity,
              },
              {
                title: "Student Analytics",
                href: "/admin/reports/student-analytics",
                icon: BarChart3,
              },
            ],
          },
          { title: "Settings", href: "/admin/settings", icon: Settings },
        ];

      case "class_user":
        return [
          {
            title: "Class Dashboard",
            href: "/class/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "My Students",
            href: "/class/students",
            icon: Users,
            badge: "45",
          },
          {
            title: "Content Management",
            href: "/class/content",
            icon: BookOpen,
            children: [
              {
                title: "Assigned Videos",
                href: "/class/content/videos",
                icon: Video,
              },
              {
                title: "Test Management",
                href: "/class/content/tests",
                icon: FileText,
              },
              {
                title: "Progress Tracking",
                href: "/class/content/progress",
                icon: BarChart3,
              },
            ],
          },
          {
            title: "Student Performance",
            href: "/class/performance",
            icon: Trophy,
          },
          { title: "Class Reports", href: "/class/reports", icon: BarChart3 },
          { title: "Class Settings", href: "/class/settings", icon: Settings },
        ];

      case "student":
        return [
          {
            title: "My Dashboard",
            href: "/student/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "My Classes",
            href: "/student/classes",
            icon: School,
            badge: "3",
            children: [
              {
                title: "Mathematics 101",
                href: "/student/classes/math-101",
                icon: BookOpen,
              },
              {
                title: "Physics Advanced",
                href: "/student/classes/physics-adv",
                icon: BookOpen,
              },
              {
                title: "Chemistry Basic",
                href: "/student/classes/chemistry",
                icon: BookOpen,
              },
            ],
          },
          { title: "Video Library", href: "/student/videos", icon: Video },
          {
            title: "Test Center",
            href: "/student/tests",
            icon: FileText,
            badge: "2",
          },
          { title: "My Progress", href: "/student/progress", icon: BarChart3 },
          { title: "Schedule", href: "/student/schedule", icon: Calendar },
          {
            title: "Achievements",
            href: "/student/achievements",
            icon: Trophy,
          },
          {
            title: "Profile Settings",
            href: "/student/settings",
            icon: Settings,
          },
        ];

      default:
        return [];
    }
  };

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const hasActiveChild = (item: NavigationItem): boolean => {
    if (!item.children) return false;
    return item.children.some((child) => isActiveLink(child.href));
  };

  const navigationItems = userProfile
    ? getNavigationItems(userProfile.role)
    : [];

  const NavItem = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isActiveLink(item.href);
    const hasActiveChildItem = hasActiveChild(item);
    const isGroupOpen = openGroups.includes(item.title);

    if (hasChildren) {
      return (
        <Collapsible
          open={isGroupOpen}
          onOpenChange={() => toggleGroup(item.title)}
        >
          {/* <CollapsibleTrigger asChild>
            <Button
              variant={hasActiveChildItem ? "secondary" : "ghost"}
              className="w-full justify-start px-3"
              size="sm"
            >
         
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2 h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isGroupOpen ? (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-2 h-4 w-4" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger> */}
          {!isCollapsed && (
            <CollapsibleContent className="space-y-1 px-3">
              {item.children?.map((child, index) => {
                const active = isActiveLink(child.href);
                return (
                  <Link
                    key={index}
                    href={child.href}
                    className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <child.icon className="mr-3 h-4 w-4" />
                    {child.title}
                  </Link>
                );
              })}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <Link
        href={item.href}
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <item.icon className="mr-3 h-4 w-4" />
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-2 h-5 text-xs">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <div className={`bg-sidebar border-r border-sidebar-border ${className}`}>
      <RoleSwitcher isCollapsed={isCollapsed} />
      <ScrollArea className="h-full py-4">
        <div className="space-y-2 px-3">
          {navigationItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
