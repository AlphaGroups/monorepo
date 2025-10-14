import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  SidebarOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
  sidebarOpen?: boolean;
}

const Header = ({
  onToggleSidebar,
  showSidebarToggle = false,
  sidebarOpen = false,
}: HeaderProps) => {
  const { userProfile, logout } = useAuth();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 h-full">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {showSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="md:hidden"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <SidebarOpen className="h-5 w-5" />
            </Button>
          )}

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-heading font-semibold">
                EduPlatform
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Learning Management System
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Search Toggle - Now always visible on mobile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Search Bar - Full width overlay on mobile */}
          {isMobileSearchOpen && (
            <div className="md:hidden fixed inset-0 bg-background z-50 p-4">
              <div className="flex items-center mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileSearchOpen(false)}
                  aria-label="Close search"
                  className="mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses, videos, tests..."
                    className="pl-10 pr-4 py-6 text-lg bg-muted/50"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setIsMobileSearchOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Search Bar */}
          <div className="hidden md:block max-w-md flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses, videos, tests..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                >
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    {/* <AvatarImage src={userProfile?.avatar} alt={userProfile?.name} /> */}
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {userProfile?.name ? getInitials(userProfile.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userProfile?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userProfile?.email}
                    </p>
                    <Badge variant="secondary" className="w-fit text-xs mt-1">
                      {userProfile?.role.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />

                  <span href="profile">Profile</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
