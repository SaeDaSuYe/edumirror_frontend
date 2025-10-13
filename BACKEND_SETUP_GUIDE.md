# 백엔드 로컬 연동 가이드 🚀

프론트엔드와 백엔드를 로컬에서 연동하는 완전한 가이드입니다.

## 1. 백엔드 리포지토리 클론 및 설정

### 백엔드 클론
```bash
# 백엔드 폴더로 이동 (프론트엔드와 같은 레벨)
cd c:\SW_3_2\edu-mirror
git clone https://github.com/SaeDaSuYe/edumirror-backend.git
cd edumirror-backend
```

### Python 가상환경 생성
```bash
# 가상환경 생성
python -m venv venv

# Windows PowerShell에서 활성화
.\venv\Scripts\Activate.ps1

# 의존성 설치
pip install -r requirements.txt
```

## 2. 환경 설정

### .env 파일 생성
```bash
# edumirror-backend 폴더에서
# .env 파일 생성하고 다음 내용 추가:

DATABASE_URL=sqlite:///./app.db
SECRET_KEY=your-secret-key-here-for-development
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# CORS 설정 (프론트엔드 주소)
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

### 데이터베이스 초기화
```bash
# Django인 경우
python manage.py makemigrations
python manage.py migrate

# FastAPI + Alembic인 경우
alembic upgrade head

# 초기 데이터 생성 (있는 경우)
python manage.py createsuperuser  # Django
```

## 3. 백엔드 서버 실행

### Django인 경우:
```bash
python manage.py runserver 0.0.0.0:8000
```

### FastAPI인 경우:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Flask인 경우:
```bash
flask run --host=0.0.0.0 --port=8000
```

### 서버 실행 확인:
```bash
# PowerShell에서
Invoke-WebRequest -Uri http://localhost:8000 -Method Get

# 또는 브라우저에서 http://localhost:8000 접속
```

## 4. 프론트엔드 환경 확인

### .env 파일 설정 확인
```env
# edumirror_frontend/.env 파일에 다음 내용이 있는지 확인:
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_BASE_URL=ws://localhost:8000/ws
```

### 프론트엔드 개발 서버 실행
```bash
cd ../edumirror_frontend  # 백엔드 폴더에서 프론트엔드 폴더로
npm install  # 처음 실행 시에만
npm run dev
```

프론트엔드는 http://localhost:5173 에서 실행됩니다.

## 5. 연동 테스트

### API 연결 테스트
```bash
# 1. 백엔드 서버 상태 확인
Invoke-WebRequest -Uri http://localhost:8000/api -Method Get

# 2. 회원가입 테스트 (선택)
Invoke-WebRequest -Uri http://localhost:8000/api/auth/signup -Method Post -Body '{"email":"test@test.com","password":"test123"}' -ContentType "application/json"

# 3. 로그인 테스트
Invoke-WebRequest -Uri http://localhost:8000/api/auth/login -Method Post -Body '{"email":"test@test.com","password":"test123"}' -ContentType "application/json"
```

### 브라우저에서 전체 테스트
1. **백엔드 실행**: http://localhost:8000 접속 확인
2. **프론트엔드 실행**: http://localhost:5173 접속
3. **로그인 페이지에서 로그인 시도**
4. **브라우저 개발자도구 > Network 탭**에서 API 호출 확인
   - 200 응답이 와야 함
   - CORS 에러가 없어야 함

## 6. 트러블슈팅

### CORS 에러가 나는 경우
백엔드에서 CORS 설정 추가 필요:

**Django:**
```python
pip install django-cors-headers

# settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 맨 위에
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

**FastAPI:**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 포트 충돌 시
```bash
# 백엔드 포트 변경
python manage.py runserver 0.0.0.0:8001

# 그 후 프론트엔드 .env 파일도 수정
# VITE_API_BASE_URL=http://localhost:8001/api
```

### 데이터베이스 에러 시
```bash
# SQLite 초기화 (주의: 데이터 삭제됨)
rm db.sqlite3  # 또는 app.db
python manage.py migrate
```

### API 형식 확인
프론트엔드가 기대하는 응답 형식:
```json
{
  "status": "success",
  "data": { ... }
}

# 에러 시
{
  "status": "error", 
  "error": "에러 메시지"
}
```

## 7. 연동 성공 확인 방법

### ✅ 연동이 성공했다면:
1. **로그인 페이지**: 실제 JWT 토큰을 받아와 로컬스토리지에 저장
2. **발표 준비**: 세션 생성 시 실제 session_id 반환
3. **파일 업로드**: PDF/PPT 업로드 시 백엔드에서 처리 완료
4. **실시간 분석**: WebSocket 연결 후 진행률 실시간 업데이트
5. **결과 페이지**: 더미 데이터가 아닌 실제 분석 결과 표시
6. **기록 페이지**: 사용자의 실제 발표 기록 목록 표시

### ❌ 문제가 있다면:
- 브라우저 개발자도구 > Console/Network 탭에서 에러 확인
- 백엔드 로그 확인
- CORS, 포트, API 엔드포인트 등 재확인

## 8. 주요 API 엔드포인트 목록

프론트엔드에서 사용하는 API들:

```
POST /api/auth/signup      - 회원가입
POST /api/auth/login       - 로그인
POST /api/sessions/create  - 발표 세션 생성
POST /api/sessions/{id}/upload-material  - 파일 업로드
GET  /api/sessions/{id}    - 세션 상태 조회
GET  /api/profile/history  - 발표 기록 목록
```

## 🎉 완료!

이 가이드를 따라 하면 프론트엔드와 백엔드가 완전히 연동됩니다!
문제가 생기면 각 단계별로 확인해보세요.
