# 에듀미러 (Edu-Mirror) - 프론트엔드

AI 기반 발표 진단 플랫폼 "에듀미러"의 프론트엔드 애플리케이션입니다.

## 🎯 프로젝트 소개

"말하는 순간, 배움이 보인다!"

에듀미러는 AI 기술을 활용하여 학생들의 발표 능력을 종합적으로 분석하고 맞춤형 피드백을 제공하는 교육 플랫폼입니다.

## 🚀 주요 기능

### 학생용 기능
- **발표 시뮬레이션**: 실제와 같은 발표 환경에서 연습
- **AI 분석**: 음성, 시선, 제스처 등 다각도 분석
- **실시간 피드백**: 발표 중 즉시 가이드 제공
- **성장 추적**: 개인별 발표 실력 향상 기록

### 교사/부모용 기능
- **학생 관리**: 다수 학생의 발표 현황 모니터링
- **상세 리포트**: AI 분석 결과 기반 맞춤형 지도 방안
- **진도 관리**: 학생별 학습 계획 및 목표 설정

## 🛠️ 기술 스택

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Charts**: Recharts
- **Icons**: Lucide React
- **Design**: Figma API 연동

## 📱 구현된 화면

1. **스플래쉬 화면** (`SplashScreen.tsx`)
   - 브랜드 아이덴티티 표현
   - 격자 패턴 배경과 로고

2. **메인 대시보드** (`Dashboard.tsx`)
   - 성장 그래프 및 성취도 표시
   - 추천 발표 테마 제공

3. **발표 시뮬레이션** (`PresentationSimulation.tsx`)
   - 실시간 웹캠/마이크 제어
   - AI 예상 질문 시뮬레이션
   - 실시간 분석 표시

4. **로그인 페이지** (`LoginPage.tsx`)
   - 일반/교사 계정 구분
   - 소셜 로그인 연동

## 🔧 설치 및 실행

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn
- 백엔드 서버 실행 필요 (http://localhost:8000)

### 설치
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 백엔드 서버 주소 확인/수정
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속

### 빌드
```bash
npm run build
```

### ⚠️ 백엔드 연동 필요
프론트엔드 실행 전에 백엔드 서버가 실행되어 있어야 합니다.
자세한 내용은 `BACKEND_SETUP_GUIDE.md` 참고

## 📁 프로젝트 구조

```
src/
├── api/                      # 🆕 API 연동 레이어
│   ├── config.ts            # API 설정 및 엔드포인트
│   ├── client.ts            # HTTP 클라이언트
│   ├── authService.ts       # 인증 API
│   ├── sessionService.ts    # 세션 API
│   ├── analysisService.ts   # 분석 API
│   └── index.ts            # 통합 export
├── components/
│   ├── SplashScreen.tsx      # 스플래쉬 화면
│   ├── Dashboard.tsx         # 메인 대시보드
│   ├── PresentationSimulation.tsx  # 발표 시뮬레이션
│   ├── LoginPage.tsx         # 로그인 페이지
│   ├── LoginButton.tsx       # 로그인 버튼 컴포넌트
│   └── SocialLogin.tsx       # 소셜 로그인 컴포넌트
├── App.tsx                   # 메인 앱 컴포넌트
├── main.tsx                  # 앱 진입점
└── index.css                 # 전역 스타일

# 루트 디렉토리
├── .env.example              # 환경 변수 템플릿
├── API_INTEGRATION_GUIDE.md  # API 연동 가이드
└── BACKEND_SETUP_GUIDE.md    # 백엔드 설정 가이드
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: `#74CD79` (에듀미러 그린)
- **Secondary**: `#94C7FF` (블루)
- **Background**: `#F9F9F9` (라이트 그레이)

### 폰트
- **Primary**: Pretendard (한국어)
- **Logo**: Love Ya Like A Sister (영문)

## 🔄 페이지 플로우

1. **Splash Screen** (3초) → **Login Page**
2. **Login** → **Dashboard**
3. **Dashboard** → **Presentation Simulation**

임시로 좌상단에 페이지 전환 버튼이 있습니다. (개발용)

## 📝 다음 단계

### ✅ 완료된 작업
- [x] API 클라이언트 구조 설계
- [x] 환경 변수 설정
- [x] JWT 토큰 기반 인증 시스템
- [x] 인증/세션/분석 API 서비스 구현

### 🔄 진행 중 (백엔드 준비 대기)
- [ ] 백엔드 CORS 설정 확인
- [ ] API 엔드포인트 동작 테스트
- [ ] 컴포넌트에 실제 API 연동

### 즉시 필요한 작업
- [ ] LoginPage에 실제 API 호출 적용
- [ ] SignUpPage API 연동
- [ ] PresentationSetup 파일 업로드 연동
- [ ] React Router 도입으로 정식 라우팅 구현
- [ ] Recharts를 활용한 실제 데이터 시각화

### 기능 확장
- [ ] WebSocket 실시간 통신 구현
- [ ] WebRTC를 활용한 실시간 녹화
- [ ] MediaPipe 비언어 분석 연동
- [ ] 반응형 디자인 완성

## 🤝 개발팀

- **팀명**: S4-1
- **팀장**: 이예솔 (디자인)
- **팀원**: 
  - 김다민 (프론트엔드)
  - 배수연 (백엔드)
  - 정새연 (기획 및 개발)

## 📄 라이선스

이 프로젝트는 교육 목적으로 개발되었습니다.

---

**"Show, Speak, Grow! 말하는 순간, 배움이 보인다."**