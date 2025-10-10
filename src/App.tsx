import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SplashScreen from './components/SplashScreen';
import StudentDashboard from './components/StudentDashboard';
import MainDashboard from './components/MainDashboard';
import PresentationSetup from './components/PresentationSetup';
import PresentationSimulation from './components/PresentationSimulation';
import SignUpPage from './components/SignUpPage';
import PresentationHistory from './components/PresentationHistory';
import ImprovementChat from './components/ImprovementChat';
import UserProfile from './components/UserProfile';
import TeacherDashboard from './components/TeacherDashboard';
import StudentReport from './components/StudentReport';
import TeacherImprovementChat from './components/TeacherImprovementChat';
import TeacherPresentationHistory from './components/TeacherPresentationHistory';
import PresentationAnalysis from './components/PresentationAnalysis';
import StudentPresentationResult from './components/StudentPresentationResult';
import './App.css';

type PageType = 
  | 'splash' 
  | 'login' 
  | 'signup' 
  | 'student-dashboard'
  | 'main-dashboard'
  | 'presentation-setup'
  | 'presentation-simulation'
  | 'presentation-history' 
  | 'improvement-chat'
  | 'user-profile'
  | 'teacher-dashboard'
  | 'student-report'
  | 'teacher-improvement-chat'
  | 'teacher-presentation-history'
  | 'presentation-analysis'
  | 'student-presentation-result';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('splash');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // 스플래쉬 화면에서 자동으로 로그인 화면으로 이동
  React.useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => {
        setCurrentPage('login');
      }, 3000); // 3초 후 로그인 화면으로
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // 로그인 처리
  const handleLogin = () => {
    console.log('일반 로그인 클릭');
    setCurrentPage('student-dashboard'); // 학생 로그인 후 학생 대시보드로
  };

  const handleTeacherLogin = () => {
    console.log('교사/부모 계정 로그인 클릭');
    setCurrentPage('teacher-dashboard'); // 교사 대시보드로
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인 클릭');
    setCurrentPage('student-dashboard');
  };

  // 회원가입 처리
  const handleSignUpClick = () => {
    setCurrentPage('signup');
  };

  const handleSignUp = () => {
    setCurrentPage('login'); // 회원가입 후 로그인 화면으로
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  // 학생 대시보드 관련
  const handleRecordClick = (record: any) => {
    console.log('발표 기록 클릭:', record);
    setCurrentPage('main-dashboard'); // 발표 기록 클릭 시 메인 대시보드로
  };

  const handleNewPresentationClick = () => {
    setCurrentPage('presentation-setup');
  };

  const handleProfileClick = () => {
    setCurrentPage('user-profile');
  };

  const handleChatClick = () => {
    setCurrentPage('improvement-chat');
  };

  // 메인 대시보드 관련
  const handleBackToStudentDashboard = () => {
    setCurrentPage('student-dashboard');
  };

  const handleDetailedAnalysisClick = () => {
    setCurrentPage('presentation-history');
  };

  // 발표 관련
  const handleStartPresentation = (file?: File, sessionData?: any) => {
    if (file) setUploadedFile(file);
    if (sessionData?.session_id) {
      setSelectedSessionId(sessionData.session_id);
      console.log('✅ 세션 ID 저장:', sessionData.session_id);
    }
    setCurrentPage('presentation-simulation');
  };

  const handleBackToPresentationSetup = () => {
    setCurrentPage('presentation-setup');
  };

  const handleBackToMainDashboard = () => {
    setCurrentPage('main-dashboard');
  };

  const handlePresentationComplete = () => {
    setCurrentPage('presentation-analysis');
  };

  const handleAnalysisComplete = () => {
    setCurrentPage('student-presentation-result');
  };

  const handleRetryPresentation = () => {
    setCurrentPage('presentation-setup');
  };

  const handleBackFromResult = () => {
    setCurrentPage('student-dashboard');
  };

  // 공통 뒤로가기
  const handleBackFromProfile = () => {
    setCurrentPage('student-dashboard');
  };

  const handleBackFromChat = () => {
    setCurrentPage('student-dashboard');
  };

  const handleBackFromHistory = () => {
    setCurrentPage('main-dashboard');
  };

  // 교사 플로우 관련
  const handleBackToTeacherDashboard = () => {
    setCurrentPage('teacher-dashboard');
  };

  const handleStudentReportClick = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentPage('student-report');
  };

  const handleTeacherImprovementChatClick = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentPage('teacher-improvement-chat');
  };

  const handleTeacherPresentationDetailClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setCurrentPage('teacher-presentation-history');
  };

  const handleBackFromStudentReport = () => {
    setCurrentPage('teacher-dashboard');
  };

  const handleBackFromTeacherChat = () => {
    setCurrentPage('teacher-dashboard');
  };

  const handleBackFromTeacherHistory = () => {
    setCurrentPage('student-report');
  };

  // 로그아웃
  const handleLogout = () => {
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'splash':
        return <SplashScreen />;
        
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin}
            onTeacherLogin={handleTeacherLogin}
            onGoogleLogin={handleGoogleLogin}
            onSignUpClick={handleSignUpClick}
          />
        );
        
      case 'signup':
        return (
          <SignUpPage 
            onSignUp={handleSignUp}
            onBackToLogin={handleBackToLogin}
          />
        );
        
      case 'student-dashboard':
        return (
          <StudentDashboard 
            onRecordClick={handleRecordClick}
            onNewPresentationClick={handleNewPresentationClick}
            onProfileClick={handleProfileClick}
            onChatClick={handleChatClick}
          />
        );
        
      case 'main-dashboard':
        return (
          <MainDashboard 
            onBackClick={handleBackToStudentDashboard}
            onNewPresentationClick={handleNewPresentationClick}
            onDetailedAnalysisClick={handleDetailedAnalysisClick}
          />
        );
        
      case 'presentation-setup':
        return (
          <PresentationSetup 
            onBackClick={handleBackToMainDashboard}
            onStartPresentation={handleStartPresentation}
          />
        );
        
      case 'presentation-simulation':
        return (
          <PresentationSimulation 
            onBack={handleBackToPresentationSetup}
            onComplete={handlePresentationComplete}
            uploadedFile={uploadedFile}
          />
        );
        
      case 'presentation-analysis':
        return (
          <PresentationAnalysis 
            sessionId={selectedSessionId}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );
        
      case 'student-presentation-result':
        return (
          <StudentPresentationResult 
            sessionId={selectedSessionId}
            onBackClick={handleBackFromResult}
            onRetryClick={handleRetryPresentation}
          />
        );
        
      case 'presentation-history':
        return (
          <PresentationHistory 
            onRecordClick={handleRecordClick}
            onNewPresentationClick={handleNewPresentationClick}
            onBackClick={handleBackFromHistory}
          />
        );
        
      case 'improvement-chat':
        return (
          <ImprovementChat 
            onBackClick={handleBackFromChat}
          />
        );
        
      case 'user-profile':
        return (
          <UserProfile 
            onBackClick={handleBackFromProfile}
            onLogoutClick={handleLogout}
          />
        );
        
      case 'teacher-dashboard':
        return (
          <TeacherDashboard 
            onBackClick={handleBackToLogin}
            onStudentReportClick={handleStudentReportClick}
            onImprovementChatClick={handleTeacherImprovementChatClick}
          />
        );

      case 'student-report':
        return (
          <StudentReport 
            studentId={selectedStudentId}
            onBackClick={handleBackFromStudentReport}
            onPresentationDetailClick={handleTeacherPresentationDetailClick}
          />
        );

      case 'teacher-improvement-chat':
        return (
          <TeacherImprovementChat 
            studentId={selectedStudentId}
            onBackClick={handleBackFromTeacherChat}
          />
        );

      case 'teacher-presentation-history':
        return (
          <TeacherPresentationHistory 
            sessionId={selectedSessionId}
            studentId={selectedStudentId}
            onBackClick={handleBackFromTeacherHistory}
          />
        );
        
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="App w-full bg-white min-h-screen relative">
      {/* 개발 환경에서만 보이는 디버그 네비게이션 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 right-4 z-50 space-y-1 max-h-screen overflow-y-auto">
          <button 
            onClick={() => setCurrentPage('splash')}
            className="block px-2 py-1 bg-gray-500 text-white text-xs rounded text-center w-20"
          >
            스플래쉬
          </button>
          <button 
            onClick={() => setCurrentPage('login')}
            className="block px-2 py-1 bg-blue-500 text-white text-xs rounded text-center w-20"
          >
            로그인
          </button>
          <button 
            onClick={() => setCurrentPage('signup')}
            className="block px-2 py-1 bg-yellow-500 text-white text-xs rounded text-center w-20"
          >
            회원가입
          </button>
          <button 
            onClick={() => setCurrentPage('student-dashboard')}
            className="block px-2 py-1 bg-green-500 text-white text-xs rounded text-center w-20"
          >
            학생홈
          </button>
          <button 
            onClick={() => setCurrentPage('main-dashboard')}
            className="block px-2 py-1 bg-purple-500 text-white text-xs rounded text-center w-20"
          >
            메인
          </button>
          <button 
            onClick={() => setCurrentPage('presentation-setup')}
            className="block px-2 py-1 bg-indigo-500 text-white text-xs rounded text-center w-20"
          >
            발표준비
          </button>
          <button 
            onClick={() => setCurrentPage('presentation-simulation')}
            className="block px-2 py-1 bg-red-500 text-white text-xs rounded text-center w-20"
          >
            발표중
          </button>
          <button 
            onClick={() => setCurrentPage('presentation-history')}
            className="block px-2 py-1 bg-orange-500 text-white text-xs rounded text-center w-20"
          >
            기록
          </button>
          <button 
            onClick={() => setCurrentPage('improvement-chat')}
            className="block px-2 py-1 bg-pink-500 text-white text-xs rounded text-center w-20"
          >
            채팅
          </button>
          <button 
            onClick={() => setCurrentPage('user-profile')}
            className="block px-2 py-1 bg-cyan-500 text-white text-xs rounded text-center w-20"
          >
            프로필
          </button>
          {/* 교사 플로우 디버그 버튼 */}
          <div className="border-t border-white my-1"></div>
          <button 
            onClick={() => setCurrentPage('teacher-dashboard')}
            className="block px-2 py-1 bg-emerald-600 text-white text-xs rounded text-center w-20"
          >
            교사홈
          </button>
          <button 
            onClick={() => {
              setSelectedStudentId('student_001');
              setCurrentPage('student-report');
            }}
            className="block px-2 py-1 bg-emerald-700 text-white text-xs rounded text-center w-20"
          >
            학생리포트
          </button>
          <button 
            onClick={() => {
              setSelectedStudentId('student_001');
              setCurrentPage('teacher-improvement-chat');
            }}
            className="block px-2 py-1 bg-emerald-800 text-white text-xs rounded text-center w-20"
          >
            교사채팅
          </button>
          <button 
            onClick={() => {
              setSelectedSessionId('session_001');
              setSelectedStudentId('student_001');
              setCurrentPage('teacher-presentation-history');
            }}
            className="block px-2 py-1 bg-emerald-900 text-white text-xs rounded text-center w-20"
          >
            교사기록
          </button>
          <button 
            onClick={() => setCurrentPage('presentation-analysis')}
            className="block px-2 py-1 bg-rose-600 text-white text-xs rounded text-center w-20"
          >
            분석중
          </button>
          <button 
            onClick={() => setCurrentPage('student-presentation-result')}
            className="block px-2 py-1 bg-rose-700 text-white text-xs rounded text-center w-20"
          >
            분석결과
          </button>
        </div>
      )}
      
      {renderPage()}
    </div>
  );
}

export default App;