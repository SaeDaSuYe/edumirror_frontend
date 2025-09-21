import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, BookOpen, Target, Eye } from 'lucide-react';

interface StudentReportProps {
  studentId: string;
  onBackClick: () => void;
  onPresentationDetailClick: (sessionId: string) => void;
}

const StudentReport: React.FC<StudentReportProps> = ({
  studentId,
  onBackClick,
  onPresentationDetailClick
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1month' | '3months'>('1month');

  // 더미 데이터
  const studentInfo = {
    name: '김민지',
    grade: 'high_school_2',
    school: '충북대학교 사범대학 부설고등학교'
  };

  const performanceData = {
    last_30_days: {
      sessions_count: 5,
      average_score: 81.2,
      improvement_rate: 6.8
    },
    last_90_days: {
      sessions_count: 12,
      average_score: 78.5,
      improvement_rate: 12.3
    }
  };

  const recentSessions = [
    {
      session_id: 'session_001',
      title: '생물학 유전자 발표',
      date: '2024-09-14',
      score: 85,
      duration: '12분 30초',
      key_improvements: ['시선 처리 향상', '제스처 활용'],
      areas_to_focus: ['발화 속도 조절', '일시정지 활용']
    },
    {
      session_id: 'session_002',
      title: '수학 함수의 이해',
      date: '2024-09-10',
      score: 78,
      duration: '15분 20초',
      key_improvements: ['논리적 구성'],
      areas_to_focus: ['목소리 크기', '시선 분산']
    },
    {
      session_id: 'session_003',
      title: '역사 임진왜란의 배경',
      date: '2024-09-07',
      score: 82,
      duration: '10분 45초',
      key_improvements: ['내용 이해도', '자신감'],
      areas_to_focus: ['발표 자료 활용']
    }
  ];

  const strengthsAndWeaknesses = {
    strengths: ['내용 이해도', '논리적 구성', '자신감', '목소리 톤'],
    weaknesses: ['발화 속도', '제스처 활용', '시선 분산', '일시정지']
  };

  const currentData = selectedPeriod === '1month' ? performanceData.last_30_days : performanceData.last_90_days;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImprovementColor = (rate: number) => {
    if (rate > 5) return 'text-green-600';
    if (rate > 0) return 'text-yellow-600';
    return 'text-red-600';
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
      <div className="bg-[#74CD79] px-4 py-4 flex items-center">
        <button
          onClick={onBackClick}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center text-left space-x-3">
          <div>
            <h1 className="text-white text-xl font-bold">{studentInfo.name} 학생 리포트</h1>
            <p className="text-white/80 text-sm">{studentInfo.school}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 기간 선택 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">성과 요약</h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedPeriod('1month')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === '1month'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1개월
              </button>
              <button
                onClick={() => setSelectedPeriod('3months')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === '3months'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                3개월
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">발표 횟수</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">{currentData.sessions_count}회</div>
              <div className="text-sm text-blue-700">지난 {selectedPeriod === '1month' ? '1개월' : '3개월'}</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">평균 점수</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(currentData.average_score)}`}>
                {currentData.average_score.toFixed(1)}점
              </div>
              <div className="text-sm text-green-700">100점 만점</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">성장률</span>
              </div>
              <div className={`text-2xl font-bold ${getImprovementColor(currentData.improvement_rate)}`}>
                +{currentData.improvement_rate.toFixed(1)}%
              </div>
              <div className="text-sm text-purple-700">이전 기간 대비</div>
            </div>
          </div>
        </div>

        {/* 강점과 약점 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">강점 & 개선 영역</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-700 mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>강점</span>
              </h3>
              <div className="space-y-2">
                {strengthsAndWeaknesses.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-red-700 mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>개선 영역</span>
              </h3>
              <div className="space-y-2">
                {strengthsAndWeaknesses.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 최근 발표 기록 */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">최근 발표 기록</h2>
            <p className="text-sm text-gray-500">발표 기록을 선택하여 상세 분석을 확인하세요</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentSessions.map((session) => (
              <div
                key={session.session_id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onPresentationDetailClick(session.session_id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#74CD79] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{session.date}</span>
                        <span>•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`text-xl font-bold ${getScoreColor(session.score)}`}>
                      {session.score}점
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="ml-13 space-y-1">
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-green-700 font-medium">향상:</span>
                    {session.key_improvements.map((improvement, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {improvement}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-red-700 font-medium">개선:</span>
                    {session.areas_to_focus.map((area, index) => (
                      <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 액션 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">추천 활동</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-medium text-blue-900">발화 속도 개선 연습</h3>
                <p className="text-sm text-blue-700">천천히 말하기 연습을 통해 명확한 전달력을 높여보세요</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                시작하기
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-medium text-green-900">시선 처리 심화 연습</h3>
                <p className="text-sm text-green-700">청중과의 아이컨택을 통해 소통력을 강화해보세요</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;