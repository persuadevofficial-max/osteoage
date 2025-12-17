"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser, logout, User } from "@/stores/auth";
import {
  LogOut,
  User as UserIcon,
  Settings,
  FileText,
  Users,
  BarChart3,
  Home,
} from "lucide-react";
import Link from "next/link";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  accent: "#3b82f6",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!mounted || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  const doctorMenuItems = [
    { href: "/doctor", icon: Home, label: "분석 대시보드" },
    { href: "/doctor/settings", icon: Settings, label: "설정/계정" },
  ];

  const adminMenuItems = [
    { href: "/admin/users", icon: Users, label: "회원 관리" },
    { href: "/admin/analytics", icon: BarChart3, label: "사용 현황" },
    { href: "/admin/logs", icon: FileText, label: "분석 로그" },
    { href: "/admin/settings", icon: Settings, label: "시스템 설정" },
  ];

  const menuItems = isAdmin ? adminMenuItems : doctorMenuItems;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* Sidebar */}
      <aside
        className="w-56 min-h-screen border-r flex flex-col"
        style={{
          backgroundColor: COLORS.backgroundSecondary,
          borderColor: COLORS.border,
        }}
      >
        {/* Logo */}
        <div className="p-4 border-b" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: COLORS.accent }}
            >
              Dr
            </div>
            <div>
              <div className="text-white font-semibold text-sm">DrWAVE</div>
              <div className="text-xs" style={{ color: COLORS.textMuted }}>
                {isAdmin ? "Admin" : "OsteoAge"}
              </div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: isActive ? COLORS.accent : "transparent",
                    color: isActive ? COLORS.textPrimary : COLORS.textSecondary,
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: COLORS.accent }}
            >
              <UserIcon size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{user.name}</div>
              <div className="text-xs truncate" style={{ color: COLORS.textMuted }}>
                {user.email}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{ color: COLORS.textSecondary }}
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
