"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const LMS_URL = process.env.NEXT_PUBLIC_LMS_URL || "/lms";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "STEM & Robotics Labs", href: "/stem-labs" },
    { name: "Construction Works", href: "/construction" },
    { name: "Bulk Material Supply", href: "/bulk-supply" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact Us", href: "/#contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/alpha-logo.jpg"
              alt="Alpha Groups Logo"
              width={60}
              height={60}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <Link href="/login">
              <Button
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Register
              </Button>
            </Link> */}

            <Link href={`${LMS_URL}/login`} target="_blank">
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                LMS Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary-light"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {/* <Link href="/login">
                <Button variant="hero" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  Register
                </Button>
              </Link>*/}

              <Link href={`${LMS_URL}/login`} target="_blank">
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  LMS Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
