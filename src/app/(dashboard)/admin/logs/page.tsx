"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  accent: "#3b82f6",
  accentGreen: "#22c55e",
  accentYellow: "#eab308",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
};

interface Log { id: string; timestamp: string; doctorName: string; hospital: string; patientId: string; action: string; boneAge: string; predictedHeight: number; confidence: number }

const mockLogs: Log[] = [
  { id: "1", timestamp: "2024-09-26 14:32:15", doctorName: "김영수", hospital: "삼성서울병원", patientId: "PT-2024-001", action: "분석 완료", boneAge: "11Y 8M", predictedHeight: 172.5, confidence: 94 },
  { id: "2", timestamp: "2024-09-26 14:28:42", doctorName: "이민호", hospital: "서울아산병원", patientId: "PT-2024-002", action: "분석 완료", boneAge: "9Y 3M", predictedHeight: 168.2, confidence: 91 },
  { id: "3", timestamp: "2024-09-26 14:15:33", doctorName: "박지현", hospital: "세브란스병원", patientId: "PT-2024-003", action: "분석 완료", boneAge: "13Y 0M", predictedHeight: 175.8, confidence: 96 },
  { id: "4", timestamp: "2024-09-26 13:58:21", doctorName: "최수진", hospital: "서울대병원", patientId: "PT-2024-004", action: "분석 완료", boneAge: "10Y 6M", predictedHeight: 165.3, confidence: 88 },
  { id: "5", timestamp: "2024-09-26 13:45:17", doctorName: "김영수", hospital: "삼성서울병원", patientId: "PT-2024-005", action: "분석 완료", boneAge: "12Y 2M", predictedHeight: 178.1, confidence: 93 },
];

export default function AdminLogsPage() {
  const [logs] = useState<Log[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter((log) => log.doctorName.includes(searchTerm) || log.hospital.includes(searchTerm) || log.patientId.includes(searchTerm));

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold" style={{ color: COLORS.textPrimary }}>분석 로그</h1><p className="text-sm mt-1" style={{ color: COLORS.textSecondary }}>모든 분석 기록 조회</p></div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.textMuted }} />
          <input type="text" placeholder="의사명, 병원, 환자ID 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundSecondary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundSecondary, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}><Filter size={16} />필터</button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: COLORS.backgroundSecondary }}>
        <table className="w-full">
          <thead><tr style={{ borderBottom: `1px solid ${COLORS.border}` }}><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>시간</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>의사</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>병원</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>환자 ID</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>뼈 나이</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>예측 키</th><th className="text-left px-6 py-4 text-sm font-medium" style={{ color: COLORS.textSecondary }}>신뢰도</th></tr></thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textMuted }}>{log.timestamp}</td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textPrimary }}>{log.doctorName}</td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textSecondary }}>{log.hospital}</td>
                <td className="px-6 py-4 text-sm font-mono" style={{ color: COLORS.textSecondary }}>{log.patientId}</td>
                <td className="px-6 py-4 text-sm" style={{ color: COLORS.textPrimary }}>{log.boneAge}</td>
                <td className="px-6 py-4 text-sm font-medium" style={{ color: COLORS.accentYellow }}>{log.predictedHeight} cm</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: log.confidence >= 90 ? COLORS.accentGreen + "20" : COLORS.accentYellow + "20", color: log.confidence >= 90 ? COLORS.accentGreen : COLORS.accentYellow }}>{log.confidence}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
