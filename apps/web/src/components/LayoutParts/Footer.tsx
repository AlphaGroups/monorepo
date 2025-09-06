"use client";
import Link from "next/link";
// import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <img src={logo} alt="Alpha Impact Labs" className="h-8 w-8" /> */}
              <span className="font-bold text-lg">Alpha Impact Labs</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering the future of learning through STEM education, construction, and supply chain excellence.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/stem-labs" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  STEM & Robotics Labs
                </Link>
              </li>
              <li>
                <Link href="/construction" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Construction Works
                </Link>
              </li>
              <li>
                <Link href="/bulk-supply" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Bulk Material Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#projects" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>Email: info@alphaimpactlabs.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Mumbai, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Alpha Impact Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;