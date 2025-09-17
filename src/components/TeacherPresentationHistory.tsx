import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, TrendingUp, Eye, Clock, Target } from 'lucide-react';

interface TeacherPresentationHistoryProps {
  sessionId: string;
  studentId: string;
  onBackClick: () => void;
}

const TeacherPresentationHistory: React.FC<TeacherPresentationHistoryProps> = ({
  sessionId,
  studentId,
  onBackClick
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'analysis' | 'feedback' | 'comparison'>('analysis');

  // 더미 데이터
  const sessionData = {
    session_id: sessionId,
    student_name: '김민지',
    title: '생물학 유전자 발표',
    date: '2024-09-14T14:30:00Z',
    duration: 750, // 12분 30초
    scores: {
      overall: 85,
      expression: 82,
      understanding: 89,
      voice: 80,
      gesture: 75,
      eye_contact: 88
    },
    analysis: {
      speaking_rate: {
        average: 160, // words per minute
        optimal_range: [120, 150],
        problem_sections: [
          { start: 120, end: 180, issue: '너무 빠름' },
          { start: 300, end: 360, issue: '너무 빠름' }
        ]
      },
      eye_contact: {
        center_percentage: 45,
        left_percentage: 25,
        right_percentage: 30,
        heatmap_data: [/* 히트맵 데이터 */]
      },
      voice_analysis: {
        volume_stable: true,
        tone_variation: 'good',
        pause_usage: 'needs_improvement'
      }
    },
    feedback_points: [
      {
        timestamp: 125,
        type: 'improvement',
        message: '이 구간에서 발화 속도가 너무 빨라집니다. 천천히 말해보세요.'
      },
      {
        timestamp: 245,
        type: 'positive',
        message: '시선 처리가 자연스럽고 좋습니다!'
      },
      {
        timestamp: 340,
        type: 'improvement',
        message: '제스처를 더 활용하면 설명이 더 명확해질 것 같습니다.'
      }
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const renderAnalysisTab = () => (
    <div className="space-y-6">
      {/* 전체 점수 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">종합 점수</h3>
        <div className="text-center mb-4">
          <div className={`text-4xl font-bold ${getScoreColor(sessionData.scores.overall)}`}>
            {sessionData.scores.overall}점
          </div>
          <div className="text-sm text-gray-500">100점 만점</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-xl font-semibold ${getScoreColor(sessionData.scores.expression)}`}>
              {sessionData.scores.expression}
            </div>
            <div className="text-sm text-gray-500">표현력</div>
          </div>
          <div className="text-center">
            <div className={`text-xl font-semibold ${getScoreColor(sessionData.scores.understanding)}`}>
              {sessionData.scores.understanding}
            </div>
            <div className="text-sm text-gray-500">이해도</div>
          </div>
          <div className="text-center">
            <div className={`text-xl font-semibold ${getScoreColor(sessionData.scores.voice)}`}>
              {sessionData.scores.voice}
            </div>
            <div className="text-sm text-gray-500">음성</div>
          </div>
          <div className="text-center">
            <div className={`text-xl font-semibold ${getScoreColor(sessionData.scores.gesture)}`}>
              {sessionData.scores.gesture}
            </div>
            <div className="text-sm text-gray-500">제스처</div>
          </div>
          <div className="text-center">
            <div className={`text-xl font-semibold ${getScoreColor(sessionData.scores.eye_contact)}`}>
              {sessionData.scores.eye_contact}
            </div>
            <div className="text-sm text-gray-500">시선처리</div>
          </div>
        </div>
      </div>

      {/* 발화 속도 분석 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">발화 속도 분석</h3>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>평균 속도: {sessionData.analysis.speaking_rate.average} 단어/분</span>
            <span>권장 범위: {sessionData.analysis.speaking_rate.optimal_range[0]}-{sessionData.analysis.speaking_rate.optimal_range[1]} 단어/분</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>
          </div>
          <div className="text-sm text-red-600 mt-2">
            ⚠️ 권장 범위보다 빠름 (개선 필요)
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">문제 구간</h4>
          {sessionData.analysis.speaking_rate.problem_sections.map((section, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-sm text-red-700">
                {formatTime(section.start)} - {formatTime(section.end)}
              </span>
              <span className="text-sm text-red-600">{section.issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 시선 분석 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">시선 처리 분석</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{sessionData.analysis.eye_contact.left_percentage}%</div>
            <div className="text-sm text-gray-500">좌측 청중</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{sessionData.analysis.eye_contact.center_percentage}%</div>
            <div className="text-sm text-gray-500">중앙 청중</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{sessionData.analysis.eye_contact.right_percentage}%</div>
            <div className="text-sm text-gray-500">우측 청중</div>
          </div>
        </div>
        
        {/* 시선 히트맵 영역 */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">시선 분포 히트맵</h4>
          <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <Eye className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">시선 추적 히트맵</div>
              <div className="text-xs">(실제로는 얼굴 이미지 위에 히트맵 표시)</div>
            </div>
          </div>
        </div>

        <div className="text-sm text-green-600">
          ✅ 전반적으로 균형 잡힌 시선 처리 (양호)
        </div>
      </div>
    </div>
  );

  const renderFeedbackTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">타임라인 피드백</h3>
        <div className="space-y-3">
          {sessionData.feedback_points.map((feedback, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                feedback.type === 'positive' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(feedback.timestamp)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feedback.type === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {feedback.type === 'positive' ? '잘함' : '개선'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{feedback.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 교사 메모 작성 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">교사 메모</h3>
        <textarea
          placeholder="이 발표에 대한 추가 의견이나 지도 방향을 작성해주세요..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#74CD79] focus:border-transparent"
        ></textarea>
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-[#74CD79] text-white rounded-lg hover:bg-[#5FB366] transition-colors">
            저장
          </button>
        </div>
      </div>
    </div>
  );

  const renderComparisonTab = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">이전 발표와 비교</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">이번 발표 (9/14)</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">종합 점수</span>
                <span className="font-semibold text-green-600">85점</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">발화 속도</span>
                <span className="font-semibold text-red-600">160 wpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">시선 처리</span>
                <span className="font-semibold text-green-600">88점</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">이전 발표 (9/10)</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">종합 점수</span>
                <span className="font-semibold text-yellow-600">78점</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">발화 속도</span>
                <span className="font-semibold text-red-600">170 wpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">시선 처리</span>
                <span className="font-semibold text-yellow-600">75점</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-2">개선 포인트</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700">종합 점수 7점 향상</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700">시선 처리 13점 향상</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700">발화 속도 10wpm 개선</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{sessionData.title}</h1>
            <p className="text-sm text-gray-500">
              {sessionData.student_name} • {formatDate(sessionData.date)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 비디오 플레이어 영역 */}
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
                  onClick={togglePlayback}
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
                    <div className="h-full bg-white rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(sessionData.duration)}
                </div>
                
                <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                  <Volume2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('analysis')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === 'analysis'
                  ? 'text-[#74CD79] border-b-2 border-[#74CD79]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              상세 분석
            </button>
            <button
              onClick={() => setSelectedTab('feedback')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === 'feedback'
                  ? 'text-[#74CD79] border-b-2 border-[#74CD79]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              피드백
            </button>
            <button
              onClick={() => setSelectedTab('comparison')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === 'comparison'
                  ? 'text-[#74CD79] border-b-2 border-[#74CD79]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              비교 분석
            </button>
          </div>
          
          <div className="p-4">
            {selectedTab === 'analysis' && renderAnalysisTab()}
            {selectedTab === 'feedback' && renderFeedbackTab()}
            {selectedTab === 'comparison' && renderComparisonTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPresentationHistory;