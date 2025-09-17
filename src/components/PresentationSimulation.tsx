import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, MicOff, Camera, CameraOff, Volume2, VolumeX, ChevronLeft, ChevronRight, Square, Play, Pause, StopCircle } from 'lucide-react';

interface PresentationSimulationProps {
  onBack: () => void;
  onComplete?: () => void;
}

const PresentationSimulation: React.FC<PresentationSimulationProps> = ({ onBack, onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const totalSlides = 8;
  const questions = [
    "방금 말씀하신 이론의 실제 적용 사례는 무엇인가요?",
    "이 연구 결과가 미래에 어떤 영향을 줄 것이라고 생각하시나요?",
    "다른 과학자들의 반대 의견에 대해서는 어떻게 생각하시나요?"
  ];

  // 녹화 시간 카운터
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // AI 질문 시뮬레이션
  useEffect(() => {
    if (isRecording && !isPaused) {
      const questionTimer = setTimeout(() => {
        setShowQuestion(true);
        setQuestionIndex(prev => (prev + 1) % questions.length);
        // 8초 후 질문 숨기기
        setTimeout(() => setShowQuestion(false), 8000);
      }, 20000); // 20초마다 질문 표시

      return () => clearTimeout(questionTimer);
    }
  }, [isRecording, isPaused, recordingTime]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    // 발표 완료 후 분석 화면으로 이동
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* 상단 상태바 */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black/50 px-4 py-2 text-white text-sm font-medium flex justify-between items-center">
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

      {/* 상단 컨트롤 바 */}
      <div className="absolute top-8 left-0 right-0 z-20 bg-black/60 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="text-white text-lg font-mono">
            {formatTime(recordingTime)}
          </div>
          {isRecording && !isPaused && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">REC</span>
            </div>
          )}
          {isPaused && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-white text-sm font-medium">PAUSED</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsSoundOn(!isSoundOn)}
            className={`p-2 rounded-full transition-colors ${
              isSoundOn ? 'bg-[#74CD79] text-white' : 'bg-gray-600 text-gray-300'
            }`}
          >
            {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 메인 발표 영역 */}
      <div className="flex h-screen pt-20">
        {/* 슬라이드 영역 */}
        <div className="flex-1 relative">
          {/* 가상 슬라이드 */}
          <div className="w-full h-full bg-white flex items-center justify-center relative">
            <div className="max-w-4xl mx-auto p-8 text-center">
              <div className="mb-8">
                <div className="text-8xl mb-6">🧬</div>
                <h1 className="text-5xl font-bold text-gray-800 mb-8">유전과 진화</h1>
                <div className="flex justify-center items-center space-x-12 mb-8">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🧬</div>
                    <p className="text-lg text-gray-600">DNA 구조</p>
                  </div>
                  <div className="text-4xl text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-6xl mb-2">🌱</div>
                    <p className="text-lg text-gray-600">진화 과정</p>
                  </div>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  생명체의 유전 정보가 어떻게 전달되고 변화하는지 알아보겠습니다
                </p>
              </div>
            </div>

            {/* 슬라이드 네비게이션 */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <button 
                onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                className={`bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-opacity ${
                  currentSlide === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black/80'
                }`}
                disabled={currentSlide === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentSlide} / {totalSlides}
              </div>
              
              <button 
                onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
                className={`bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-opacity ${
                  currentSlide === totalSlides ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black/80'
                }`}
                disabled={currentSlide === totalSlides}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 배경 소음 표시 */}
          {isSoundOn && (
            <div className="absolute top-24 right-6 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              🔊 강당 환경음
            </div>
          )}
        </div>

        {/* 발표자 웹캠 영역 */}
        <div className="w-80 bg-black relative">
          {isCameraOn ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
              {/* 가상 웹캠 화면 */}
              <div className="text-white text-center">
                <div className="w-40 h-40 bg-white/20 rounded-full mb-6 mx-auto flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <span className="text-6xl">👤</span>
                </div>
                <p className="text-sm opacity-80 font-medium">발표자 화면</p>
                <p className="text-xs opacity-60 mt-1">실시간 AI 분석 중</p>
              </div>

              {/* 시선 추적 표시 */}
              <div className="absolute top-6 right-6 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-xs text-white/90 font-medium">시선 추적</div>
              </div>

              {/* 음성 레벨 표시 */}
              {isMicOn && isRecording && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-white/80 mb-2">음성 레벨</div>
                    <div className="flex space-x-1">
                      {Array.from({length: 10}).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-6 rounded-sm ${
                            i < 6 ? 'bg-green-400' : 'bg-gray-600'
                          }`}
                          style={{
                            height: `${8 + (i * 2)}px`,
                            animation: i < 6 ? 'pulse 1s infinite' : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <CameraOff className="w-16 h-16 mx-auto mb-4" />
                <p className="text-sm">카메라 꺼짐</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI 예상 질문 팝업 */}
      {showQuestion && (
        <div className="absolute bottom-32 left-6 right-6 bg-black/90 backdrop-blur-sm text-white p-6 rounded-2xl z-30 animate-slide-up border border-white/20">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-[#74CD79] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-lg">💭 예상 질문</h4>
              <p className="text-gray-200 leading-relaxed">{questions[questionIndex]}</p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#74CD79] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#74CD79] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-[#74CD79] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-xs text-gray-400">AI가 질문을 준비 중입니다</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 실시간 분석 표시 */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-4 rounded-xl text-sm space-y-3 z-10 border border-white/20">
        <h4 className="font-semibold text-xs text-gray-300 uppercase tracking-wide">실시간 분석</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs">음량: 적정</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-xs">발화 속도: 보통</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs">시선 처리: 좋음</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs">자세: 안정적</span>
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 패널 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 flex justify-center items-center space-x-8 z-20 border-t border-white/10">
        {/* 마이크 버튼 */}
        <button 
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-4 rounded-full transition-all duration-200 ${
            isMicOn 
              ? 'bg-[#74CD79] text-white shadow-lg hover:bg-[#5FB366] hover:scale-105' 
              : 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-105'
          }`}
        >
          {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
        </button>

        {/* 녹화 제어 버튼들 */}
        <div className="flex items-center space-x-4">
          {!isRecording ? (
            <button 
              onClick={handleStartRecording}
              className="p-4 rounded-full bg-red-500 text-white transition-all duration-200 hover:bg-red-600 hover:scale-105 shadow-lg"
            >
              <Play className="w-6 h-6" />
            </button>
          ) : (
            <>
              <button 
                onClick={handlePauseRecording}
                className={`p-4 rounded-full transition-all duration-200 shadow-lg hover:scale-105 ${
                  isPaused 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={handleStopRecording}
                className="p-4 rounded-full bg-gray-600 text-white transition-all duration-200 hover:bg-gray-700 hover:scale-105 shadow-lg"
              >
                <StopCircle className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* 카메라 버튼 */}
        <button 
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`p-4 rounded-full transition-all duration-200 ${
            isCameraOn 
              ? 'bg-[#74CD79] text-white shadow-lg hover:bg-[#5FB366] hover:scale-105' 
              : 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-105'
          }`}
        >
          {isCameraOn ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default PresentationSimulation;