import React from 'react';
import { Home, MessageSquare, User, Plus, MoreVertical } from 'lucide-react';
import springIcon from '../assets/note-spring.svg';

interface PresentationRecord {
  id: string;
  date: string;
  title: string;
  score: number;
  status: 'excellent' | 'good' | 'normal';
}

interface StudentDashboardProps {
  onRecordClick: (record: PresentationRecord) => void;
  onNewPresentationClick: () => void;
  onProfileClick: () => void;
  onChatClick: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onRecordClick,
  onNewPresentationClick,
  onProfileClick,
  onChatClick
}) => {
  const presentationRecords: PresentationRecord[] = [
    {
      id: '1',
      date: '2024년 6월 25일',
      title: '과학 발표 - 유전과 진화',
      score: 85,
      status: 'excellent'
    },
    {
      id: '2',
      date: '2024년 6월 20일',
      title: '영어 프레젠테이션',
      score: 78,
      status: 'good'
    },
    {
      id: '3',
      date: '2024년 6월 15일',
      title: '역사 발표 - 조선시대',
      score: 82,
      status: 'good'
    },
    {
      id: '4',
      date: '2024년 6월 10일',
      title: '국어 시 낭송 발표',
      score: 88,
      status: 'excellent'
    }
  ];

  const getScoreColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-[#74CD79]';
      case 'good':
        return 'bg-orange-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF2ED] flex flex-col">
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
      <div className="bg-[#74CD79] px-4 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">내 발표 기록</h1>
        <button
          onClick={onNewPresentationClick}
          className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-[20px] flex items-center space-x-2 border border-white/30"
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white font-medium">새 발표</span>
        </button>
      </div>

      {/* 발표 기록 리스트 */}
      <div className="flex-1 py-6 px-5 space-y-6">
        {presentationRecords.map((record) => (
          <div
            key={record.id}
            onClick={() => onRecordClick(record)}
            className="justify-center max-w-80 max-w-md mx-auto relative cursor-pointer hover:opacity-50 transition-opacity"
          >
            {/* 컨테이너 - 카드 높이 설정 */}
            <div className="h-24 relative">
              {/* 배경 그림자 카드 */}
              <div className="absolute inset-0 bg-green-400 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transform translate-x-1" />
              
              {/* 메인 카드 */}
              <div className="absolute inset-0 bg-white rounded-[20px] transform translate-x-3" />
              
              {/* 카드 내용 */}
              <div className="relative h-full flex items-center px-6 py-4 ml-2">
                {/* 왼쪽 스프링 아이콘 */}
                <div className="absolute left-0 top-1/3 transform -translate-y-1/2 -translate-x-5">
                  <img 
                    src={springIcon} 
                    alt="Spring decoration" 
                    className="w-8 h-8 sm:w-10 sm:h-10 pointer-events-none select-none" 
                    draggable={false}
                  />
                </div>
                
                {/* 텍스트 영역 */}
                <div className="flex-1 pr-4 text-left pb-4">
                  {/* 날짜 */}
                  <div className="text-neutral-400 text-xs sm:text-sm font-normal font-['Golos_Text'] mb-2">
                    {record.date}
                  </div>
                  
                  {/* 제목 */}
                  <div className="text-neutral-600 text-base sm:text-xl font-bold font-['Golos_Text'] leading-tight">
                    {record.title}
                  </div>
                </div>
                
                {/* 점수 영역 */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 ${getScoreColor(record.status)} rounded-full flex items-center justify-center`}>
                    <div className="text-center">
                      <span className="text-white text-xl sm:text-3xl font-semibold font-['Golos_Text'] leading-none">{record.score}</span>
                      <span className="text-white text-sm sm:text-base font-semibold font-['Golos_Text']">점</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션 */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-center items-center space-x-16">
          {/* 채팅 버튼 */}
          <button
            onClick={onChatClick}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </button>

          {/* 홈 버튼 (현재 활성화) */}
          <button className="p-3 rounded-full bg-[#74CD79] text-white">
            <Home className="w-6 h-6" />
          </button>

          {/* 프로필 버튼 */}
          <button
            onClick={onProfileClick}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;