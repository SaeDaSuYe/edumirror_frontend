import React from 'react';
import LoginButton from './LoginButton';
import SocialLogin from './SocialLogin';
import appLogo from '../assets/app-logo.svg';
import textLogo from '../assets/login-text-logo.svg';
import googleIcon from '../assets/google-login.svg';

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
      <div className="w-full max-w-sm bg-[#DEDEDE] rounded-3xl p-8 shadow-lg mt-16 mb-8">
        {/* 로고 섹션 */}
        <div className="flex flex-col items-center mb-8">
          {/* 로고 아이콘 */}
          <div className="flex items-center mb-0">
            {/* 로고 아이콘 (SVG) */}
            <div className="mb-0">
              <img
                src={appLogo}
                alt="Edu-Mirror App Logo"
                className="w-28 h-28 md:w-24 md:h-24"
                draggable={false}
              />
            </div>
          </div>

          {/* 로고 텍스트 (SVG) */}
          <div className="text-center mb-0">
            <img
              src={textLogo}
              alt="Edu-Mirror"
              className="h-8 md:h-12 lg:h-20 mx-auto"
              draggable={false}
            />
          </div>
        </div>

        {/* 입력 필드들 */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2 px-2 text-left">아이디</label>
            <input 
              type="text" 
              placeholder="id"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2 px-2 text-left">비밀번호</label>
            <input 
              type="password" 
              placeholder="password"
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
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="px-4 text-sm text-gray-400">간편 로그인</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
        
          <button
            type="button"
            onClick={onGoogleLogin}
            aria-label="구글 계정으로 로그인"
            className="inline-flex items-center gap-3 focus:outline-none"
          >
            {/* 아이콘 원형 */}
            <span className="w-12 h-12 bg-white rounded-full outline outline-[0.68px] outline-offset-[-2px] outline-zinc-400 flex justify-center items-center shadow-sm shrink-0">
              <img src={googleIcon} alt="" className="w-10 h-10 pointer-events-none select-none" draggable={false}/>
            </span>

            {/* 가운데 캡슐(장식) — 작은 화면에선 숨김 */}
            <span aria-hidden className="hidden sm:block w-28 md:w-36 h-6 bg-white rounded-[30px] border border-neutral-200 shrink-0" />

            {/* 라벨 */}
            <span className="p-2 bg-white text-neutral-400 text-sm font-normal font-[Gotu] whitespace-nowrap rounded-full outline outline-[0.68px]" >
              구글 계정으로 로그인
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;