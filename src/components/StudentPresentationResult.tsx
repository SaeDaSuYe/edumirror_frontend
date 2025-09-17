import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, TrendingUp, TrendingDown, Target, Eye, Mic, Users, Clock, Award } from 'lucide-react';

interface StudentPresentationResultProps {
  onBackClick: () => void;
  onRetryClick: () => void;
}

const StudentPresentationResult: React.FC<StudentPresentationResultProps> = ({
  onBackClick,
  onRetryClick
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'detailed' | 'suggestions'>('overview');

  // 더미 분석 결과 데이터
  const analysisResult = {
    session_id: 'session_latest',
    title: '생물학 유전자 발표',
    date: '2024-09-17T14:30:00Z',
    duration: 750, // 12분 30초
    overall_score: 85,
    scores: {
      expression: 82,
      understanding: 89,
      voice_quality: 80,
      gesture: 75,
      eye_contact: 88,
      content_structure: 87
    },
    improvements: [
      {
        category: '발화 속도',
        current_score: 70,
        target_score: 85,
        feedback: '평균보다 20% 빠른 속도로 말하고 있습니다. 천천히 말하면 더 명확하게 전달될 것입니다.',
        tips: ['문장 사이에 1-2초 간격 두기', '중요한 단어는 더 천천히 강조', '호흡을 의식적으로 조절하기']
      },
      {
        category: '제스처 활용',
        current_score: 75,
        target_score: 90,
        feedback: '손동작이 부족하여 설명력이 떨어집니다. 적절한 제스처로 내용을 강조해보세요.',
        tips: ['설명하는 내용에 맞는 손동작 추가', '감정 표현을 위한 제스처 활용', '자연스러운 움직임 연습']
      }
    ],
    strengths: [
      '시선 처리가 자연스럽고 청중과의 소통이 원활했습니다',
      '내용 이해도가 뛰어나며 논리적으로 구성되었습니다',
      '목소리 톤이 안정적이고 명료합니다'
    ],
    timeline_feedback: [
      {
        timestamp: 125,
        type: 'improvement',
        message: '발화 속도가 빨라지고 있습니다. 천천히 말해보세요.'
      },
      {
        timestamp: 245,
        type: 'positive',
        message: '시선 처리가 훌륭합니다! 청중과의 아이컨택이 자연스럽네요.'
      },
      {
        timestamp: 340,
        type: 'improvement',
        message: '제스처를 더 활용하면 설명이 더 생동감 있어질 것 같습니다.'
      },
      {
        timestamp: 480,
        type: 'positive',
        message: '복잡한 개념을 이해하기 쉽게 설명하고 있습니다.'
      }
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* 종합 점수 */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 relative">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#74CD79"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 50 * (analysisResult.overall_score / 100)} ${2 * Math.PI * 50}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{analysisResult.overall_score}</div>
              <div className="text-sm text-gray-500">점</div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">발표 분석 결과</h2>
        <p className="text-gray-600">전반적으로 우수한 발표였습니다!</p>
      </div>

      {/* 세부 점수 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className={`text-xl font-bold ${getScoreColor(analysisResult.scores.expression)}`}>
            {analysisResult.scores.expression}
          </div>
          <div className="text-sm text-gray-600">표현력</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className={`text-xl font-bold ${getScoreColor(analysisResult.scores.understanding)}`}>
            {analysisResult.scores.understanding}
          </div>
          <div className="text-sm text-gray-600">이해도</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Mic className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className={`text-xl font-bold ${getScoreColor(analysisResult.scores.voice_quality)}`}>
            {analysisResult.scores.voice_quality}
          </div>
          <div className="text-sm text-gray-600">음성</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="w-6 h-6 text-orange-600 mx-auto mb-2">🤚</div>
          <div className={`text-xl font-bold ${getScoreColor(analysisResult.scores.gesture)}`}>
            {analysisResult.scores.gesture}
          </div>
          <div className="text-sm text-gray-600">제스처</div>
        </div>
        <div className="text-center p-4 bg-indigo-50 rounded-lg">
          <Eye className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <div className={`text-xl font-bold ${getScoreColor(analysisResult.scores.eye_contact)}`}>
            {analysisResult.scores.eye_contact}
          </div>
          <div className="text-sm text-gray-600">시선처리</div>
        </div>
        <div className="text-center p-4 bg-pink-50 rounded-lg">
          <Award className="w-6 h-6 text-pink-600 mx-auto mb-2" />
          <div className={`text-xl font-bold ${getScoreColor(analysisResult.scores.content_structure)}`}>
            {analysisResult.scores.content_structure}
          </div>
          <div className="text-sm text-gray-600">구성력</div>
        </div>
      </div>

      {/* 강점 */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          잘한 점
        </h3>
        <div className="space-y-2">
          {analysisResult.strengths.map((strength, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-green-700 text-sm">{strength}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDetailedTab = () => (
    <div className="space-y-6">
      {/* 개선 포인트 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">개선 포인트</h3>
        {analysisResult.improvements.map((improvement, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">{improvement.category}</h4>
              <div className="flex items-center space-x-2">
                <span className={`text-sm px-2 py-1 rounded ${getScoreBgColor(improvement.current_score)}`}>
                  현재 {improvement.current_score}점
                </span>
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  목표 {improvement.target_score}점
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-3">{improvement.feedback}</p>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">개선 방법:</h5>
              <div className="space-y-1">
                {improvement.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 타임라인 피드백 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">타임라인 피드백</h3>
        <div className="space-y-3">
          {analysisResult.timeline_feedback.map((feedback, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                feedback.type === 'positive' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-gray-400" />
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
    </div>
  );

  const renderSuggestionsTab = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#74CD79]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-[#74CD79]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">다음 발표를 위한 추천</h3>
        <p className="text-gray-600">AI가 분석한 결과를 바탕으로 맞춤형 연습을 추천합니다</p>
      </div>

      <div className="space-y-4">
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-blue-900 mb-2">발화 속도 개선 연습</h4>
          <p className="text-blue-700 text-sm mb-3">천천히 말하기 연습을 통해 명확한 전달력을 높이세요</p>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
            연습 시작하기
          </button>
        </div>

        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <h4 className="font-semibold text-green-900 mb-2">제스처 활용 트레이닝</h4>
          <p className="text-green-700 text-sm mb-3">효과적인 손동작으로 발표력을 향상시키세요</p>
          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
            연습 시작하기
          </button>
        </div>

        <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
          <h4 className="font-semibold text-purple-900 mb-2">유사한 주제로 재연습</h4>
          <p className="text-purple-700 text-sm mb-3">비슷한 과학 주제로 연습하여 전문성을 높이세요</p>
          <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
            주제 선택하기
          </button>
        </div>
      </div>

      {/* 목표 설정 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">다음 목표 설정</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">전체 점수</span>
            <span className="text-sm font-medium">85점 → 90점</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">발화 속도</span>
            <span className="text-sm font-medium">70점 → 85점</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">제스처 활용</span>
            <span className="text-sm font-medium">75점 → 90점</span>
          </div>
        </div>
        <button className="w-full mt-4 px-4 py-2 bg-[#74CD79] text-white rounded-lg hover:bg-[#5FB366] transition-colors">
          목표 저장하기
        </button>
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
            <h1 className="text-lg font-semibold text-gray-900">{analysisResult.title}</h1>
            <p className="text-sm text-gray-500">
              {formatTime(analysisResult.duration)} • 방금 완료됨
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
              <div className="text-lg font-medium">내 발표 영상</div>
              <div className="text-sm text-gray-300">클릭하여 다시 보기</div>
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
                    <div className="h-full bg-white rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="text-white text-sm">
                  {formatTime(analysisResult.duration)}
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
              onClick={() => setSelectedTab('overview')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === 'overview'
                  ? 'text-[#74CD79] border-b-2 border-[#74CD79]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              종합 결과
            </button>
            <button
              onClick={() => setSelectedTab('detailed')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === 'detailed'
                  ? 'text-[#74CD79] border-b-2 border-[#74CD79]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              상세 분석
            </button>
            <button
              onClick={() => setSelectedTab('suggestions')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                selectedTab === 'suggestions'
                  ? 'text-[#74CD79] border-b-2 border-[#74CD79]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              맞춤 추천
            </button>
          </div>
          
          <div className="p-4">
            {selectedTab === 'overview' && renderOverviewTab()}
            {selectedTab === 'detailed' && renderDetailedTab()}
            {selectedTab === 'suggestions' && renderSuggestionsTab()}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex space-x-3">
          <button
            onClick={onRetryClick}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            다시 발표하기
          </button>
          <button
            onClick={onBackClick}
            className="flex-1 bg-[#74CD79] hover:bg-[#5FB366] text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPresentationResult;