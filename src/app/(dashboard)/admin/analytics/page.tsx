"use client";

import { TrendingUp, Users, FileText, Activity } from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  accent: "#3b82f6",
  accentGreen: "#22c55e",
  accentYellow: "#eab308",
  accentOrange: "#f97316",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
};

const stats = [
  { label: "총 분석 건수", value: "12,847", change: "+12.5%", icon: FileText, color: COLORS.accent },
  { label: "활성 사용자", value: "234", change: "+8.2%", icon: Users, color: COLORS.accentGreen },
  { label: "오늘 분석", value: "89", change: "+23.1%", icon: Activity, color: COLORS.accentYellow },
  { label: "평균 정확도", value: "94.2%", change: "+2.1%", icon: TrendingUp, color: COLORS.accentOrange },
];

const monthlyData = [
  { month: "1월", count: 980 }, { month: "2월", count: 1120 }, { month: "3월", count: 1350 },
  { month: "4월", count: 1180 }, { month: "5월", count: 1420 }, { month: "6월", count: 1580 },
  { month: "7월", count: 1320 }, { month: "8월", count: 1450 }, { month: "9월", count: 1680 },
];

const topHospitals = [
  { name: "삼성서울병원", count: 2345, percentage: 18 },
  { name: "서울아산병원", count: 1987, percentage: 15 },
  { name: "세브란스병원", count: 1654, percentage: 13 },
  { name: "서울대병원", count: 1432, percentage: 11 },
  { name: "가톨릭대병원", count: 1201, percentage: 9 },
];

export default function AdminAnalyticsPage() {
  const maxCount = Math.max(...monthlyData.map((d) => d.count));

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="mb-8"><h1 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>사용 현황</h1><p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>서비스 이용 통계 및 분석</p></div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
              <div className="flex items-center justify-between mb-4"><div className="p-2 rounded-lg" style={{ backgroundColor: stat.color + "20" }}><Icon size={20} style={{ color: stat.color }} /></div><span className="text-sm font-medium" style={{ color: COLORS.accentGreen }}>{stat.change}</span></div>
              <div className="text-2xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>{stat.value}</div>
              <div className="text-sm" style={{ color: COLORS.textSecondary }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
          <h2 className="text-lg font-semibold mb-6" style={{ color: COLORS.textPrimary }}>월별 분석 추이</h2>
          <div className="flex items-end gap-4 h-64">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg transition-all hover:opacity-80" style={{ height: `${(data.count / maxCount) * 100}%`, backgroundColor: COLORS.accent }} />
                <span className="text-xs" style={{ color: COLORS.textMuted }}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl" style={{ backgroundColor: COLORS.backgroundSecondary }}>
          <h2 className="text-lg font-semibold mb-6" style={{ color: COLORS.textPrimary }}>병원별 이용 현황</h2>
          <div className="space-y-4">
            {topHospitals.map((hospital, index) => (
              <div key={hospital.name}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm" style={{ color: COLORS.textSecondary }}>{index + 1}. {hospital.name}</span><span className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{hospital.count.toLocaleString()}건</span></div>
                <div className="h-2 rounded-full" style={{ backgroundColor: COLORS.border }}><div className="h-full rounded-full" style={{ width: `${hospital.percentage * 5}%`, backgroundColor: COLORS.accent }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
