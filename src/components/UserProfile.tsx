import React, { useState } from 'react';
import { ArrowLeft, User, Edit3 } from 'lucide-react';

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
    <div className="min-h-screen bg-stone-50 relative max-w-md mx-auto overflow-hidden">
      {/* 상단 상태바 */}
      <div className="absolute top-0 left-0 right-0 bg-green-400 px-4 py-3 text-white text-sm font-medium flex justify-between items-center z-10">
        <span className="font-['SF_Pro']">9:30</span>
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-3 bg-white" />
          <div className="w-4 h-3 bg-white" />
          <div className="w-6 h-3 opacity-30 rounded border border-white" />
          <div className="w-1 h-1 opacity-40 bg-white" />
          <div className="w-5 h-2 bg-white rounded-sm" />
        </div>
      </div>

      {/* 상단 헤더 */}
      <div className="bg-green-400 pt-12 pb-6 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBackClick}
            className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-lg font-semibold font-['Lora']">내 정보</h1>
        </div>
      </div>

      {/* 환영 메시지 */}
      <div className="px-8 pt-6 pb-4">
        <h2 className="text-xl font-bold text-neutral-600 font-['Golos_Text']">민지님, 안녕하세요!</h2>
      </div>

      {/* 메인 정보 카드 */}
      <div className="text-left mx-6 bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <User className="w-6 h-6 text-green-400 mr-2" />
            <h3 className="text-xl font-bold text-neutral-600 font-['Golos_Text']">내 정보</h3>
          </div>
        </div>
        
        {/* 이름 */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-neutral-600 font-['Golos_Text'] ml-4 mb-4">이름</h4>
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-[20px]" />
            <div className="relative ml-2 bg-gray-50 rounded-[20px] border border-zinc-100 p-4">
              <span className="text-base font-bold text-neutral-600 font-['Golos_Text']">김 민지</span>
            </div>
          </div>
        </div>

        {/* 소속 */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-neutral-600 font-['Golos_Text'] ml-4 mb-4">소속</h4>
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-[20px]" />
            <div className="relative ml-2 bg-gray-50 rounded-[20px] border border-zinc-100 p-4">
              <div className="text-base font-bold text-neutral-600 font-['Golos_Text'] mb-1">에듀고등학교 재학 중</div>
              <div className="text-sm font-normal text-neutral-400 font-['Golos_Text']">3학년</div>
            </div>
          </div>
        </div>

        {/* 강점 */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-neutral-600 font-['Golos_Text'] ml-4 mb-4">강점</h4>
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-[20px]" />
              <div className="relative ml-2 bg-gray-50 rounded-[20px] border border-zinc-100 p-4">
                <span className="text-base font-bold text-neutral-600 font-['Golos_Text']">자신있는 목소리</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-[20px]" />
              <div className="relative ml-2 bg-gray-50 rounded-[20px] border border-zinc-100 p-4">
                <span className="text-base font-bold text-neutral-600 font-['Golos_Text']">질의응답</span>
              </div>
            </div>
          </div>
        </div>

        {/* 약점 */}
        <div>
          <h4 className="text-lg font-bold text-neutral-600 font-['Golos_Text'] ml-4 mb-4">약점</h4>
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-300 rounded-[20px]" />
              <div className="relative ml-2 bg-yellow-50 rounded-[20px] border border-zinc-100 p-4">
                <span className="text-base font-bold text-neutral-600 font-['Golos_Text']">제스처 활용</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-orange-300 rounded-[20px]" />
              <div className="relative ml-2 bg-yellow-50 rounded-[20px] border border-zinc-100 p-4">
                <span className="text-base font-bold text-neutral-600 font-['Golos_Text']">발음</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="mx-6 mb-6">
        <button
          onClick={onLogoutClick}
          className="w-full bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] py-4 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 text-neutral-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <span className="text-lg font-bold text-neutral-400 font-['Golos_Text']">로그아웃</span>
        </button>
      </div>

      {/* 메뉴 닫기를 위한 배경 오버레이 */}
      {showEditMenu && (
        <div 
          className="fixed inset-0 z-10 bg-transparent"
          onClick={() => setShowEditMenu(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;