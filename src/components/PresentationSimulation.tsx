import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, MicOff, Camera, CameraOff, Volume2, VolumeX, ChevronLeft, ChevronRight, Square, Play, Pause, StopCircle } from 'lucide-react';

interface PresentationSimulationProps {
  onBack: () => void;
  onComplete?: () => void;
  uploadedFile?: File | null;
}

const PresentationSimulation: React.FC<PresentationSimulationProps> = ({ onBack, onComplete, uploadedFile }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [presenterHeight, setPresenterHeight] = useState(45); // 발표자 화면 높이 비율 (%)
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 테스트 파일들 - public 폴더로 이동 필요
  const testFiles = [
    { name: 'test1.pdf', path: '/test/test1.pdf', type: 'pdf' },
    { name: 'test2.pptx', path: '/test/test2.pptx', type: 'pptx' }
  ];

  const totalSlides = uploadedFile ? 8 : 8; // 실제 파일에서는 동적으로 계산 가능
  const questions = [
    "방금 말씀하신 이론의 실제 적용 사례는 무엇인가요?",
    "이 연구 결과가 미래에 어떤 영향을 줄 것이라고 생각하시나요?",
    "다른 과학자들의 반대 의견에 대해서는 어떻게 생각하시나요?"
  ];

  // 녹화 시간 카운터
  useEffect(() => {
    let interval: number | undefined;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  // 파일 URL 생성
  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setFileUrl(url);
      console.log('📁 업로드된 파일 URL 생성:', url, uploadedFile.name);
      return () => URL.revokeObjectURL(url);
    } else {
      // 테스트 파일 사용 (랜덤 선택)
      const randomTestFile = testFiles[Math.floor(Math.random() * testFiles.length)];
      setFileUrl(randomTestFile.path);
      console.log('🧪 테스트 파일 선택:', randomTestFile.name, randomTestFile.path);
    }
  }, [uploadedFile]);

  // 슬라이드 변경 디버깅
  useEffect(() => {
    console.log('🔄 슬라이드 변경됨:', currentSlide, '/', totalSlides);
    console.log('📄 현재 파일 URL:', fileUrl);
  }, [currentSlide, fileUrl]);

  // 카메라 스트림 관리
  useEffect(() => {
    const startCamera = async () => {
      if (isCameraOn) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user'
            },
            audio: false 
          });
          setVideoStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          console.log('📹 카메라 활성화됨');
        } catch (error) {
          console.error('카메라 접근 실패:', error);
          setIsCameraOn(false);
        }
      } else {
        // 카메라 끄기
        if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
          setVideoStream(null);
          console.log('📹 카메라 비활성화됨');
        }
      }
    };

    startCamera();

    // 컴포넌트 언마운트 시 스트림 정리
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

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

      {/* 메인 발표 영역 - 세로 분할 */}
      <div className="flex flex-col h-screen pt-20">
        {/* 발표자 웹캠 영역 (위) */}
        <div 
          className="relative bg-black border-b border-gray-600"
          style={{ height: `${presenterHeight}%` }}
        >
          {isCameraOn ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
              {/* 실제 웹캠 화면 */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // 거울 효과
              />
              
              {/* 웹캠이 없을 때 fallback */}
              {!videoStream && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full mb-4 mx-auto flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <span className="text-5xl">👤</span>
                    </div>
                    <p className="text-sm opacity-80 font-medium">웹캠 연결 중...</p>
                    <p className="text-xs opacity-60 mt-1">카메라 권한을 허용해주세요</p>
                  </div>
                </div>
              )}

              {/* 시선 추적 표시 */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-xs text-white/90 font-medium">시선 추적</div>
              </div>

              {/* 음성 레벨 표시 */}
              {isMicOn && isRecording && (
                <div className="absolute bottom-4 left-4 right-4">
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

              {/* 실시간 분석 표시 */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-3 rounded-xl text-sm space-y-2 border border-white/20">
                <h4 className="font-semibold text-xs text-gray-300 uppercase tracking-wide">실시간 분석</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs">음량: 적정</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs">발화 속도: 보통</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs">시선 처리: 좋음</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs">자세: 안정적</span>
                  </div>
                </div>
              </div>
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

        {/* 크기 조정 구분선 및 버튼 */}
        <div className="h-1 bg-gray-600 flex items-center justify-center group relative">
          <div className="w-8 h-0.5 bg-gray-400 group-hover:bg-gray-300 transition-colors"></div>
          
          {/* 크기 조정 버튼 */}
          <div className="absolute left-4 flex space-x-2">
            <button
              onClick={() => setPresenterHeight(Math.max(25, presenterHeight - 10))}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold touch-manipulation active:scale-95"
              disabled={presenterHeight <= 25}
            >
              −
            </button>
            <button
              onClick={() => setPresenterHeight(Math.min(75, presenterHeight + 10))}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold touch-manipulation active:scale-95"
              disabled={presenterHeight >= 75}
            >
              +
            </button>
          </div>
          
          {/* 크기 표시 */}
          <div className="absolute right-4 bg-gray-800 text-white px-2 py-1 rounded text-xs">
            {Math.round(presenterHeight)}%
          </div>
        </div>

        {/* 슬라이드 영역 (아래) - 발표자료만 꽉 차게 */}
        <div 
          className="flex-1 relative bg-white"
          style={{ height: `${100 - presenterHeight}%` }}
        >
          {/* 발표 자료 전체 화면 */}
          <div className="w-full h-full relative overflow-hidden">
            {uploadedFile || fileUrl ? (
              <div className="w-full h-full flex flex-col">
                {/* 실제 파일 미리보기 - 전체 화면 */}
                {uploadedFile && (
                  <div className="flex-1 w-full">
                    {uploadedFile.type.includes('pdf') ? (
                      <iframe 
                        key={`pdf-uploaded-${currentSlide}`}
                        src={`${fileUrl}#page=${currentSlide}&toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full border-0"
                        title="PDF 발표자료"
                      />
                    ) : (
                      <div className="w-full h-full bg-white flex items-center justify-center border">
                        <div className="text-center p-8">
                          <div className="text-8xl mb-6">📊</div>
                          <h2 className="text-3xl font-bold text-gray-800 mb-4">PowerPoint 발표자료</h2>
                          <p className="text-lg text-gray-600 mb-4">{uploadedFile.name}</p>
                          <p className="text-base text-gray-500">슬라이드 {currentSlide} / {totalSlides}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* 테스트 파일 미리보기 - 전체 화면 */}
                {!uploadedFile && fileUrl && (
                  <div className="flex-1 w-full">
                    {fileUrl.includes('.pdf') ? (
                      <iframe 
                        key={`pdf-test-${currentSlide}`}
                        src={`${fileUrl}#page=${currentSlide}&toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full border-0"
                        title="테스트 PDF 발표자료"
                        onError={() => console.log('PDF 로드 실패:', fileUrl)}
                      />
                    ) : (
                      <div className="w-full h-full bg-white flex items-center justify-center border">
                        <div className="text-center p-8">
                          <div className="text-8xl mb-6">📊</div>
                          <h2 className="text-3xl font-bold text-gray-800 mb-4">PowerPoint 발표자료</h2>
                          <p className="text-lg text-gray-600 mb-4">{fileUrl.split('/').pop()}</p>
                          <p className="text-base text-gray-500">슬라이드 {currentSlide} / {totalSlides}</p>
                          
                          {/* 모의 슬라이드 내용 */}
                          <div className="mt-8 bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto">
                            <h3 className="text-xl font-semibold mb-4 text-blue-600">
                              슬라이드 {currentSlide}: {
                                currentSlide === 1 ? 'DNA의 구조' :
                                currentSlide === 2 ? '유전자 발현' :
                                currentSlide === 3 ? '돌연변이' :
                                '진화 메커니즘'
                              }
                            </h3>
                            <div className="text-left space-y-3">
                              {currentSlide === 1 && (
                                <>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>이중 나선 구조의 특징</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>염기쌍의 상보성 원리</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>유전정보 저장 방식</p>
                                </>
                              )}
                              {currentSlide === 2 && (
                                <>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>전사: DNA → RNA</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>번역: RNA → 단백질</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>단백질 합성 과정</p>
                                </>
                              )}
                              {currentSlide === 3 && (
                                <>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>점 돌연변이의 종류</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>염색체 이상</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>진화의 원동력 역할</p>
                                </>
                              )}
                              {currentSlide >= 4 && (
                                <>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>자연선택의 원리</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>유전적 부동</p>
                                  <p className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>종 분화 과정</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">🧬</div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-6">유전과 진화</h1>
                  <div className="flex justify-center items-center space-x-8 mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🧬</div>
                      <p className="text-base text-gray-600">DNA 구조</p>
                    </div>
                    <div className="text-3xl text-gray-400">→</div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌱</div>
                      <p className="text-base text-gray-600">진화 과정</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    생명체의 유전 정보가 어떻게 전달되고 변화하는지 알아보겠습니다
                  </p>
                </div>
              </div>
            )}

            {/* 크고 명확한 슬라이드 네비게이션 버튼 */}
            <div className="absolute bottom-32 left-8 right-8 flex justify-between items-center z-20">
              <button 
                onClick={() => {
                  const newSlide = Math.max(1, currentSlide - 1);
                  console.log('이전 버튼 클릭:', currentSlide, '->', newSlide);
                  setCurrentSlide(newSlide);
                }}
                className={`bg-black/90 text-white p-2 rounded-2xl backdrop-blur-sm transition-all duration-200 touch-manipulation shadow-2xl ${
                  currentSlide === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black active:scale-95 hover:shadow-3xl'
                }`}
                disabled={currentSlide === 1}
              >
                <div className="flex items-center space-x-3">
                  <ChevronLeft className="w-8 h-8" />
                </div>
              </button>
              
              <div className="bg-black/50 text-white px-4 py-2 rounded-2xl backdrop-blur-sm font-bold text-xl shadow-2xl border border-white/20">
                {currentSlide} / {totalSlides}
              </div>
              
              <button 
                onClick={() => {
                  const newSlide = Math.min(totalSlides, currentSlide + 1);
                  console.log('다음 버튼 클릭:', currentSlide, '->', newSlide);
                  setCurrentSlide(newSlide);
                }}
                className={`bg-black/90 text-white p-2 rounded-2xl backdrop-blur-sm transition-all duration-200 touch-manipulation shadow-2xl ${
                  currentSlide === totalSlides ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black active:scale-95 hover:shadow-3xl'
                }`}
                disabled={currentSlide === totalSlides}
              >
                <div className="flex items-center space-x-3">
                  <ChevronRight className="w-8 h-8" />
                </div>
              </button>
            </div>

            {/* 추가 컨트롤 버튼들 - 우상단 */}
            <div className="absolute top-4 right-4 flex space-x-3 z-20">
              <button 
                onClick={isRecording ? handlePauseRecording : handleStartRecording}
                className={`p-4 rounded-xl backdrop-blur-sm transition-all touch-manipulation shadow-lg active:scale-95 ${
                  isRecording 
                    ? (isPaused ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white')
                    : 'bg-red-500/90 text-white'
                }`}
              >
                {!isRecording ? (
                  <Play className="w-6 h-6" />
                ) : isPaused ? (
                  <Play className="w-6 h-6" />
                ) : (
                  <Pause className="w-6 h-6" />
                )}
              </button>
              
              {isRecording && (
                <button 
                  onClick={handleStopRecording}
                  className="p-4 rounded-xl bg-gray-600/90 text-white backdrop-blur-sm transition-all touch-manipulation shadow-lg active:scale-95"
                >
                  <Square className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* 배경 소음 표시 */}
          {isSoundOn && (
            <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm z-20">
              🔊 강당 환경음
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

      {/* 하단 컨트롤 패널 - 모바일 최적화 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 flex justify-center items-center space-x-6 z-20 border-t border-white/10">
        {/* 마이크 버튼 */}
        <button 
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-5 rounded-full transition-all duration-200 touch-manipulation ${
            isMicOn 
              ? 'bg-[#74CD79] text-white shadow-lg hover:bg-[#5FB366] active:scale-95' 
              : 'bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95'
          }`}
        >
          {isMicOn ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
        </button>

        {/* 녹화 제어 버튼들 */}
        <div className="flex items-center space-x-4">
          {!isRecording ? (
            <button 
              onClick={handleStartRecording}
              className="p-5 rounded-full bg-red-500 text-white transition-all duration-200 hover:bg-red-600 active:scale-95 shadow-lg touch-manipulation"
            >
              <Play className="w-7 h-7" />
            </button>
          ) : (
            <>
              <button 
                onClick={handlePauseRecording}
                className={`p-5 rounded-full transition-all duration-200 shadow-lg touch-manipulation active:scale-95 ${
                  isPaused 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                {isPaused ? <Play className="w-7 h-7" /> : <Pause className="w-7 h-7" />}
              </button>
              
              <button 
                onClick={handleStopRecording}
                className="p-5 rounded-full bg-gray-600 text-white transition-all duration-200 hover:bg-gray-700 active:scale-95 shadow-lg touch-manipulation"
              >
                <StopCircle className="w-7 h-7" />
              </button>
            </>
          )}
        </div>

        {/* 카메라 버튼 */}
        <button 
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`p-5 rounded-full transition-all duration-200 touch-manipulation ${
            isCameraOn 
              ? 'bg-[#74CD79] text-white shadow-lg hover:bg-[#5FB366] active:scale-95' 
              : 'bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95'
          }`}
        >
          {isCameraOn ? <Camera className="w-7 h-7" /> : <CameraOff className="w-7 h-7" />}
        </button>
      </div>
    </div>
  );
};

export default PresentationSimulation;