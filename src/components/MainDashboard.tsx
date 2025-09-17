import React from 'react';
import { ArrowLeft, TrendingUp, BarChart2, Mic } from 'lucide-react';

interface MainDashboardProps {
  onBackClick: () => void;
  onNewPresentationClick: () => void;
  onDetailedAnalysisClick: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  onBackClick,
  onNewPresentationClick,
  onDetailedAnalysisClick
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
      <div className="bg-[#74CD79] px-4 py-4 flex items-center">
        <button
          onClick={onBackClick}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-xl font-bold">내 성장 현황</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-4 py-6 space-y-6">
        
        {/* 성장 축하 메시지 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">민지님, 축하드려요! 👏</h2>
          <p className="text-gray-700">지난번보다 발표 실력이 <span className="text-[#74CD79] font-semibold">5% 성장</span>했어요!</p>
        </div>

        {/* 발표 정보 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-2">
            <span className="text-sm text-gray-500">2024년 6월 25일</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">과학 발표 - 유전과 진화</h3>
          <p className="text-gray-600 text-sm">유전과 진화의 이론을 주제로 하는 5분 내외 발표</p>
        </div>

        {/* 성장 분석 섹션 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-[#74CD79]">85점</h3>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-500 font-medium text-sm">+ 7점 향상</span>
              </div>
            </div>
          </div>

          {/* 세부 점수 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 rounded-2xl p-4 text-center border-2 border-gray-200">
              <div className="text-2xl font-bold text-[#74CD79]">90</div>
              <div className="text-sm text-gray-600 mt-1">이해도</div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-4 text-center border-2 border-gray-200">
              <div className="text-2xl font-bold text-[#74CD79]">80</div>
              <div className="text-sm text-gray-600 mt-1">표현력</div>
            </div>
          </div>

          {/* 임시 차트 영역 */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">발표 점수 통계</h4>
              <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">📊 차트 영역</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">성장 그래프</h4>
              <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">📈 성장 차트</span>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>최근 4주</span>
                <span>현재</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI 추천 연습 테마 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">AI 추천 연습 테마</h3>
          
          <div className="space-y-3 mb-6">
            <div className="bg-[#74CD79] rounded-2xl p-4">
              <div className="bg-gray-100 rounded-xl p-3">
                <h4 className="font-semibold text-gray-900 mb-1">👩‍🔬 과학 발표</h4>
                <p className="text-gray-600 text-sm">실험 결과를 발표해보세요!</p>
              </div>
            </div>

            <div className="bg-[#74CD79] rounded-2xl p-4">
              <div className="bg-gray-100 rounded-xl p-3">
                <h4 className="font-semibold text-gray-900 mb-1">🗣️ 영어 자기 소개</h4>
                <p className="text-gray-600 text-sm">영어로 5분 내외의 자기소개를 진행해보세요!</p>
              </div>
            </div>

            <div className="bg-[#74CD79] rounded-2xl p-4">
              <div className="bg-gray-100 rounded-xl p-3">
                <h4 className="font-semibold text-gray-900 mb-1">👩‍🏫 토론 연습</h4>
                <p className="text-gray-600 text-sm">당신의 찬반 의견을 발표해보세요!</p>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <button
              onClick={onNewPresentationClick}
              className="w-full bg-[#74CD79] text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3"
            >
              <Mic className="w-5 h-5" />
              <span>새 발표 시작하기</span>
            </button>

            <button
              onClick={onDetailedAnalysisClick}
              className="w-full bg-gray-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3"
            >
              <BarChart2 className="w-5 h-5" />
              <span>상세 분석 보기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;