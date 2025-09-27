"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";
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
  UserCog,
  Building2,
  Shield,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {UserProfile} from "@/services/interfaces"
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;

  userRole?: UserRole;


}

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

const NavItemComponent = React.memo(
  ({
    item,
    pathname,
    isCollapsed,
    openGroups,
    toggleGroup,
  }: {
    item: NavigationItem;
    pathname: string;
    isCollapsed: boolean;
    openGroups: string[];
    toggleGroup: (title: string) => void;
  }) => {
    const hasChildren = !!item.children?.length;
    const isActive =
      pathname === item.href || pathname.startsWith(item.href + "/");
    const isGroupOpen = openGroups.includes(item.title);

    const isActiveLink = (href: string) =>
      pathname === href || pathname.startsWith(href + "/");

    if (hasChildren) {
      return (
        <Collapsible
          open={isGroupOpen}
          onOpenChange={(open) => toggleGroup(item.title)}
        >
          {/* <CollapsibleTrigger asChild>
          <Button className="w-full justify-start px-3">
            <item.icon className="mr-3 h-4 w-4" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && <Badge className="ml-2">{item.badge}</Badge>}
                {isGroupOpen ? (
                  <ChevronDown className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-2 h-4 w-4" />
                )}
              </>
            )}
          </Button>
        </CollapsibleTrigger> */}
          <CollapsibleTrigger asChild>
            <Button
              variant="outline" // ✅ ensures default blue style
              className="w-full justify-start px-3"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && <Badge className="ml-2">{item.badge}</Badge>}
                  {isGroupOpen ? (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-2 h-4 w-4" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>

          {!isCollapsed && (
            <CollapsibleContent className="space-y-1 px-3">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors mt-2",
                    isActiveLink(child.href)
                      ? "bg-gray-50 text-gray-700"
                      : "hover:bg-blue-200 hover:text-gray-500"
                  )}
                >
                  <child.icon className="mr-3 h-4 w-4" />
                  {child.title}
                </Link>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          isActive
            ? "bg-gray50 text-gray-700"
            : "hover:bg-blue-200 hover:text-gray-500"
        )}
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
  }
);

const Sidebar = ({ className, isCollapsed = false }: SidebarProps) => {
  const { userProfile } = useAuth();
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>(["main"]);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupTitle)
        ? prev.filter((g) => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const navigationItems = useMemo(() => {
    if (!userProfile) return [];

    const role = userProfile.role;
    switch (role) {
      case "superadmin":
        return [
          {
            title: "Dashboard",
            href: "/admin/dashboard",
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
                href: "/admin/users/TeachersManagement",
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
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
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
            ],
          },
          { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        ];
      case "teacher":
        return [
          {
            title: "Dashboard",
            href: "/dashboards/teacher",
            icon: LayoutDashboard,
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
            ],
          },
          { title: "My Classes", href: "/teacher/classes", icon: School },
          { title: "Tests", href: "/teacher/tests", icon: FileText },
        ];
      case "student":
        return [
          {
            title: "Dashboard",
            href: "/student/dashboard",
            icon: LayoutDashboard,
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
            ],
          },
          { title: "My Courses", href: "", icon: School },
          { title: "Video Library", href: "", icon: Video },
        ];
      default:
        return [];
    }
  }, [userProfile]);

  return (
    <div
      className={`bg-gray-50 border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 ${className}`}
    >
      <RoleSwitcher isCollapsed={isCollapsed} />
      <ScrollArea className="h-full py-4">
        <div className="space-y-2 px-3">
          {navigationItems.map((item, index) => (
            <NavItemComponent
              key={`${item.title}-${index}`}
              item={item}
              pathname={pathname}
              isCollapsed={isCollapsed}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
