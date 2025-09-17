import React, { useState } from 'react';
import { ArrowLeft, Award, Settings, LogOut, Edit } from 'lucide-react';

interface UserProfileProps {
  onBackClick: () => void;
  onEditClick?: () => void;
  onLogoutClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  onBackClick,
  onEditClick,
  onLogoutClick
}) => {
  const [showEditMenu, setShowEditMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* 상단 상태바 */}
      <div className="bg-[#74CD79] px-4 py-2 text-white text-sm font-medium flex justify-between items-center">
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

      {/* 상단 헤더 */}
      <div className="bg-[#74CD79] px-4 py-4 flex items-center justify-between relative">
        <div className="flex items-center">
          <button
            onClick={onBackClick}
            className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">내 정보</h1>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowEditMenu(!showEditMenu)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Settings className="w-6 h-6 text-white" />
          </button>

          {/* 수정하기 드롭다운 메뉴 */}
          {showEditMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-32 z-10">
              <button
                onClick={() => {
                  setShowEditMenu(false);
                  onEditClick?.();
                }}
                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-lg"
              >
                <Edit className="w-4 h-4" />
                <span>수정하기</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-4 py-6 space-y-6">
        
        {/* 환영 메시지 */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">민지님, 안녕하세요!</h2>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-[#74CD79] mr-2" />
            <h3 className="text-lg font-bold text-gray-900">내 정보</h3>
          </div>
          
          {/* 이름 */}
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">이름</h4>
            <div className="bg-[#74CD79] rounded-2xl p-1">
              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-900">김 민지</p>
              </div>
            </div>
          </div>

          {/* 소속 */}
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">소속</h4>
            <div className="bg-[#74CD79] rounded-2xl p-1">
              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-1">에듀고등학교 재학 중</p>
                <p className="text-gray-600 text-sm">3학년</p>
              </div>
            </div>
          </div>

          {/* 강점 */}
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">강점</h4>
            <div className="space-y-2">
              <div className="bg-[#74CD79] rounded-2xl p-1">
                <div className="bg-white rounded-xl p-3">
                  <span className="text-gray-900 font-medium">자신있는 목소리</span>
                </div>
              </div>
              
              <div className="bg-[#74CD79] rounded-2xl p-1">
                <div className="bg-white rounded-xl p-3">
                  <span className="text-gray-900 font-medium">질의응답</span>
                </div>
              </div>
            </div>
          </div>

          {/* 약점 */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3">약점</h4>
            <div className="space-y-2">
              <div className="bg-orange-200 rounded-2xl p-1">
                <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                  <span className="text-gray-900 font-medium">제스처 활용</span>
                </div>
              </div>
              
              <div className="bg-orange-200 rounded-2xl p-1">
                <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                  <span className="text-gray-900 font-medium">발음</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <div className="bg-white rounded-2xl shadow-sm">
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center justify-center space-x-3 py-4 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">로그아웃</span>
          </button>
        </div>
      </div>

      {/* 메뉴 닫기를 위한 배경 오버레이 */}
      {showEditMenu && (
        <div 
          className="fixed inset-0 z-5 bg-transparent"
          onClick={() => setShowEditMenu(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;