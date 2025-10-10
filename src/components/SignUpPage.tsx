import React, { useState } from 'react';
import { authService, TokenManager } from '../api';

interface SignUpPageProps {
  onSignUp: () => void;
  onBackToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student', // student or teacher
    grade: '',
    school: '',
    phone: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('이름을 입력해주세요.');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return false;
    }
    if (!formData.password.trim()) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return false;
    }
    if (formData.password.length < 8) {
      setErrorMessage('비밀번호는 최소 8자 이상이어야 합니다.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const signUpData = {
        email: formData.email,
        password: formData.password,
        user_type: formData.userType as 'student' | 'teacher' | 'parent',
        name: formData.name,
        grade: formData.grade || undefined,
        school: formData.school || undefined,
        phone: formData.phone || undefined,
      };

      const response = await authService.signUp(signUpData);
      
      if (response.status === 'success' && response.data) {
        // 토큰 저장
        TokenManager.setAccessToken(response.data.access_token);
        if (response.data.refresh_token) {
          TokenManager.setRefreshToken(response.data.refresh_token);
        }
        
        console.log('✅ 회원가입 성공!');
        onSignUp(); // 다음 페이지로 이동
      } else {
        setErrorMessage(response.error || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ 회원가입 에러:', error);
      setErrorMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#74CD79] flex flex-col items-center justify-center px-4">
      {/* 상단 상태바 */}
      <div className="fixed top-0 left-0 right-0 bg-[#74CD79] px-4 py-2 text-white text-sm font-medium flex justify-between items-center z-10">
        <span>9:30</span>
        <div className="flex space-x-1">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 메인 회원가입 카드 */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg mt-16 mb-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBackToLogin}
            className="text-gray-600 p-2"
            disabled={isLoading}
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-800">회원가입</h1>
          <div className="w-10"></div>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 사용자 타입 선택 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">가입 유형</label>
            <select 
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <option value="student">학생</option>
              <option value="teacher">교사</option>
              <option value="parent">학부모</option>
            </select>
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">이름</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">이메일</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">비밀번호 (8자 이상)</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">비밀번호 확인</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
            />
          </div>

          {/* 선택적 정보 */}
          {formData.userType === 'student' && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-2">학년 (선택사항)</label>
                <input 
                  type="text" 
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="예: 중학교 2학년"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">학교 (선택사항)</label>
                <input 
                  type="text" 
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="예: 서울중학교"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
              </div>
            </>
          )}

          {/* 회원가입 버튼 */}
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-medium transition-colors mt-6 ${
              isLoading 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-[#74CD79] text-white hover:bg-[#5FB366]'
            }`}
          >
            {isLoading ? '가입 중...' : '회원가입 완료'}
          </button>
        </form>

        {/* 이미 계정이 있는 경우 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            이미 계정이 있으신가요? 
            <button 
              onClick={onBackToLogin}
              className="text-[#74CD79] font-medium ml-1"
            >
              로그인하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;