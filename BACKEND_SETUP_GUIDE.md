# 백엔드 개발자님께 - 프론트엔드 API 연동 완료 안내

안녕하세요! 프론트엔드에서 API 연동 준비가 완료되었습니다. 🎉

## 📋 프론트엔드에서 완료한 작업

1. ✅ API 클라이언트 구조 생성 (`src/api/` 폴더)
2. ✅ 환경 변수 설정 (`.env` 파일)
3. ✅ 인증/세션/분석 API 서비스 구현
4. ✅ JWT 토큰 기반 인증 시스템 구현

## 🔧 백엔드에서 확인/설정이 필요한 사항

### 1. 서버 실행 확인
프론트엔드는 다음 주소로 API 요청을 보냅니다:
```
Base URL: http://localhost:8000/api
WebSocket: ws://localhost:8000/ws
```

**확인 방법:**
```bash
# 백엔드 서버 실행 후
curl http://localhost:8000/api
# 또는
curl http://localhost:8000/api/health  # health check 엔드포인트가 있다면
```

### 2. CORS 설정 필수!
프론트엔드 Vite 개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

**Django 설정 예시:**
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite 개발 서버
    "http://localhost:3000",  # 다른 개발 서버
    "http://127.0.0.1:5173",
]

# 또는 개발 환경에서는
CORS_ALLOW_ALL_ORIGINS = True  # 개발 환경에서만!
```

**필요한 라이브러리:**
```bash
pip install django-cors-headers
```

```python
# settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 최상단에 위치
    'django.middleware.common.CommonMiddleware',
    ...
]
```

### 3. API 엔드포인트 구현 확인
API 명세서에 따라 다음 엔드포인트들이 구현되어 있어야 합니다:

#### 인증
- ✅ `POST /api/auth/signup` - 회원가입
- ✅ `POST /api/auth/login` - 로그인
- ✅ `POST /api/auth/logout` - 로그아웃
- ✅ `POST /api/auth/refresh` - 토큰 갱신

#### 발표 세션
- ✅ `POST /api/sessions/create` - 세션 생성
- ✅ `POST /api/sessions/{session_id}/upload-material` - 파일 업로드
- ✅ `POST /api/sessions/{session_id}/start` - 발표 시작
- ✅ `POST /api/sessions/{session_id}/end` - 발표 종료
- ✅ `GET /api/sessions/{session_id}/detail` - 세션 상세

#### 분석
- ✅ `GET /api/analysis/{session_id}/report` - 분석 리포트

### 4. 인증 방식 확인
프론트엔드는 **Bearer 토큰** 방식을 사용합니다:

```
Authorization: Bearer {access_token}
```

**Django REST Framework 설정 예시:**
```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# .env 파일에
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=2h  # 7200초
```

### 5. 응답 형식 확인
프론트엔드는 다음 형식의 응답을 기대합니다:

**성공 응답:**
```json
{
  "status": "success",
  "data": {
    // 실제 데이터
  }
}
```

**에러 응답:**
```json
{
  "status": "error",
  "error": "에러 메시지"
}
```

### 6. 파일 업로드 설정
발표 자료 업로드 시 `multipart/form-data` 형식을 사용합니다:

```python
# Django settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# 파일 크기 제한
DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800  # 50MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 52428800  # 50MB
```

## 🧪 테스트 방법

### 1. 로그인 API 테스트
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**기대 응답:**
```json
{
  "status": "success",
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "expires_in": 7200
  }
}
```

### 2. 세션 생성 API 테스트
```bash
curl -X POST http://localhost:8000/api/sessions/create \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "테스트 발표",
    "ai_questions_enabled": true
  }'
```

**기대 응답:**
```json
{
  "status": "success",
  "data": {
    "session_id": "session_123",
    "websocket_url": "ws://localhost:8000/ws/session_123"
  }
}
```

## 📞 프론트엔드 담당자 연락처

- **작업 완료 항목**: API 클라이언트 구조, 환경 변수 설정
- **대기 중인 작업**: 컴포넌트 API 연동 (백엔드 준비 완료 후)

## ✅ 체크리스트

프론트엔드 테스트를 위해 다음을 확인해주세요:

- [ ] 백엔드 서버가 `http://localhost:8000`에서 실행 중
- [ ] CORS 설정 완료 (`http://localhost:5173` 허용)
- [ ] `/api/auth/login` 엔드포인트 동작 확인
- [ ] `/api/sessions/create` 엔드포인트 동작 확인
- [ ] Bearer 토큰 인증 방식 적용
- [ ] 응답 형식이 `{status, data/error}` 형태

## 🚀 다음 단계

백엔드 준비가 완료되면:
1. 프론트엔드 담당자에게 알려주세요
2. 함께 통합 테스트를 진행합니다
3. 문제가 있으면 함께 디버깅합니다

---

**질문이나 문제가 있으시면 언제든지 연락주세요!** 🙏
