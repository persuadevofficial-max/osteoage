"use client";

import { useState } from "react";
import { Save, Users, Shield, Database } from "lucide-react";

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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ maxAnalysisPerDay: 100, sessionTimeout: 30, autoApproveUsers: false, requireEmailVerification: true });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const systemInfo = { version: "1.0.0", lastUpdate: "2024-09-26", totalUsers: 24, totalAnalysis: 1847, storageUsed: "12.4 GB", storageTotal: "100 GB" };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>시스템 설정</h1><p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>OsteoAge 시스템 환경 설정</p></div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90" style={{ backgroundColor: saved ? COLORS.accentGreen : COLORS.accent }}><Save size={18} />{saved ? "저장됨" : "설정 저장"}</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
          <div className="flex items-center gap-3 mb-6"><Users size={20} style={{ color: COLORS.accent }} /><h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>사용 제한</h2></div>
          <div className="space-y-4">
            <div><label className="block text-sm mb-2" style={{ color: COLORS.textSecondary }}>일일 최대 분석 횟수 (사용자당)</label><input type="number" value={settings.maxAnalysisPerDay} onChange={(e) => setSettings({ ...settings, maxAnalysisPerDay: parseInt(e.target.value) })} className="w-full px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }} /></div>
            <div><label className="block text-sm mb-2" style={{ color: COLORS.textSecondary }}>세션 타임아웃 (분)</label><input type="number" value={settings.sessionTimeout} onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })} className="w-full px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }} /></div>
          </div>
        </div>

        <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
          <div className="flex items-center gap-3 mb-6"><Shield size={20} style={{ color: COLORS.accent }} /><h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>회원 가입 설정</h2></div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div><span className="text-sm block" style={{ color: COLORS.textPrimary }}>자동 승인</span><span className="text-xs" style={{ color: COLORS.textMuted }}>신규 가입자 자동 승인 여부</span></div>
              <button onClick={() => setSettings({ ...settings, autoApproveUsers: !settings.autoApproveUsers })} className="w-12 h-6 rounded-full transition-all" style={{ backgroundColor: settings.autoApproveUsers ? COLORS.accent : COLORS.backgroundTertiary }}><div className="w-5 h-5 rounded-full bg-white transition-all" style={{ marginLeft: settings.autoApproveUsers ? "26px" : "2px" }} /></button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div><span className="text-sm block" style={{ color: COLORS.textPrimary }}>이메일 인증 필수</span><span className="text-xs" style={{ color: COLORS.textMuted }}>가입 시 이메일 인증 요구</span></div>
              <button onClick={() => setSettings({ ...settings, requireEmailVerification: !settings.requireEmailVerification })} className="w-12 h-6 rounded-full transition-all" style={{ backgroundColor: settings.requireEmailVerification ? COLORS.accent : COLORS.backgroundTertiary }}><div className="w-5 h-5 rounded-full bg-white transition-all" style={{ marginLeft: settings.requireEmailVerification ? "26px" : "2px" }} /></button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl col-span-2" style={{ backgroundColor: COLORS.backgroundSecondary }}>
          <div className="flex items-center gap-3 mb-6"><Database size={20} style={{ color: COLORS.accent }} /><h2 className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>시스템 정보</h2></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.backgroundTertiary }}><div className="text-xs mb-1" style={{ color: COLORS.textMuted }}>버전</div><div className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>v{systemInfo.version}</div></div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.backgroundTertiary }}><div className="text-xs mb-1" style={{ color: COLORS.textMuted }}>총 사용자</div><div className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>{systemInfo.totalUsers}명</div></div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.backgroundTertiary }}><div className="text-xs mb-1" style={{ color: COLORS.textMuted }}>총 분석 횟수</div><div className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>{systemInfo.totalAnalysis.toLocaleString()}회</div></div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.backgroundTertiary }}><div className="text-xs mb-1" style={{ color: COLORS.textMuted }}>마지막 업데이트</div><div className="text-lg font-semibold" style={{ color: COLORS.textPrimary }}>{systemInfo.lastUpdate}</div></div>
            <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor: COLORS.backgroundTertiary }}>
              <div className="text-xs mb-2" style={{ color: COLORS.textMuted }}>스토리지 사용량</div>
              <div className="flex items-center gap-3"><div className="flex-1 h-2 rounded-full" style={{ backgroundColor: COLORS.border }}><div className="h-full rounded-full" style={{ width: "12.4%", backgroundColor: COLORS.accent }} /></div><span className="text-sm" style={{ color: COLORS.textPrimary }}>{systemInfo.storageUsed} / {systemInfo.storageTotal}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
