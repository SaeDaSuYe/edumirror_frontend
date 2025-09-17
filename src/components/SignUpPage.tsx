import React, { useState } from 'react';

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
    userType: 'student' // student or teacher
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 데이터:', formData);
    onSignUp();
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
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-gray-800">회원가입</h1>
          <div className="w-10"></div>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 사용자 타입 선택 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">가입 유형</label>
            <select 
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
            >
              <option value="student">학생</option>
              <option value="teacher">교사/부모</option>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">비밀번호</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button 
            type="submit"
            className="w-full bg-[#74CD79] text-white py-3 rounded-xl font-medium hover:bg-[#5FB366] transition-colors mt-6"
          >
            회원가입 완료
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