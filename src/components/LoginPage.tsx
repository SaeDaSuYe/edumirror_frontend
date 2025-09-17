import React from 'react';
import LoginButton from './LoginButton';
import SocialLogin from './SocialLogin';

interface LoginPageProps {
  onLogin: () => void;
  onTeacherLogin: () => void;
  onGoogleLogin: () => void;
  onSignUpClick?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onTeacherLogin, onGoogleLogin, onSignUpClick }) => {
  return (
    <div className="min-h-screen bg-[#74CD79] flex flex-col items-center justify-center px-4">
      {/* 상단 상태바 */}
      <div className="fixed top-0 left-0 right-0 bg-[#74CD79] px-4 py-2 text-white text-sm font-medium flex justify-between items-center z-10">
        <span>9:30</span>
        <div className="flex space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div className="text-xs">📶</div>
          <div className="text-xs">📶</div>
          <div className="text-xs">🔋</div>
        </div>
      </div>

      {/* 메인 로그인 카드 */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg mt-16 mb-8">
        {/* 로고 섹션 */}
        <div className="flex flex-col items-center mb-8">
          {/* 로고 아이콘 */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-2">
              <div className="w-8 h-8 bg-gray-100 rounded"></div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-200 rounded"></div>
            </div>
          </div>
          
          {/* 로고 텍스트 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Edu-Mirror</h1>
        </div>

        {/* 입력 필드들 */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">아이디</label>
            <input 
              type="text" 
              placeholder="gildong27"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2">비밀번호</label>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
            />
          </div>
        </div>

        {/* 로그인 버튼들 */}
        <div className="space-y-3 mb-6">
          <button 
            onClick={onLogin}
            className="w-full bg-[#74CD79] text-white py-3 rounded-xl font-medium hover:bg-[#5FB366] transition-colors"
          >
            로그인
          </button>
          
          <button 
            onClick={onTeacherLogin}
            className="w-full bg-white border-2 border-[#74CD79] text-[#74CD79] py-3 rounded-xl font-medium hover:bg-[#74CD79] hover:text-white transition-colors"
          >
            교사/부모 계정으로 체험하기
          </button>
        </div>

        {/* 회원가입 및 찾기 링크 */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            계정이 없으시다면, 
            <button 
              onClick={onSignUpClick}
              className="text-[#74CD79] font-medium ml-1"
            >
              회원가입 바로가기
            </button>
          </p>
        </div>

        {/* 간편 로그인 섹션 */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">간편 로그인</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <button 
            onClick={onGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-gray-600">구글 계정으로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;