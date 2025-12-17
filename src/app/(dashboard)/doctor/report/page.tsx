"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer, Download } from "lucide-react";

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

interface ReportData {
  patient: { id: string; name: string; gender: string; birthDate: string; age: { years: number; months: number }; height: number; weight: number; measureDate: string };
  boneAge: { years: number; months: number };
  currentHeight: number;
  geneticHeight: number;
  growthCurveHeight: number;
  predictedHeight: number;
  osteoScore: number;
}

function GrowthChart({ currentAge, currentHeight, predictedHeight }: { currentAge: number; currentHeight: number; predictedHeight: number }) {
  const generateCurve = (percentile: number) => {
    const points = [];
    for (let age = 0; age <= 19; age++) {
      let height;
      if (age <= 2) height = 50 + age * 12 + percentile * 0.1;
      else if (age <= 10) height = 74 + (age - 2) * 6 + percentile * 0.15;
      else height = 122 + (age - 10) * 5.5 + percentile * 0.2;
      points.push({ age, height: Math.min(height, 220) });
    }
    return points;
  };
  const p3 = generateCurve(3), p50 = generateCurve(50), p97 = generateCurve(97);
  const toX = (age: number) => 40 + (age / 19) * 220;
  const toY = (height: number) => 180 - ((height - 40) / 180) * 160;
  const createPath = (points: { age: number; height: number }[]) => points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.age)} ${toY(p.height)}`).join(' ');

  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      {[60, 100, 140, 180, 220].map((h) => (<g key={h}><line x1="40" y1={toY(h)} x2="260" y2={toY(h)} stroke="#ddd" strokeWidth="0.5" /><text x="35" y={toY(h) + 3} fill="#666" fontSize="8" textAnchor="end">{h}</text></g>))}
      {[0, 5, 10, 15, 19].map((a) => (<g key={a}><line x1={toX(a)} y1="20" x2={toX(a)} y2="180" stroke="#ddd" strokeWidth="0.5" /><text x={toX(a)} y="195" fill="#666" fontSize="8" textAnchor="middle">{a}</text></g>))}
      <path d={`${createPath(p3)} L ${toX(19)} ${toY(p97[19].height)} ${p97.slice().reverse().map((p, i) => `L ${toX(19 - i)} ${toY(p.height)}`).join(' ')} Z`} fill="#22c55e" fillOpacity="0.1" />
      <path d={createPath(p3)} fill="none" stroke="#999" strokeWidth="1" strokeDasharray="3,3" />
      <path d={createPath(p50)} fill="none" stroke="#eab308" strokeWidth="1.5" />
      <path d={createPath(p97)} fill="none" stroke="#999" strokeWidth="1" strokeDasharray="3,3" />
      <circle cx={toX(currentAge)} cy={toY(currentHeight)} r="5" fill="#3b82f6" />
      <circle cx={toX(18)} cy={toY(predictedHeight)} r="5" fill="#22c55e" />
      <line x1={toX(currentAge)} y1={toY(currentHeight)} x2={toX(18)} y2={toY(predictedHeight)} stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" />
    </svg>
  );
}

export default function ReportPage() {
  const router = useRouter();
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("reportData");
    if (stored) setData(JSON.parse(stored));
    else router.push("/doctor");
  }, [router]);

  if (!data) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}><div className="text-white">Loading...</div></div>;

  const { patient, boneAge, currentHeight, geneticHeight, predictedHeight, osteoScore } = data;
  const chronologicalAge = patient.age.years + patient.age.months / 12;
  const boneAgeValue = boneAge.years + boneAge.months / 12;
  const ageDiff = boneAgeValue - chronologicalAge;

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm hover:opacity-70" style={{ color: COLORS.textSecondary }}><ArrowLeft size={18} />돌아가기</button>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: COLORS.backgroundSecondary, color: COLORS.textSecondary }}><Printer size={16} />인쇄</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white" style={{ backgroundColor: COLORS.accent }}><Download size={16} />PDF 저장</button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-xl" style={{ aspectRatio: "210/297" }}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: COLORS.accent }}>Dr</div>
                <div><div className="font-bold text-gray-800">DrWAVE OsteoAge</div><div className="text-xs text-gray-500">골연령 분석 리포트</div></div>
              </div>
              <div className="text-right text-sm text-gray-500"><div>분석일: {patient.measureDate}</div><div>리포트 ID: {patient.id}</div></div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">환자 정보</h3>
                <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">이름</span><span className="text-gray-800">{patient.name}</span></div><div className="flex justify-between"><span className="text-gray-500">성별</span><span className="text-gray-800">{patient.gender}</span></div><div className="flex justify-between"><span className="text-gray-500">생년월일</span><span className="text-gray-800">{patient.birthDate}</span></div><div className="flex justify-between"><span className="text-gray-500">현재 나이</span><span className="text-gray-800">{patient.age.years}세 {patient.age.months}개월</span></div></div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">신체 정보</h3>
                <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">현재 키</span><span className="text-gray-800">{currentHeight} cm</span></div><div className="flex justify-between"><span className="text-gray-500">현재 체중</span><span className="text-gray-800">{patient.weight} kg</span></div><div className="flex justify-between"><span className="text-gray-500">뼈 나이</span><span className="text-gray-800 font-medium">{boneAge.years}세 {boneAge.months}개월</span></div><div className="flex justify-between"><span className="text-gray-500">유전적 예측 키</span><span className="text-gray-800">{geneticHeight} cm</span></div></div>
              </div>
            </div>

            <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: "#f0f9ff" }}>
              <div className="flex items-center justify-between">
                <div><div className="text-sm text-gray-600 mb-1">최종 예측 키</div><div className="text-4xl font-bold" style={{ color: COLORS.accent }}>{predictedHeight} <span className="text-lg text-gray-500">cm</span></div></div>
                <div className="text-right"><div className="text-sm text-gray-600 mb-1">AI 신뢰도</div><div className="text-2xl font-bold" style={{ color: COLORS.accentGreen }}>{osteoScore}<span className="text-sm text-gray-500">/100</span></div></div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border"><h3 className="text-sm font-semibold text-gray-700 mb-3">성장 곡선</h3><div className="h-40"><GrowthChart currentAge={chronologicalAge} currentHeight={currentHeight} predictedHeight={predictedHeight} /></div></div>
              <div className="p-4 rounded-lg border"><h3 className="text-sm font-semibold text-gray-700 mb-3">분석 소견</h3><p className="text-sm text-gray-600 leading-relaxed">{patient.name} 환자의 골연령 분석 결과, 현재 생물학적 나이({chronologicalAge.toFixed(1)}세) 대비 뼈 나이가 {ageDiff > 0 ? `${Math.abs(ageDiff).toFixed(1)}년 빠른` : ageDiff < 0 ? `${Math.abs(ageDiff).toFixed(1)}년 느린` : "동일한"} 것으로 나타났습니다. 유전적 요인과 현재 성장 추세를 종합하여 최종 예측 키는 {predictedHeight}cm로 분석됩니다.</p></div>
            </div>

            <div className="mt-6 pt-4 border-t text-center text-xs text-gray-400">본 리포트는 AI 기반 분석 결과이며, 최종 진단은 담당 의료진과 상담하시기 바랍니다. © 2024 DrWAVE OsteoAge</div>
          </div>
        </div>
      </div>
    </div>
  );
}
