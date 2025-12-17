"use client";

import { useState } from "react";
import { Save, User, Bell, Shield } from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  backgroundTertiary: "#1a2942",
  accent: "#3b82f6",
  accentGreen: "#22c55e",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
};

export default function DoctorSettingsPage() {
  const [profile, setProfile] = useState({
    name: "김영수",
    email: "dr.kim@samsunghospital.com",
    hospital: "삼성서울병원",
    phone: "010-1234-5678",
    specialty: "소아청소년과",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    reportComplete: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>
              설정
            </h1>
            <p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>
              계정 및 알림 설정을 관리합니다
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: saved ? COLORS.accentGreen : COLORS.accent }}
          >
            <Save size={18} />
            {saved ? "저장됨" : "저장"}
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
            <div className="flex items-center gap-3 mb-6">
              <User size={20} style={{ color: COLORS.accent }} />
              <h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
                프로필 정보
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: COLORS.textSecondary }}>
                  이름
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: COLORS.backgroundTertiary,
                    color: COLORS.textPrimary,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: COLORS.textSecondary }}>
                  이메일
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: COLORS.backgroundTertiary,
                    color: COLORS.textPrimary,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: COLORS.textSecondary }}>
                  병원
                </label>
                <input
                  type="text"
                  value={profile.hospital}
                  onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: COLORS.backgroundTertiary,
                    color: COLORS.textPrimary,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: COLORS.textSecondary }}>
                  연락처
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: COLORS.backgroundTertiary,
                    color: COLORS.textPrimary,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} style={{ color: COLORS.accent }} />
              <h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
                알림 설정
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm" style={{ color: COLORS.textPrimary }}>이메일 알림</div>
                  <div className="text-xs" style={{ color: COLORS.textMuted }}>분석 완료 시 이메일 수신</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className="w-12 h-6 rounded-full transition-all"
                  style={{ backgroundColor: notifications.email ? COLORS.accent : COLORS.backgroundTertiary }}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-white transition-all"
                    style={{ marginLeft: notifications.email ? "26px" : "2px" }}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm" style={{ color: COLORS.textPrimary }}>분석 완료 알림</div>
                  <div className="text-xs" style={{ color: COLORS.textMuted }}>AI 분석 완료 시 알림</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, reportComplete: !notifications.reportComplete })}
                  className="w-12 h-6 rounded-full transition-all"
                  style={{ backgroundColor: notifications.reportComplete ? COLORS.accent : COLORS.backgroundTertiary }}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-white transition-all"
                    style={{ marginLeft: notifications.reportComplete ? "26px" : "2px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} style={{ color: COLORS.accent }} />
              <h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>
                보안
              </h2>
            </div>
            <button
              className="px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: COLORS.backgroundTertiary,
                color: COLORS.textSecondary,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
