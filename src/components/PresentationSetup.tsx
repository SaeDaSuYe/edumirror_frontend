import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Image, ChevronDown, Volume2 } from 'lucide-react';

interface PresentationSetupProps {
  onBackClick: () => void;
  onStartPresentation: () => void;
}

const PresentationSetup: React.FC<PresentationSetupProps> = ({
  onBackClick,
  onStartPresentation
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('classroom');
  const [selectedNoise, setSelectedNoise] = useState('none');
  const [aiQuestions, setAiQuestions] = useState(true);

  const themes = [
    { id: 'classroom', name: '교실', description: '일반적인 교실 환경' },
    { id: 'auditorium', name: '강당', description: '대형 강당 환경' },
    { id: 'online', name: '온라인', description: '화상회의 환경' }
  ];

  const noiseOptions = [
    { id: 'none', name: '조용함', description: '소음 없음' },
    { id: 'low', name: '약간의 웅성거림', description: '저음량 배경소음' },
    { id: 'medium', name: '보통 웅성거림', description: '중간음량 배경소음' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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
        <h1 className="text-white text-xl font-bold">발표 준비하기</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-4 py-6 space-y-6">
        
        {/* 발표 자료 업로드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">발표 자료 업로드</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            {selectedFile ? (
              <div className="flex items-center justify-center space-x-3">
                <FileText className="w-8 h-8 text-[#74CD79]" />
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">파일이 업로드되었습니다</p>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">PPT, PDF 파일을 업로드해주세요</p>
                <p className="text-sm text-gray-400 mb-4">최대 50MB</p>
              </div>
            )}
            
            <input
              type="file"
              accept=".ppt,.pptx,.pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-[#74CD79] text-white rounded-lg cursor-pointer hover:bg-[#5FB366] transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              파일 선택
            </label>
          </div>
        </div>

        {/* 발표 환경 설정 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">발표 환경 설정</h2>
          
          {/* 테마/배경 선택 */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">테마/환경 선택</h3>
            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => (
                <label
                  key={theme.id}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    selectedTheme === theme.id
                      ? 'border-[#74CD79] bg-[#74CD79]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    value={theme.id}
                    checked={selectedTheme === theme.id}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{theme.name}</div>
                    <div className="text-sm text-gray-500">{theme.description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTheme === theme.id ? 'border-[#74CD79]' : 'border-gray-300'
                  }`}>
                    {selectedTheme === theme.id && (
                      <div className="w-3 h-3 bg-[#74CD79] rounded-full"></div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 소음 추가 */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Volume2 className="w-4 h-4 mr-2" />
              소음 추가
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {noiseOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    selectedNoise === option.id
                      ? 'border-[#74CD79] bg-[#74CD79]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    value={option.id}
                    checked={selectedNoise === option.id}
                    onChange={(e) => setSelectedNoise(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.name}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedNoise === option.id ? 'border-[#74CD79]' : 'border-gray-300'
                  }`}>
                    {selectedNoise === option.id && (
                      <div className="w-3 h-3 bg-[#74CD79] rounded-full"></div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* AI 질문 옵션 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">AI 예상 질문</h3>
            <label className="flex items-center p-4 rounded-xl border-2 border-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={aiQuestions}
                onChange={(e) => setAiQuestions(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 ${
                aiQuestions ? 'bg-[#74CD79] border-[#74CD79]' : 'border-gray-300'
              }`}>
                {aiQuestions && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">AI가 예상 질문을 음성으로 제시</div>
                <div className="text-sm text-gray-500">발표 후 질의응답 연습이 포함됩니다</div>
              </div>
            </label>
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={onStartPresentation}
          disabled={!selectedFile}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-colors ${
            selectedFile
              ? 'bg-[#74CD79] text-white hover:bg-[#5FB366]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          발표 시작하기
        </button>
      </div>
    </div>
  );
};

export default PresentationSetup;