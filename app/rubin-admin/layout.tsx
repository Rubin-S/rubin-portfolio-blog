import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth/session";
import { LayoutDashboard, FileText, PenTool, Library } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Server-Side Gatekeeping
  const session = await verifyAdminSession();

  if (!session) {
    // If logic fails, redirect to login immediately
    redirect("/login");
  }

  const navItems = [
    { href: "/rubin-admin", label: "Overview", icon: LayoutDashboard },
    { href: "/rubin-admin/posts", label: "Posts", icon: FileText },
    { href: "/rubin-admin/series", label: "Series", icon: Library },
    { href: "/rubin-admin/posts/new", label: "Write", icon: PenTool },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-muted/20">

      {/* Sidebar */}
      <aside className="w-full border-r border-border/50 bg-background md:w-64">
        <div className="flex h-14 items-center border-b border-border/50 px-6">
          <span className="font-semibold tracking-tight">Admin Console</span>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-3.5rem)] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-border/50">
            <div className="px-3 py-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">Logged in as</p>
              <p className="text-xs truncate text-foreground">{session.email}</p>
            </div>
            {/* Note: Logout usually requires a client component to call API, keeping it simple for layout now */}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="mx-auto max-w-5xl animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
