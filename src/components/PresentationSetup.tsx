import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, FileText, Camera, Settings, Mic, CheckCircle, ChevronDown, X } from 'lucide-react';

interface PresentationSetupProps {
  onBackClick: () => void;
  onStartPresentation: (file?: File) => void;
}

const PresentationSetup: React.FC<PresentationSetupProps> = ({
  onBackClick,
  onStartPresentation
}) => {
  const [presentationName, setPresentationName] = useState('');
  const [presentationContent, setPresentationContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedScriptFile, setSelectedScriptFile] = useState<File | null>(null);
  const [cameraConnected, setCameraConnected] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState('classroom');
  const [environmentDropdownOpen, setEnvironmentDropdownOpen] = useState(false);
  const [auditoriumNoise, setAuditoriumNoise] = useState(true);
  const [qaResponse, setQaResponse] = useState(true);
  const [aiQuestionTiming, setAiQuestionTiming] = useState('during'); // 'during' or 'after'

  const videoRef = useRef<HTMLVideoElement>(null);

  const environments = [
    { id: 'classroom', name: '🏫 교실', emoji: '🏫' },
    { id: 'auditorium', name: '🏛️ 강당', emoji: '🏛️' },
    { id: 'online', name: '💻 온라인', emoji: '💻' }
  ];

  const getSelectedEnvironment = () => {
    return environments.find(env => env.id === selectedEnvironment) || environments[0];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 형식 검증 (PDF, PPT만 허용)
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert('PDF 또는 PPT 파일만 업로드 가능합니다.');
        event.target.value = ''; // 입력 초기화
      }
    }
  };

  const handleScriptFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 형식 검증 (TXT, PDF만 허용)
      const allowedTypes = [
        'text/plain',
        'application/pdf'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setSelectedScriptFile(file);
      } else {
        alert('TXT 또는 PDF 파일만 업로드 가능합니다.');
        event.target.value = ''; // 입력 초기화
      }
    }
  };

  const handleCameraToggle = async () => {
    if (cameraConnected && cameraStream) {
      // 카메라 연결 해제
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setCameraConnected(false);
    } else {
      // 카메라 연결
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 }
          },
          audio: false 
        });
        setCameraStream(stream);
        setCameraConnected(true);
      } catch (error) {
        console.error('카메라 접근 오류:', error);
        alert('카메라에 접근할 수 없습니다. 브라우저에서 카메라 권한을 허용해주세요.');
      }
    }
  };

  // 카메라 스트림이 변경될 때 비디오 요소에 연결
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // 컴포넌트 언마운트 시 카메라 스트림 정리
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleStartPresentation = () => {
    onStartPresentation(selectedFile || undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 상태바 */}
      <div className="bg-[#4C4C4C] px-4 py-2 text-white text-sm font-medium flex justify-between items-center">
        <span>9:30</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-white rounded-full" />
            <span className="w-1 h-1 bg-white rounded-full" />
            <span className="w-1 h-1 bg-white rounded-full" />
            <span className="w-1 h-1 bg-white rounded-full" />
          </div>
          <span className="text-xs">📶</span>
          <span className="text-xs">📶</span>
          <span className="text-xs">🔋</span>
        </div>
      </div>

      {/* 상단 헤더 */}
      <div className="bg-[#4C4C4C] px-4 py-4 flex items-center">
        <button
          onClick={onBackClick}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-xl font-bold">내 성장 현황</h1>
      </div>

      {/* 메인 컨텐츠 스크롤 영역 */}
      <div className="bg-[#404040] flex-1 overflow-y-auto px-7 py-6 space-y-8">
        
        {/* 발표 정보 섹션 */}
        <div className="relative">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-neutral-200 text-xl font-bold font-['Golos_Text']">발표 정보</h2>
          </div>
          
          <div className="bg-neutral-600 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
            {/* 발표 이름 */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FileText className="w-6 h-6 text-neutral-500 mr-3" />
                <label className="text-stone-300 text-lg font-bold font-['Golos_Text']">발표 이름</label>
              </div>
              <div className="bg-neutral-700 rounded-[20px] p-4">
                <input
                  type="text"
                  value={presentationName}
                  onChange={(e) => setPresentationName(e.target.value)}
                  placeholder="S4-1 본선 발표"
                  className="w-full bg-transparent text-neutral-400 text-base font-medium font-['Golos_Text'] outline-none placeholder:text-neutral-500"
                />
              </div>
            </div>

            {/* 발표 내용 */}
            <div>
              <div className="flex items-center mb-3">
                <Mic className="w-6 h-6 text-neutral-500 mr-3" />
                <label className="text-stone-300 text-lg font-bold font-['Golos_Text']">발표 내용</label>
              </div>
              <div className="bg-neutral-700 rounded-[20px] p-4">
                <input
                  type="text"
                  value={presentationContent}
                  onChange={(e) => setPresentationContent(e.target.value)}
                  placeholder="S4-1팀의 K 해커톤 본선 발표 연습"
                  className="w-full bg-transparent text-neutral-400 text-base font-medium font-['Golos_Text'] outline-none placeholder:text-neutral-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 발표 대본 세팅 섹션 */}
        <div className="relative">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-neutral-200 text-xl font-bold font-['Golos_Text']">발표 대본 세팅</h2>
          </div>
          
          <div className="bg-neutral-600 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 h-52 flex flex-col items-center justify-center">
            {selectedScriptFile ? (
              // 파일이 업로드된 경우
              <div className="flex flex-col items-center">
                <FileText className="w-12 h-12 text-green-400 mb-4" />
                <p className="text-stone-300 text-base font-semibold font-['Golos_Text'] text-center mb-2">
                  업로드 완료!
                </p>
                <p className="text-neutral-400 text-sm font-medium font-['Golos_Text'] text-center mb-4 break-all">
                  {selectedScriptFile.name}
                </p>
                <button
                  onClick={() => setSelectedScriptFile(null)}
                  className="bg-neutral-700 rounded-[10px] border border-neutral-500 px-4 py-2 cursor-pointer hover:bg-neutral-600 transition-colors flex items-center"
                >
                  <X className="w-4 h-4 text-stone-400 mr-2" />
                  <span className="text-neutral-400 text-sm font-semibold font-['Golos_Text']">파일 제거</span>
                </button>
              </div>
            ) : (
              // 파일이 업로드되지 않은 경우
              <>
                <p className="text-stone-300 text-base font-semibold font-['Golos_Text'] text-center mb-4">
                  여기에서 발표 대본을 업로드해주세요!
                </p>
                
                <input
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleScriptFileChange}
                  className="hidden"
                  id="script-file-upload"
                />
                <label
                  htmlFor="script-file-upload"
                  className="bg-neutral-600 rounded-[10px] border border-green-400 px-6 py-3 cursor-pointer hover:bg-neutral-500 transition-colors flex items-center"
                >
                  <Upload className="w-4 h-4 text-stone-400 mr-2" />
                  <span className="text-neutral-500 text-base font-semibold font-['Golos_Text']">발표 대본 업로드</span>
                </label>
                <p className="text-neutral-500 text-xs font-medium font-['Golos_Text'] text-center mt-2">
                  TXT, PDF 파일만 지원
                </p>
              </>
            )}
          </div>
        </div>

        {/* 발표 자료 세팅 섹션 */}
        <div className="relative">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-neutral-200 text-xl font-bold font-['Golos_Text']">발표 자료 세팅</h2>
          </div>
          
          <div className="bg-neutral-600 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 h-52 flex flex-col items-center justify-center">
            {selectedFile ? (
              // 파일이 업로드된 경우
              <div className="flex flex-col items-center">
                <FileText className="w-12 h-12 text-green-400 mb-4" />
                <p className="text-stone-300 text-base font-semibold font-['Golos_Text'] text-center mb-2">
                  업로드 완료!
                </p>
                <p className="text-neutral-400 text-sm font-medium font-['Golos_Text'] text-center mb-4 break-all">
                  {selectedFile.name}
                </p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="bg-neutral-700 rounded-[10px] border border-neutral-500 px-4 py-2 cursor-pointer hover:bg-neutral-600 transition-colors flex items-center"
                >
                  <X className="w-4 h-4 text-stone-400 mr-2" />
                  <span className="text-neutral-400 text-sm font-semibold font-['Golos_Text']">파일 제거</span>
                </button>
              </div>
            ) : (
              // 파일이 업로드되지 않은 경우
              <>
                <p className="text-stone-300 text-base font-semibold font-['Golos_Text'] text-center mb-4">
                  여기에서 발표 자료를 봐주세요!
                </p>
                
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-neutral-600 rounded-[10px] border border-green-400 px-6 py-3 cursor-pointer hover:bg-neutral-500 transition-colors flex items-center"
                >
                  <Upload className="w-4 h-4 text-stone-400 mr-2" />
                  <span className="text-neutral-500 text-base font-semibold font-['Golos_Text']">발표 자료 업로드</span>
                </label>
                <p className="text-neutral-500 text-xs font-medium font-['Golos_Text'] text-center mt-2">
                  PDF, PPT 파일만 지원
                </p>
              </>
            )}
          </div>
        </div>

        {/* 카메라 연결 섹션 */}
        <div className="relative">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-neutral-200 text-xl font-bold font-['Golos_Text']">카메라 연결</h2>
          </div>
          
          <div className="bg-neutral-600 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-2 h-56 relative overflow-hidden">
            {cameraConnected && cameraStream ? (
              // 카메라가 연결된 경우
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ transform: 'scaleX(-1)' }} // 셀카 모드처럼 좌우 반전
                  className="w-full h-full object-cover rounded-lg bg-black"
                />
                <button
                  onClick={handleCameraToggle}
                  className="absolute bottom-2 right-2 bg-red-600 rounded-full p-2 hover:bg-red-700 transition-colors z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="absolute top-2 left-2 bg-black/70 rounded-lg px-2 py-1 z-10">
                  <span className="text-white text-xs font-medium">카메라 연결됨</span>
                </div>
              </>
            ) : (
              // 카메라가 연결되지 않은 경우
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-stone-300 text-base font-semibold font-['Golos_Text'] text-center mb-4">
                  자신의 발표를 함께 봐요!
                </p>
                
                <button
                  onClick={handleCameraToggle}
                  className="bg-neutral-600 rounded-[10px] border border-green-400 px-6 py-3 hover:bg-neutral-500 transition-colors flex items-center"
                >
                  <Camera className="w-5 h-5 text-neutral-500 mr-2" />
                  <span className="text-neutral-500 text-base font-semibold font-['Golos_Text']">카메라 연결</span>
                </button>
                <p className="text-neutral-500 text-xs font-medium font-['Golos_Text'] text-center mt-2">
                  전면 카메라(셀카 모드)를 사용합니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 발표 옵션 선택 섹션 */}
        <div className="relative">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-neutral-200 text-xl font-bold font-['Golos_Text']">발표 옵션 선택</h2>
          </div>
          
          <div className="bg-neutral-600 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
            {/* 배경 환경 */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-neutral-500 mr-3" />
                <label className="text-stone-300 text-lg font-bold font-['Golos_Text']">배경 환경</label>
              </div>
              
              <div className="relative">
                {/* 드롭다운 버튼 */}
                <button
                  onClick={() => setEnvironmentDropdownOpen(!environmentDropdownOpen)}
                  className="w-full bg-green-400 rounded-[20px] p-4 mb-4 flex items-center justify-between hover:bg-green-500 transition-colors"
                >
                  <span className="text-neutral-600 text-base font-bold font-['Golos_Text']">
                    {getSelectedEnvironment().name}
                  </span>
                  <ChevronDown className={`w-6 h-6 text-neutral-600 transition-transform ${
                    environmentDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* 드롭다운 메뉴 */}
                {environmentDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-neutral-700 rounded-[20px] shadow-lg z-10 overflow-hidden">
                    {environments.map((env) => (
                      <button
                        key={env.id}
                        onClick={() => {
                          setSelectedEnvironment(env.id);
                          setEnvironmentDropdownOpen(false);
                        }}
                        className={`w-full p-4 text-left hover:bg-neutral-600 transition-colors flex items-center justify-between ${
                          selectedEnvironment === env.id ? 'bg-green-400/20' : ''
                        }`}
                      >
                        <span className="text-neutral-300 text-base font-bold font-['Golos_Text']">
                          {env.name}
                        </span>
                        {selectedEnvironment === env.id && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 소음 설정 */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Mic className="w-6 h-6 text-neutral-500 mr-3" />
                <label className="text-stone-300 text-lg font-bold font-['Golos_Text']">소음 설정</label>
              </div>
              
              <div className="bg-neutral-700 rounded-[20px] p-4 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={auditoriumNoise}
                    onChange={(e) => setAuditoriumNoise(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mr-4 ${
                    auditoriumNoise ? 'bg-green-400 border-green-400' : 'border-neutral-400'
                  }`}>
                    {auditoriumNoise && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-neutral-400 text-base font-bold font-['Golos_Text']">강당 소음</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={qaResponse}
                    onChange={(e) => setQaResponse(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mr-4 ${
                    qaResponse ? 'bg-green-400 border-green-400' : 'border-neutral-400'
                  }`}>
                    {qaResponse && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-neutral-400 text-base font-bold font-['Golos_Text']">질의응답 소음</span>
                </label>
              </div>
            </div>

            {/* AI 예상질문 */}
            <div>
              <div className="flex items-center mb-4">
                <Mic className="w-6 h-6 text-neutral-500 mr-3" />
                <label className="text-stone-300 text-lg font-bold font-['Golos_Text']">AI 예상질문</label>
              </div>
              
              <div className="bg-neutral-700 rounded-[20px] p-4 space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="aiTiming"
                    checked={aiQuestionTiming === 'during'}
                    onChange={() => setAiQuestionTiming('during')}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-4 ${
                    aiQuestionTiming === 'during' ? 'bg-green-400 border-green-400' : 'border-neutral-400'
                  }`}>
                    {aiQuestionTiming === 'during' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-neutral-400 text-base font-bold font-['Golos_Text']">그때 그때 질문해주세요!</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="aiTiming"
                    checked={aiQuestionTiming === 'after'}
                    onChange={() => setAiQuestionTiming('after')}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-4 ${
                    aiQuestionTiming === 'after' ? 'bg-green-400 border-green-400' : 'border-neutral-400'
                  }`}>
                    {aiQuestionTiming === 'after' && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-neutral-400 text-base font-bold font-['Golos_Text']">발표 종료 후 질문해주세요!</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 준비 완료 버튼 */}
        <div className="pb-6">
          <button
            onClick={handleStartPresentation}
            className="w-44 h-12 bg-green-600 rounded-[20px] mx-auto block"
          >
            <span className="text-white text-base font-bold font-['Golos_Text']">준비 완료!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationSetup;