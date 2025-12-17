"use client";

import { useState } from "react";
import { Search, Check, X, MoreVertical } from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  backgroundTertiary: "#1a2942",
  accent: "#3b82f6",
  accentGreen: "#22c55e",
  accentRed: "#ef4444",
  accentYellow: "#eab308",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
};

interface User {
  id: string;
  email: string;
  hospitalName: string;
  doctorName: string;
  phone: string;
  status: "active" | "pending" | "blocked";
  createdAt: string;
  lastLogin: string;
  analysisCount: number;
}

const mockUsers: User[] = [
  { id: "1", email: "dr.kim@samsunghospital.com", hospitalName: "삼성서울병원", doctorName: "김영수", phone: "010-1234-5678", status: "active", createdAt: "2024-01-15", lastLogin: "2024-09-26 14:30", analysisCount: 234 },
  { id: "2", email: "dr.lee@asan.com", hospitalName: "서울아산병원", doctorName: "이민호", phone: "010-2345-6789", status: "active", createdAt: "2024-02-20", lastLogin: "2024-09-26 10:15", analysisCount: 189 },
  { id: "3", email: "dr.park@severance.com", hospitalName: "세브란스병원", doctorName: "박지현", phone: "010-3456-7890", status: "pending", createdAt: "2024-09-25", lastLogin: "-", analysisCount: 0 },
  { id: "4", email: "dr.choi@snuh.com", hospitalName: "서울대병원", doctorName: "최수진", phone: "010-4567-8901", status: "active", createdAt: "2024-03-10", lastLogin: "2024-09-25 16:45", analysisCount: 312 },
  { id: "5", email: "dr.jung@catholic.com", hospitalName: "가톨릭대병원", doctorName: "정현우", phone: "010-5678-9012", status: "blocked", createdAt: "2024-04-05", lastLogin: "2024-08-15 09:20", analysisCount: 45 },
];

export default function AdminUsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.doctorName.includes(searchTerm) || user.hospitalName.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const styles = { active: { bg: COLORS.accentGreen + "20", color: COLORS.accentGreen, text: "활성" }, pending: { bg: COLORS.accentYellow + "20", color: COLORS.accentYellow, text: "대기" }, blocked: { bg: COLORS.accentRed + "20", color: COLORS.accentRed, text: "차단" } };
    const s = styles[status as keyof typeof styles];
    return <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: s.bg, color: s.color }}>{s.text}</span>;
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>회원 관리</h1><p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>총 {users.length}명의 회원</p></div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.textMuted }} />
          <input type="text" placeholder="이름, 이메일, 병원명 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundSecondary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }} />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundSecondary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }}>
          <option value="all">전체 상태</option>
          <option value="active">활성</option>
          <option value="pending">승인 대기</option>
          <option value="blocked">차단</option>
        </select>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: COLORS.backgroundSecondary }}>
        <table className="w-full">
          <thead><tr style={{ borderBottom: `1px solid ${COLORS.border}` }}><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>회원 정보</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>병원</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>연락처</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>상태</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>분석 횟수</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>최근 접속</th><th className="px-6 py-4"></th></tr></thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td className="px-6 py-4"><div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{user.doctorName}</div><div className="text-xs" style={{ color: COLORS.textMuted }}>{user.email}</div></td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textSecondary }}>{user.hospitalName}</td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textSecondary }}>{user.phone}</td>
                <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textPrimary }}>{user.analysisCount}회</td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textMuted }}>{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.status === "pending" && (<><button className="p-1 rounded hover:bg-white/10" style={{ color: COLORS.accentGreen }}><Check size={16} /></button><button className="p-1 rounded hover:bg-white/10" style={{ color: COLORS.accentRed }}><X size={16} /></button></>)}
                    <button className="p-1 rounded hover:bg-white/10" style={{ color: COLORS.textMuted }}><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
