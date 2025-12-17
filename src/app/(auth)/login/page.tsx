"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/stores/auth";
import { Eye, EyeOff } from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  accent: "#3b82f6",
  accentHover: "#2563eb",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
  error: "#ef4444",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        if (user.role === "admin") {
          router.push("/admin/users");
        } else {
          router.push("/doctor");
        }
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.background }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ backgroundColor: COLORS.backgroundSecondary }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4"
            style={{ backgroundColor: COLORS.accent }}
          >
            <span className="text-2xl font-bold text-white">Dr</span>
          </div>
          <h1 className="text-2xl font-bold text-white">DrWAVE OsteoAge</h1>
          <p className="text-sm mt-2" style={{ color: COLORS.textSecondary }}>
            골연령 분석 시스템
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: COLORS.textSecondary }}
            >
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@hospital.com"
              className="w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.textPrimary,
                border: `1px solid ${COLORS.border}`,
              }}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: COLORS.textSecondary }}
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 pr-12"
                style={{
                  backgroundColor: COLORS.background,
                  color: COLORS.textPrimary,
                  border: `1px solid ${COLORS.border}`,
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
                style={{ color: COLORS.textMuted }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm" style={{ color: COLORS.error }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: COLORS.accent }}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            계정이 없으신가요?{" "}
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: COLORS.accent }}
            >
              회원가입
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div
          className="mt-6 p-4 rounded-lg text-xs"
          style={{
            backgroundColor: COLORS.background,
            color: COLORS.textMuted,
          }}
        >
          <p className="font-medium mb-2">테스트 계정:</p>
          <p>의사: 아무 이메일/비밀번호</p>
          <p>관리자: admin@drwave.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
