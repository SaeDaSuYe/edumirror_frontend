import React from 'react';
import { Home, MessageSquare, User, Plus, MoreVertical } from 'lucide-react';

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

  const getScoreTextColor = (status: string) => {
    return 'text-white';
  };

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
      <div className="bg-[#74CD79] px-4 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">내 발표 기록</h1>
        <button
          onClick={onNewPresentationClick}
          className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2 border border-white/30"
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white font-medium">새 발표</span>
        </button>
      </div>

      {/* 발표 기록 리스트 */}
      <div className="flex-1 px-4 py-6 space-y-4">
        {presentationRecords.map((record) => (
          <div
            key={record.id}
            onClick={() => onRecordClick(record)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{record.date}</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#74CD79] rounded-full opacity-60"></div>
                <div className="w-2 h-2 bg-[#74CD79] rounded-full opacity-40"></div>
                <div className="w-2 h-2 bg-[#74CD79] rounded-full opacity-20"></div>
              </div>
            </div>
            
            <h3 className="text-gray-900 font-semibold text-lg mb-3">{record.title}</h3>
            
            <div className="flex items-center justify-between">
              <div className={`${getScoreColor(record.status)} w-16 h-16 rounded-full flex items-center justify-center`}>
                <span className={`${getScoreTextColor(record.status)} text-sm font-bold`}>
                  {record.score}점
                </span>
              </div>
              
              <div className="text-right">
                <div className="text-gray-400 text-xs">발표 점수</div>
                <div className="flex space-x-1 mt-1">
                  <div className="w-2 h-2 bg-[#74CD79] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#74CD79] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#74CD79] rounded-full"></div>
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