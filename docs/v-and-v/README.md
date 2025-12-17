# V&V Documentation
# OsteoAge 의료 소프트웨어 검증 및 유효성 확인 문서

**작성일:** 2025-12-17
**준거 규격:** IEC 62304, ISO 14971

---

## 📋 문서 개요

본 폴더는 OsteoAge 골연령 분석 시스템의 Verification & Validation (V&V) 문서를 포함합니다.

**V&V란?**
- **Verification (검증)**: "제품을 올바르게 만들고 있는가?" - 명세된 요구사항을 충족하는지 확인
- **Validation (유효성 확인)**: "올바른 제품을 만들고 있는가?" - 사용자의 실제 needs를 충족하는지 확인

---

## 📁 문서 구조

```
docs/v-and-v/
├── README.md                              # 본 파일
├── SRS.md                                 # 소프트웨어 요구사항 명세서
├── risk-analysis.md                       # 위험 분석 (ISO 14971)
├── traceability-matrix.md                 # 추적성 매트릭스
├── verification/
│   ├── verification-plan.md              # 검증 계획서
│   └── verification-report.md            # 검증 보고서 (작성 예정)
└── validation/
    ├── validation-plan.md                # 유효성 확인 계획서 (작성 예정)
    └── validation-report.md              # 유효성 확인 보고서 (작성 예정)
```

---

## 📄 주요 문서 설명

### 1. SRS.md - Software Requirements Specification
**목적:** 소프트웨어 요구사항을 체계적으로 정의

**내용:**
- 기능 요구사항 (FR-001 ~ FR-007)
  - FR-001: 사용자 인증
  - FR-002: 환자 정보 관리
  - FR-003: 골연령 분석
  - FR-004: 성장 예측
  - FR-005: 성장 차트 시각화
  - FR-006: 분석 리포트 생성
  - FR-007: 관리자 기능
- 비기능 요구사항 (NFR-001 ~ NFR-005)
  - 성능, 보안, 사용성, 호환성, 신뢰성

**준거:** IEC 62304 Section 5.2

---

### 2. risk-analysis.md - Risk Analysis
**목적:** 의료기기 소프트웨어의 위험을 식별하고 완화 조치 정의

**내용:**
- 8개 위험 식별 (RSK-001 ~ RSK-008)
- 심각도 × 발생가능성 = 위험 수준
- 완화 조치 및 잔여 위험 평가
- 모든 위험이 수용 가능한 범위로 완화됨

**준거:** ISO 14971 (Medical devices - Risk management)

---

### 3. traceability-matrix.md - Traceability Matrix
**목적:** 요구사항 → 설계 → 구현 → 테스트 → 위험 간의 추적성 제공

**내용:**
- 각 요구사항의 구현 위치 (파일명, 줄번호)
- 각 요구사항의 테스트 케이스
- 각 요구사항과 관련된 위험
- 100% 커버리지 달성

**준거:** IEC 62304 Section 5.7

---

### 4. verification/verification-plan.md - Verification Plan
**목적:** 검증 활동 계획 및 테스트 케이스 정의

**내용:**
- 검증 방법: 코드 리뷰, 정적 분석, 단위 테스트, 통합 테스트
- 39개 테스트 케이스 정의
- 합격 기준 정의

**준거:** IEC 62304 Section 5.5, 5.6

---

## 🎯 V&V 프로세스 흐름

```
1. 요구사항 정의 (SRS)
   ↓
2. 위험 분석 (Risk Analysis)
   ↓
3. 설계 및 구현
   ↓
4. 검증 (Verification)
   - 요구사항이 올바르게 구현되었는가?
   - 테스트 수행
   ↓
5. 유효성 확인 (Validation)
   - 사용자 needs를 충족하는가?
   - 실제 사용 시나리오 테스트
   ↓
6. 추적성 확인 (Traceability)
   - 모든 요구사항이 구현/테스트 되었는가?
   - 모든 위험이 완화되었는가?
```

---

## ✅ V&V 완료 체크리스트

