# 에듀미러 프론트엔드 - API 연동 가이드

## 🔧 설정 완료 사항

### 1. 환경 변수 설정 (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_BASE_URL=ws://localhost:8000/ws
```

### 2. API 구조
```
src/api/
├── config.ts           # API 설정 및 엔드포인트
├── client.ts           # HTTP 클라이언트 및 토큰 관리
├── authService.ts      # 인증 API
├── sessionService.ts   # 발표 세션 API
├── analysisService.ts  # 분석 결과 API
└── index.ts           # 통합 export
```

## 📝 사용 방법

### 1. 로그인 예제
```typescript
import { authService, TokenManager } from '@/api';

const handleLogin = async (email: string, password: string) => {
  const response = await authService.login({ email, password });
  
  if (response.status === 'success' && response.data) {
    // 토큰 저장
    TokenManager.setAccessToken(response.data.access_token);
    if (response.data.refresh_token) {
      TokenManager.setRefreshToken(response.data.refresh_token);
    }
    console.log('로그인 성공!');
  } else {
    console.error('로그인 실패:', response.error);
  }
};
```

### 2. 발표 세션 생성 예제
```typescript
import { sessionService } from '@/api';

const createNewSession = async () => {
  const response = await sessionService.createSession({
    title: '과학 발표',
    theme: 'classroom',
    ai_questions_enabled: true,
    question_count: 3
  });
  
  if (response.status === 'success' && response.data) {
    const { session_id, websocket_url } = response.data;
    console.log('세션 생성 완료:', session_id);
    // WebSocket 연결
    connectWebSocket(websocket_url);
  }
};
```

### 3. 발표 자료 업로드 예제
```typescript
import { sessionService } from '@/api';

const uploadPresentation = async (sessionId: string, file: File) => {
  const response = await sessionService.uploadMaterial(
    sessionId, 
    file,
    '발표 대본 텍스트 (선택사항)'
  );
  
  if (response.status === 'success' && response.data) {
    console.log('업로드 완료!');
    console.log('슬라이드 수:', response.data.page_count);
    console.log('예상 시간:', response.data.script_analysis?.estimated_duration);
  }
};
```

### 4. 분석 결과 조회 예제
```typescript
import { analysisService } from '@/api';

const getAnalysisResult = async (sessionId: string) => {
  const response = await analysisService.getAnalysisReport(sessionId);
  
  if (response.status === 'success' && response.data) {
    const { total_score, scores, feedback } = response.data;
    console.log('총점:', total_score);
    console.log('세부 점수:', scores);
    console.log('피드백:', feedback);
  }
};
```

## 🚀 다음 단계

### LoginPage 컴포넌트 수정 필요
현재 `LoginPage.tsx`는 목업 데이터만 사용합니다. 다음과 같이 수정해야 합니다:

```typescript
import { authService, TokenManager } from '../api';

const handleLogin = async () => {
  const email = emailInputRef.current?.value;
  const password = passwordInputRef.current?.value;
  
  if (!email || !password) {
    alert('이메일과 비밀번호를 입력해주세요.');
    return;
  }
  
  const response = await authService.login({ email, password });
  
  if (response.status === 'success' && response.data) {
    TokenManager.setAccessToken(response.data.access_token);
    onLogin(); // 다음 페이지로 이동
  } else {
    alert('로그인 실패: ' + response.error);
  }
};
```

### PresentationSetup 컴포넌트 수정 필요
발표 자료 업로드 기능을 실제 API와 연동:

```typescript
import { sessionService } from '../api';

const handleFileUpload = async (file: File) => {
  // 1. 세션 생성
  const sessionResponse = await sessionService.createSession({
    title: '새 발표',
    ai_questions_enabled: true,
  });
  
  if (sessionResponse.status === 'success' && sessionResponse.data) {
    const sessionId = sessionResponse.data.session_id;
    
    // 2. 파일 업로드
    const uploadResponse = await sessionService.uploadMaterial(sessionId, file);
    
    if (uploadResponse.status === 'success') {
      console.log('업로드 완료!');
      // 발표 시작 페이지로 이동
    }
  }
};
```

## 🔍 백엔드 서버 확인사항

### 백엔드가 실행 중인지 확인
```bash
# 백엔드 서버가 8000 포트에서 실행 중이어야 합니다
curl http://localhost:8000/api
```

### CORS 설정 확인
백엔드에서 프론트엔드 도메인을 허용해야 합니다:

```python
# Django settings.py 또는 middleware
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite 개발 서버
    "http://localhost:3000",
]
```

## ⚠️ 현재 상태

✅ **완료된 것:**
- API 클라이언트 설정
- 토큰 관리 시스템
- 인증/세션/분석 API 서비스
- 환경 변수 설정

❌ **아직 필요한 것:**
- 컴포넌트에서 실제 API 호출 적용
- 백엔드 서버 실행 확인
- CORS 설정 확인
- WebSocket 연결 구현

## 📞 질문사항

1. **백엔드 서버가 현재 실행 중인가요?**
   - `http://localhost:8000`에서 접근 가능한지 확인 필요

2. **백엔드 개발자와 확인이 필요한 사항:**
   - CORS 설정이 되어 있는지?
   - API 엔드포인트가 명세서대로 구현되어 있는지?
   - 토큰 인증 방식이 Bearer 토큰인지?

3. **어떤 컴포넌트부터 수정할까요?**
   - LoginPage (로그인)
   - SignUpPage (회원가입)
   - PresentationSetup (발표 준비)
   - PresentationSimulation (발표 실행)

---

**문의사항이나 추가 도움이 필요하시면 말씀해주세요! 🚀**
