import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, TrendingUp, Eye, BarChart3, Calendar, Award, Clock } from 'lucide-react';

interface PresentationHistoryProps {
  onRecordClick?: (record: any) => void;
  onNewPresentationClick?: () => void;
  onBackClick?: () => void;
}

const PresentationHistory: React.FC<PresentationHistoryProps> = ({ 
  onRecordClick, 
  onNewPresentationClick,
  onBackClick
}) => {
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 더미 데이터
  const presentations = [
    {
      id: 'session_001',
      date: '2024-09-14',
      title: '생물학 유전자 발표',
      score: 85,
      duration: 750, // 12분 30초
      status: 'excellent',
      scores: {
        expression: 82,
        understanding: 89,
        voice: 80,
        gesture: 75,
        eye_contact: 88
      },
      feedback: '시선 처리가 크게 향상되었습니다. 발화 속도 조절에 더 신경쓰면 좋겠습니다.',
      improvements: ['시선 처리 향상', '내용 이해도 우수'],
      areas_to_focus: ['발화 속도 조절', '제스처 활용']
    },
    {
      id: 'session_002',
      date: '2024-09-10',
      title: '수학 함수의 이해',
      score: 78,
      duration: 920, // 15분 20초
      status: 'good',
      scores: {
        expression: 75,
        understanding: 85,
        voice: 78,
        gesture: 72,
        eye_contact: 75
      },
      feedback: '논리적 구성이 뛰어났습니다. 목소리 크기와 시선 분산에 주의하세요.',
      improvements: ['논리적 구성'],
      areas_to_focus: ['목소리 크기', '시선 분산']
    },
    {
      id: 'session_003',
      date: '2024-09-07',
      title: '역사 임진왜란의 배경',
      score: 82,
      duration: 645, // 10분 45초
      status: 'good',
      scores: {
        expression: 80,
        understanding: 88,
        voice: 82,
        gesture: 78,
        eye_contact: 80
      },
      feedback: '내용 이해도와 자신감이 좋았습니다. 발표 자료 활용을 더 개선하면 좋겠습니다.',
      improvements: ['내용 이해도', '자신감'],
      areas_to_focus: ['발표 자료 활용']
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLeftBorderColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'border-l-green-500';
      case 'good': return 'border-l-blue-500';
      case 'normal': return 'border-l-gray-400';
      default: return 'border-l-gray-400';
    }
  };

  const selectedPresentation = presentations.find(p => p.id === selectedRecord);

  if (selectedRecord && selectedPresentation) {
    // 상세 분석 화면
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 상단 헤더 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedRecord(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{selectedPresentation.title}</h1>
              <p className="text-sm text-gray-500">
                {formatDate(selectedPresentation.date)} • {formatTime(selectedPresentation.duration)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* 발표 영상 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8" />
                </div>
                <div className="text-lg font-medium">발표 영상</div>
                <div className="text-sm text-gray-300">클릭하여 재생</div>
              </div>
              
              {/* 비디오 컨트롤 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="w-full h-1 bg-white/30 rounded-full">
                      <div className="h-full bg-white rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  
                  <div className="text-white text-sm">
                    {formatTime(selectedPresentation.duration)}
                  </div>
                  
                  <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                    <Volume2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 종합 점수 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto mb-3 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#E5E7EB"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#74CD79"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45 * (selectedPresentation.score / 100)} ${2 * Math.PI * 45}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedPresentation.score}</div>
                    <div className="text-xs text-gray-500">점</div>
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">종합 점수</h2>
            </div>

            {/* 세부 점수 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className={`text-lg font-bold ${getScoreColor(selectedPresentation.scores.expression)}`}>
                  {selectedPresentation.scores.expression}
                </div>
                <div className="text-xs text-gray-600">표현력</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className={`text-lg font-bold ${getScoreColor(selectedPresentation.scores.understanding)}`}>
                  {selectedPresentation.scores.understanding}
                </div>
                <div className="text-xs text-gray-600">이해도</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className={`text-lg font-bold ${getScoreColor(selectedPresentation.scores.voice)}`}>
                  {selectedPresentation.scores.voice}
                </div>
                <div className="text-xs text-gray-600">음성</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className={`text-lg font-bold ${getScoreColor(selectedPresentation.scores.gesture)}`}>
                  {selectedPresentation.scores.gesture}
                </div>
                <div className="text-xs text-gray-600">제스처</div>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <div className={`text-lg font-bold ${getScoreColor(selectedPresentation.scores.eye_contact)}`}>
                  {selectedPresentation.scores.eye_contact}
                </div>
                <div className="text-xs text-gray-600">시선처리</div>
              </div>
            </div>
          </div>

          {/* 피드백 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">AI 피드백</h3>
            <p className="text-gray-700 mb-4">{selectedPresentation.feedback}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  잘한 점
                </h4>
                <div className="space-y-1">
                  {selectedPresentation.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-700">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-red-800 mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  개선 포인트
                </h4>
                <div className="space-y-1">
                  {selectedPresentation.areas_to_focus.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex space-x-3">
            <button
              onClick={onNewPresentationClick}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              비슷한 주제로 재연습
            </button>
            <button
              onClick={() => setSelectedRecord(null)}
              className="flex-1 bg-[#74CD79] hover:bg-[#5FB366] text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 기록 목록 화면
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {onBackClick && (
              <button
                onClick={onBackClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-gray-900">내 발표 기록</h1>
              <p className="text-sm text-gray-500">발표 성장 과정을 확인해보세요</p>
            </div>
          </div>
          {onNewPresentationClick && (
            <button 
              onClick={onNewPresentationClick}
              className="bg-[#74CD79] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5FB366] transition-colors"
            >
              + 새 발표
            </button>
          )}
        </div>
      </div>

      {/* 성과 요약 */}
      <div className="p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">성과 요약</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#74CD79]">{presentations.length}</div>
              <div className="text-sm text-gray-500">총 발표 수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(presentations.reduce((sum, p) => sum + p.score, 0) / presentations.length)}
              </div>
              <div className="text-sm text-gray-500">평균 점수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...presentations.map(p => p.score))}
              </div>
              <div className="text-sm text-gray-500">최고 점수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {presentations.filter(p => p.status === 'excellent').length}
              </div>
              <div className="text-sm text-gray-500">우수 발표</div>
            </div>
          </div>
        </div>

        {/* 발표 기록 리스트 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">발표 기록</h3>
          {presentations.map((presentation) => (
            <div 
              key={presentation.id}
              onClick={() => setSelectedRecord(presentation.id)}
              className={`bg-white rounded-lg p-4 border-l-4 cursor-pointer hover:shadow-md transition-all ${getLeftBorderColor(presentation.status)} border border-gray-200`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{formatDate(presentation.date)}</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{formatTime(presentation.duration)}</span>
                  </div>
                  <h3 className="text-gray-900 font-medium text-base mb-2">
                    {presentation.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {presentation.improvements.slice(0, 2).map((improvement, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {improvement}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white ${getScoreBgColor(presentation.score)}`}>
                    {presentation.score}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">점</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationHistory;