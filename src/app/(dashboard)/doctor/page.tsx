"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Calendar,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";

const COLORS = {
  background: "#0a1628",
  backgroundSecondary: "#111d32",
  backgroundTertiary: "#1a2942",
  accent: "#3b82f6",
  accentHover: "#2563eb",
  accentGreen: "#22c55e",
  accentYellow: "#eab308",
  accentOrange: "#f97316",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  border: "#1e3a5f",
};

const mockPatient = {
  id: "HY1008_2024090645_MT",
  name: "김민준",
  gender: "남",
  birthDate: "2015-03-15",
  age: { years: 9, months: 11 },
  height: 138,
  weight: 34,
  measureDate: "2024-09-26",
};

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="cursor-help">
        {children}
      </div>
      {show && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50"
          style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${COLORS.border}` }} />
        </div>
      )}
    </div>
  );
}

function InteractiveSlider({ label, value, onChange, min = 100, max = 200, percentile, color = COLORS.accent, unit = "cm", editable = false, tooltip }: {
  label: string; value: number; onChange?: (value: number) => void; min?: number; max?: number; percentile: number; color?: string; unit?: string; editable?: boolean; tooltip?: string;
}) {
  const sliderPercent = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 text-sm flex items-center gap-1" style={{ color: COLORS.textSecondary }}>
        {label}
        {tooltip && <Tooltip text={tooltip}><HelpCircle size={12} style={{ color: COLORS.textMuted }} className="hover:text-white transition-colors" /></Tooltip>}
      </div>
      <div className="flex-1 flex items-center gap-3">
        <span className="text-sm w-20 font-medium" style={{ color: COLORS.textPrimary }}>{value.toFixed(1)} <span className="text-xs" style={{ color: COLORS.textMuted }}>{unit}</span></span>
        <span className="text-xs" style={{ color: COLORS.textMuted }}>기준(0)</span>
        <div className="flex-1 relative h-2">
          <div className="absolute inset-0 rounded-full" style={{ backgroundColor: COLORS.backgroundTertiary }} />
          <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${sliderPercent}%`, backgroundColor: color }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2" style={{ left: `calc(${sliderPercent}% - 8px)`, backgroundColor: color, borderColor: COLORS.textPrimary, boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
          {editable && <input type="range" min={min} max={max} step={0.5} value={value} onChange={(e) => onChange?.(parseFloat(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer" />}
        </div>
        <span className="text-sm w-8 text-right" style={{ color: COLORS.textPrimary }}>{percentile}</span>
        <span className="text-xs" style={{ color: COLORS.textMuted }}>표(100)</span>
      </div>
    </div>
  );
}

function GrowthChart({ currentAge, currentHeight, boneAge, predictedHeight }: { currentAge: number; currentHeight: number; boneAge: number; predictedHeight: number }) {
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
  const toX = (age: number) => 50 + (age / 19) * 280;
  const toY = (height: number) => 280 - ((height - 40) / 180) * 250;
  const createPath = (points: { age: number; height: number }[]) => points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.age)} ${toY(p.height)}`).join(' ');

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 350 320" className="w-full h-full">
        {[40, 80, 120, 160, 200, 220].map((h) => (<g key={h}><line x1="50" y1={toY(h)} x2="330" y2={toY(h)} stroke={COLORS.border} strokeWidth="0.5" /><text x="45" y={toY(h) + 4} fill={COLORS.textMuted} fontSize="10" textAnchor="end">{h}</text></g>))}
        {[0, 5, 10, 15, 19].map((a) => (<g key={a}><line x1={toX(a)} y1="30" x2={toX(a)} y2="280" stroke={COLORS.border} strokeWidth="0.5" /><text x={toX(a)} y="295" fill={COLORS.textMuted} fontSize="10" textAnchor="middle">{a}</text></g>))}
        <text x="20" y="155" fill={COLORS.textMuted} fontSize="10" transform="rotate(-90, 20, 155)">키 (cm)</text>
        <text x="190" y="315" fill={COLORS.textMuted} fontSize="10" textAnchor="middle">나이</text>
        <path d={`${createPath(p3)} L ${toX(19)} ${toY(p97[19].height)} ${p97.slice().reverse().map((p, i) => `L ${toX(19 - i)} ${toY(p.height)}`).join(' ')} Z`} fill={COLORS.accentGreen} fillOpacity="0.1" />
        <path d={createPath(p3)} fill="none" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="4,4" />
        <path d={createPath(p50)} fill="none" stroke={COLORS.accentYellow} strokeWidth="2" />
        <path d={createPath(p97)} fill="none" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="4,4" />
        <circle cx={toX(currentAge)} cy={toY(currentHeight)} r="6" fill={COLORS.accent} />
        <circle cx={toX(boneAge)} cy={toY(currentHeight)} r="4" fill={COLORS.accentOrange} />
        <circle cx={toX(18)} cy={toY(predictedHeight)} r="6" fill={COLORS.accentGreen} />
        <line x1={toX(currentAge)} y1={toY(currentHeight)} x2={toX(18)} y2={toY(predictedHeight)} stroke={COLORS.accent} strokeWidth="1" strokeDasharray="4,4" />
      </svg>
    </div>
  );
}

export default function DoctorDashboard() {
  const router = useRouter();
  const [patient] = useState(mockPatient);
  const [boneAgeYears, setBoneAgeYears] = useState(11);
  const [boneAgeMonths, setBoneAgeMonths] = useState(8);
  const [currentHeight, setCurrentHeight] = useState(138);
  const [geneticHeight, setGeneticHeight] = useState(168);
  const [growthCurveHeight, setGrowthCurveHeight] = useState(166.1);
  const [viewMode, setViewMode] = useState<"slider" | "chart">("slider");

  const boneAge = boneAgeYears + boneAgeMonths / 12;
  const chronologicalAge = patient.age.years + patient.age.months / 12;
  const boneAgeDiff = boneAge - chronologicalAge;

  const currentHeightPercentile = Math.min(Math.max(Math.round((currentHeight - 100) / 1.2), 0), 100);
  const geneticHeightPercentile = Math.min(Math.max(Math.round((geneticHeight - 140) / 0.8), 0), 100);
  const growthCurvePercentile = Math.min(Math.max(Math.round((growthCurveHeight - 140) / 0.8), 0), 100);

  const predictedHeight = useMemo(() => {
    const adultAge = 18;
    const remainingYears = Math.max(0, adultAge - boneAge);
    const yearlyGrowth = boneAge < 12 ? 5 : boneAge < 14 ? 4 : boneAge < 16 ? 2.5 : 1;
    const basePredict = currentHeight + (remainingYears * yearlyGrowth);
    const geneticWeight = (geneticHeight - 168) * 0.15;
    const growthWeight = (growthCurveHeight - 166) * 0.1;
    const finalPredict = basePredict + geneticWeight + growthWeight;
    return Math.round(Math.max(currentHeight, finalPredict) * 10) / 10;
  }, [currentHeight, boneAge, geneticHeight, growthCurveHeight]);

  const geneticAdjustment = (geneticHeight - 168) * 0.3;
  const growthAdjustment = (growthCurveHeight - 166) * 0.2;
  const predictedHeightPercentile = Math.min(Math.max(Math.round((predictedHeight - 140) / 1), 0), 100);
  const osteoScore = 86;

  const analysisDescription = useMemo(() => {
    const ageDiff = Math.abs(boneAgeDiff);
    const diffText = boneAgeDiff > 0 ? `${ageDiff.toFixed(1)}년 많습니다` : boneAgeDiff < 0 ? `${ageDiff.toFixed(1)}년 적습니다` : "같습니다";
    return `${patient.name} 님의 생물학 나이(${chronologicalAge.toFixed(1)}세)보다 뼈 나이가 ${diffText}. 예상되는 예측 키는 ${predictedHeight}cm 입니다.`;
  }, [patient.name, chronologicalAge, boneAgeDiff, predictedHeight]);

  const handleGenerateReport = () => {
    sessionStorage.setItem("reportData", JSON.stringify({ patient, boneAge: { years: boneAgeYears, months: boneAgeMonths }, currentHeight, geneticHeight, growthCurveHeight, predictedHeight, osteoScore }));
    router.push("/doctor/report");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <div className="flex items-center gap-6 px-6 py-3 border-b text-sm" style={{ backgroundColor: COLORS.backgroundSecondary, borderColor: COLORS.border, color: COLORS.textSecondary }}>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"><span>{"<"}</span><span>이전기록</span><ChevronDown size={14} /></div>
        <div className="flex items-center gap-1"><span className="text-xs" style={{ color: COLORS.textMuted }}>ID</span><span>{patient.id}</span></div>
        <div>환자명: <span className="text-white">{patient.name}</span></div>
        <div>성별: <span className="text-white">{patient.gender}</span></div>
        <div>나이: <span className="text-white">{patient.age.years}Y {patient.age.months}M</span></div>
        <div>몸무게: <span className="text-white">{patient.weight}kg</span></div>
        <div>키: <span className="text-white">{patient.height}cm</span></div>
        <div className="flex items-center gap-1"><Calendar size={14} />생년월일: <span className="text-white">{patient.birthDate}</span></div>
        <div>분석일: <span className="text-white">{patient.measureDate}</span></div>
        <button onClick={() => { localStorage.removeItem("user"); router.push("/login"); }} className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors" title="로그아웃"><LogOut size={18} style={{ color: COLORS.textSecondary }} /></button>
      </div>

      <div className="flex">
        <div className="w-1/3 p-6 border-r" style={{ borderColor: COLORS.border }}>
          <div className="text-sm mb-2" style={{ color: COLORS.textMuted }}>{patient.measureDate}</div>
          <div className="aspect-square rounded-lg flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#0a0a1a" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/xray/hand.jpeg" alt="X-ray" className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="absolute bottom-4 left-4 text-xs" style={{ color: COLORS.textMuted }}>{patient.measureDate}</div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs" style={{ color: COLORS.textMuted }}>L</span>
            <span className="text-xs" style={{ color: COLORS.textMuted }}>좌측 손</span>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-sm mb-1" style={{ color: COLORS.textSecondary }}>최종 예측 키</div>
              <div className="flex items-baseline gap-2"><span className="text-7xl font-bold" style={{ color: COLORS.accentYellow }}>{predictedHeight}</span><span className="text-2xl" style={{ color: COLORS.textMuted }}>cm</span></div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm" style={{ color: COLORS.textSecondary }}>현재 나이: <span className="text-white">{patient.age.years}Y {patient.age.months}M</span></div>
              <div className="text-sm" style={{ color: COLORS.textSecondary }}>뼈 나이(BA): <span className="text-white font-medium">{boneAgeYears}Y {boneAgeMonths.toString().padStart(2, "0")}M</span></div>
              <div className="text-sm flex items-center gap-1 justify-end" style={{ color: COLORS.textSecondary }}>유전적 예측 키: <span className="text-white">{geneticHeight}</span><span className="text-xs" style={{ color: COLORS.textMuted }}>cm</span><Tooltip text="부모님 키 기반 유전적 예측"><HelpCircle size={12} style={{ color: COLORS.accent }} /></Tooltip></div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm" style={{ color: COLORS.textSecondary }}>뼈 나이 예측(의사)</span>
            <select className="px-3 py-1.5 rounded text-sm" style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }} value={boneAgeYears} onChange={(e) => setBoneAgeYears(parseInt(e.target.value))}>
              {Array.from({ length: 18 }, (_, i) => i + 1).map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <span style={{ color: COLORS.textSecondary }}>Y</span>
            <select className="px-3 py-1.5 rounded text-sm" style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textPrimary, border: `1px solid ${COLORS.border}` }} value={boneAgeMonths} onChange={(e) => setBoneAgeMonths(parseInt(e.target.value))}>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <span style={{ color: COLORS.textSecondary }}>M</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm" style={{ color: COLORS.textSecondary }}>Osteo점수</span>
            <span style={{ color: COLORS.accentYellow }} className="font-medium">{osteoScore}/100 점</span>
            <Tooltip text="AI 분석 신뢰도"><HelpCircle size={14} style={{ color: COLORS.accent }} /></Tooltip>
          </div>

          <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: COLORS.backgroundSecondary }}>
            <div className="text-sm mb-2" style={{ color: COLORS.textSecondary }}>분석 Description</div>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>{analysisDescription}</p>
          </div>

          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: COLORS.backgroundTertiary }}>
              <button className="px-3 py-1.5 rounded text-sm transition-all hover:opacity-80" style={{ backgroundColor: viewMode === "slider" ? COLORS.accent : "transparent", color: viewMode === "slider" ? COLORS.textPrimary : COLORS.textSecondary }} onClick={() => setViewMode("slider")}>수치</button>
              <button className="px-3 py-1.5 rounded text-sm transition-all hover:opacity-80" style={{ backgroundColor: viewMode === "chart" ? COLORS.accent : "transparent", color: viewMode === "chart" ? COLORS.textPrimary : COLORS.textSecondary }} onClick={() => setViewMode("chart")}>차트</button>
            </div>
          </div>

          {viewMode === "slider" ? (
            <>
              <div className="space-y-5 mb-6">
                <InteractiveSlider label="현재 키" value={currentHeight} onChange={setCurrentHeight} min={100} max={180} percentile={currentHeightPercentile} editable tooltip="현재 측정된 키" />
                <InteractiveSlider label="유전 기반 예측 키" value={geneticHeight} onChange={setGeneticHeight} min={140} max={220} percentile={geneticHeightPercentile} color={COLORS.accentGreen} editable tooltip="부모님 키 기반" />
                <InteractiveSlider label="성장곡선기반 예측키" value={growthCurveHeight} onChange={setGrowthCurveHeight} min={140} max={220} percentile={growthCurvePercentile} color={COLORS.accentOrange} editable tooltip="표준 성장곡선 기반" />
              </div>
              <div className="flex gap-4 mb-6">
                <button className="px-4 py-2 rounded text-sm transition-all hover:bg-white/5" style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}>유전기반 보정값: {geneticAdjustment >= 0 ? "+" : ""}{geneticAdjustment.toFixed(1)}cm</button>
                <button className="px-4 py-2 rounded text-sm transition-all hover:bg-white/5" style={{ backgroundColor: COLORS.backgroundTertiary, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}>성장속도 기반 보정값: {growthAdjustment >= 0 ? "+" : ""}{growthAdjustment.toFixed(1)}cm</button>
              </div>
              <InteractiveSlider label="최종 예측 키" value={predictedHeight} min={140} max={240} percentile={predictedHeightPercentile} color={COLORS.accentYellow} tooltip="종합 최종 예측" />
            </>
          ) : (
            <div className="h-80 rounded-lg p-4" style={{ backgroundColor: COLORS.backgroundSecondary }}>
              <GrowthChart currentAge={chronologicalAge} currentHeight={currentHeight} boneAge={boneAge} predictedHeight={predictedHeight} />
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.accent }} /><span style={{ color: COLORS.textMuted }}>현재 위치</span></div>
                <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.accentOrange }} /><span style={{ color: COLORS.textMuted }}>뼈 나이 기준</span></div>
                <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.accentGreen }} /><span style={{ color: COLORS.textMuted }}>예측 성인키</span></div>
              </div>
            </div>
          )}

          <button onClick={handleGenerateReport} className="w-full mt-8 py-3 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg cursor-pointer" style={{ backgroundColor: COLORS.accent }}>
            분석결과 Report <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