### 문서화
- [x] SRS 작성
- [x] 위험 분석 작성
- [x] 검증 계획서 작성
- [x] 추적성 매트릭스 작성
- [ ] 검증 보고서 작성 (테스트 수행 후)
- [ ] 유효성 확인 계획서 작성
- [ ] 유효성 확인 보고서 작성

### 구현
- [x] 모든 FR 요구사항 구현 (21/21)
- [x] 모든 NFR 요구사항 구현 (7/7)
- [x] 모든 위험 완화 조치 구현 (8/8)

### 검증
- [ ] 테스트 케이스 수행 (0/39)
- [ ] 코드 리뷰 완료
- [ ] 정적 분석 통과 (TypeScript, ESLint)

---

## 📊 통계

| 항목 | 수량 | 완료율 |
|------|------|--------|
| 기능 요구사항 | 21 | 100% |
| 비기능 요구사항 | 7 | 100% |
| 식별된 위험 | 8 | 100% (완화) |
| 테스트 케이스 | 39 | 0% (계획 단계) |
| 문서 | 4/7 | 57% |

---

## 🔗 규제 준수

### IEC 62304 - Medical Device Software Life Cycle
- **Section 5.1**: Software Development Planning ✓
- **Section 5.2**: Software Requirements Analysis ✓
- **Section 5.3**: Software Architectural Design ✓
- **Section 5.4**: Software Detailed Design ✓
- **Section 5.5**: Software Unit Implementation and Verification ⏳
- **Section 5.6**: Software Integration and Integration Testing ⏳
- **Section 5.7**: Software System Testing ⏳
- **Section 5.8**: Software Release ⏳

### ISO 14971 - Risk Management
- **Section 3**: Risk Analysis ✓
- **Section 4**: Risk Evaluation ✓
- **Section 5**: Risk Control ✓
- **Section 6**: Residual Risk Evaluation ✓

---

## 👥 역할 및 책임

| 역할 | 책임 |
|------|------|
| 개발자 | 요구사항 구현, 단위 테스트 작성 |
| 검증 담당자 | 테스트 수행, 검증 보고서 작성 |
| 품질 관리자 | 문서 검토, 프로세스 준수 확인 |
| 승인자 | 최종 승인 |

---

## 📚 참고 자료

### 표준 문서
- IEC 62304:2006+AMD1:2015 - Medical device software - Software life cycle processes
- ISO 14971:2019 - Medical devices - Application of risk management to medical devices
- ISO 13485:2016 - Medical devices - Quality management systems

### 유용한 링크
- [OpenRegulatory Templates](https://openregulatory.com/collections/iec-62304-templates) - IEC 62304 템플릿
- [FDA Software Guidance](https://www.fda.gov/medical-devices/device-software-functions-including-mobile-medical-applications/software-medical-device-samd) - FDA 소프트웨어 가이드

---

## 📝 문서 작성 가이드

### 새로운 요구사항 추가 시
1. SRS.md에 요구사항 추가 (FR-XXX or NFR-XXX)
2. risk-analysis.md에서 관련 위험 검토
3. verification-plan.md에 테스트 케이스 추가
4. 구현 후 traceability-matrix.md 업데이트

### 버그 수정 시
1. 관련 요구사항 확인 (SRS.md)
2. 위험 재평가 (risk-analysis.md)
3. 테스트 케이스 업데이트 (verification-plan.md)
4. 추적성 매트릭스 업데이트

---

## 🚀 다음 단계

1. **검증 수행** (2025-12-18 ~ 12-19)
   - 테스트 케이스 수행
   - 검증 보고서 작성

2. **유효성 확인** (2025-12-20 ~ 12-21)
   - 실제 사용자 시나리오 테스트
   - 유효성 확인 보고서 작성

3. **최종 검토** (2025-12-22)
   - 문서 검토 및 승인
   - 릴리스 준비

---

## 📞 문의

V&V 문서 관련 문의사항은 프로젝트 담당자에게 연락하시기 바랍니다.

---

**문서 버전:** 1.0
**최종 업데이트:** 2025-12-17
