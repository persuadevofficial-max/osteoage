"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  accent: "#3b82f6",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
  error: "#ef4444",
};

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    hospital: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      router.push("/login");
    }, 1000);
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
          <h1 className="text-2xl font-bold text-white">회원가입</h1>
          <p className="text-sm mt-2" style={{ color: COLORS.textSecondary }}>
            DrWAVE OsteoAge 서비스 가입
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.textPrimary,
                border: `1px solid ${COLORS.border}`,
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@hospital.com"
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.textPrimary,
                border: `1px solid ${COLORS.border}`,
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
              병원명
            </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              placeholder="OO병원"
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.textPrimary,
                border: `1px solid ${COLORS.border}`,
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
              연락처
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.textPrimary,
                border: `1px solid ${COLORS.border}`,
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 pr-12"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70"
                style={{ color: COLORS.textMuted }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.textSecondary }}>
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: COLORS.background,
                color: COLORS.textPrimary,
                border: `1px solid ${COLORS.border}`,
              }}
              required
            />
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
            {isLoading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: COLORS.accent }}>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
