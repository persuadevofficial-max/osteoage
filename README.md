# OsteoAge - 골연령 분석 시스템

[![Deploy to GitHub Pages](https://github.com/persuadevofficial-max/osteoage/actions/workflows/deploy.yml/badge.svg)](https://github.com/persuadevofficial-max/osteoage/actions/workflows/deploy.yml)

의료진을 위한 골연령 분석 및 성장 예측 웹 애플리케이션

## 🌐 Demo

**Live Demo:** [https://persuadevofficial-max.github.io/osteoage](https://persuadevofficial-max.github.io/osteoage)

**테스트 계정:**
- 의사: `doctor@test.com` / `1234`
- 관리자: `admin@test.com` / `1234`

## 📋 프로젝트 개요

OsteoAge는 소아의 손 X-ray 이미지를 기반으로 골연령을 분석하고 성인 예측 키를 계산하는 웹 기반 의료 소프트웨어입니다.

### 주요 기능

- ✅ 사용자 인증 (의사/관리자 역할 구분)
- ✅ 환자 정보 관리
- ✅ 골연령 분석 (1-18세)
- ✅ 성장 예측 알고리즘
- ✅ 성장 차트 시각화 (백분위 곡선, 과거 기록)
- ✅ 분석 리포트 생성 (A4 형식, PDF 출력)
- ✅ 관리자 대시보드 (회원 관리, 통계, 로그)

## 🏥 의료기기 규제 준수

본 프로젝트는 의료기기 소프트웨어 표준을 준수하여 개발되었습니다.

- **IEC 62304**: Medical Device Software Life Cycle
- **ISO 14971**: Risk Management
- **ISO 13485**: Quality Management Systems

### V&V 문서

전체 V&V 문서는 [`docs/v-and-v/`](./docs/v-and-v/) 폴더에서 확인하실 수 있습니다:

- [Software Requirements Specification (SRS)](./docs/v-and-v/SRS.md)
- [Risk Analysis](./docs/v-and-v/risk-analysis.md)
- [Verification Plan](./docs/v-and-v/verification/verification-plan.md)
- [Traceability Matrix](./docs/v-and-v/traceability-matrix.md)

**통계:**
- 21개 기능 요구사항 (100% 구현)
- 8개 위험 식별 및 완화
- 39개 테스트 케이스 정의
- 100% 추적성 커버리지

## 🛠️ 기술 스택

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## 🚀 개발 환경 설정

### 사전 요구사항

- Node.js 20+
- pnpm 8+

### 설치

```bash
# 저장소 클론
git clone https://github.com/persuadevofficial-max/osteoage.git
cd osteoage

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 빌드

```bash
# Production 빌드
pnpm run build

# 빌드 결과 확인
pnpm run start
```

## 📁 프로젝트 구조

```
osteoage/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/          # 로그인 페이지
│   │   │   └── signup/         # 회원가입 페이지
│   │   └── (dashboard)/
│   │       ├── doctor/         # 의사 페이지
│   │       │   ├── page.tsx    # 골연령 분석
│   │       │   ├── report/     # 리포트
│   │       │   └── settings/   # 설정
│   │       └── admin/          # 관리자 페이지
│   │           ├── users/      # 회원 관리
│   │           ├── analytics/  # 사용 현황
│   │           ├── logs/       # 분석 로그
│   │           └── settings/   # 시스템 설정
│   └── stores/
│       └── auth.ts             # 인증 스토어
├── docs/
│   └── v-and-v/                # V&V 문서
└── public/
    └── xraysample.jpeg         # X-ray 샘플 이미지
```

## 🔒 보안

- 역할 기반 접근 제어 (RBAC)
- 세션 관리 (localStorage)
- 클라이언트측 라우팅 보호

## 📊 성장 예측 알고리즘

```typescript
predictedHeight = currentHeight + (remainingYears × yearlyGrowth)
                  + geneticAdjustment × 0.15
                  + growthCurveAdjustment × 0.1
```

- `remainingYears`: 18세까지 남은 연수
- `yearlyGrowth`: 골연령에 따른 연간 성장률
  - < 12세: 5cm/년
  - 12-14세: 4cm/년
  - 14-16세: 2.5cm/년
  - > 16세: 1cm/년

## 📄 라이선스

이 프로젝트는 포트폴리오 목적으로 제작되었습니다.

## 👥 기여자

- **개발:** [persuadevofficial-max](https://github.com/persuadevofficial-max)
- **AI 협업:** Claude Opus 4.5

## 📞 문의

프로젝트 관련 문의사항은 GitHub Issues를 통해 연락 주시기 바랍니다.

---

**참고:** 본 소프트웨어는 데모/프로토타입 용도이며, 실제 의료 환경에서 사용하기 전에 완전한 검증 및 인허가가 필요합니다.
