"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Github, Linkedin, Twitter } from "lucide-react"; // Icons
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Journal" },
    // Add "Projects" or "About" here later
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        
        {/* Logo Area */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Command className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Rubin S
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === route.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="/rubin-admin" // Secret door to admin
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}