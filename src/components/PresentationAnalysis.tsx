import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, BarChart3, Eye, Mic, Video } from 'lucide-react';

interface PresentationAnalysisProps {
  onAnalysisComplete: () => void;
}

const PresentationAnalysis: React.FC<PresentationAnalysisProps> = ({
  onAnalysisComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const analysisSteps = [
    { 
      id: 'video', 
      title: '영상 처리', 
      description: '발표 영상을 분석하고 있습니다',
      icon: Video,
      duration: 3000 
    },
    { 
      id: 'audio', 
      title: '음성 분석', 
      description: '발화 속도와 억양을 분석하고 있습니다',
      icon: Mic,
      duration: 4000 
    },
    { 
      id: 'eye_tracking', 
      title: '시선 추적', 
      description: '시선 처리 패턴을 분석하고 있습니다',
      icon: Eye,
      duration: 3500 
    },
    { 
      id: 'comprehensive', 
      title: '종합 분석', 
      description: 'AI가 전체 성과를 종합 평가하고 있습니다',
      icon: BarChart3,
      duration: 2500 
    }
  ];

  useEffect(() => {
    if (currentStep < analysisSteps.length) {
      const currentStepData = analysisSteps[currentStep];
      const stepDuration = currentStepData.duration;
      const intervalTime = stepDuration / 100;

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            
            // 다음 단계로 이동
            setTimeout(() => {
              if (currentStep < analysisSteps.length - 1) {
                setCurrentStep(currentStep + 1);
                setProgress(0);
              } else {
                // 모든 분석 완료
                setIsComplete(true);
                setTimeout(() => {
                  onAnalysisComplete();
                }, 1500);
              }
            }, 500);
            
            return 100;
          }
          return prev + 1;
        });
      }, intervalTime);

      return () => clearInterval(progressInterval);
    }
  }, [currentStep, onAnalysisComplete]);

  const getCurrentStepIcon = () => {
    if (currentStep < analysisSteps.length) {
      const IconComponent = analysisSteps[currentStep].icon;
      return <IconComponent className="w-12 h-12 text-[#74CD79]" />;
    }
    return <CheckCircle className="w-12 h-12 text-green-500" />;
  };

  const getOverallProgress = () => {
    if (isComplete) return 100;
    const stepProgress = currentStep / analysisSteps.length;
    const currentStepProgress = progress / 100 / analysisSteps.length;
    return Math.round((stepProgress + currentStepProgress) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isComplete ? '분석 완료!' : '발표 분석 중'}
          </h1>
          <p className="text-gray-600">
            {isComplete 
              ? 'AI가 당신의 발표를 완벽하게 분석했습니다' 
              : 'AI가 당신의 발표를 자세히 분석하고 있습니다'
            }
          </p>
        </div>

        {/* 메인 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isComplete ? 'bg-green-50' : 'bg-[#74CD79]/10'
          } ${!isComplete ? 'animate-pulse' : ''}`}>
            {getCurrentStepIcon()}
          </div>
        </div>

        {/* 전체 진행률 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">전체 진행률</span>
            <span className="text-sm font-medium text-[#74CD79]">{getOverallProgress()}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#74CD79] to-[#5FB366] transition-all duration-300 ease-out"
              style={{ width: `${getOverallProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* 현재 단계 정보 */}
        {!isComplete && currentStep < analysisSteps.length && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-lg font-medium text-gray-900">
                {analysisSteps[currentStep].title}
              </span>
            </div>
            <p className="text-gray-600 ml-8">
              {analysisSteps[currentStep].description}
            </p>
            
            {/* 현재 단계 진행률 */}
            <div className="ml-8 mt-3">
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#74CD79] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* 분석 단계 목록 */}
        <div className="space-y-3">
          {analysisSteps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div 
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isCompleted ? 'bg-green-50' : 
                  isCurrent ? 'bg-[#74CD79]/5 border border-[#74CD79]/20' : 
                  'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' : 
                  isCurrent ? 'bg-[#74CD79]' : 
                  'bg-gray-300'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <step.icon className={`w-4 h-4 ${
                      isCurrent ? 'text-white' : 'text-gray-500'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`font-medium ${
                    isCompleted ? 'text-green-700' : 
                    isCurrent ? 'text-[#74CD79]' : 
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  {isCurrent && (
                    <div className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>

                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            );
          })}
        </div>

        {/* 완료 메시지 */}
        {isComplete && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">분석이 완료되었습니다!</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              곧 상세한 분석 결과를 확인하실 수 있습니다
            </p>
          </div>
        )}

        {/* 팁 */}
        {!isComplete && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">분석 중입니다</h3>
                <p className="text-xs text-blue-700">
                  AI가 당신의 발표를 다각도로 분석하여 정확한 피드백을 준비하고 있습니다. 잠시만 기다려주세요.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationAnalysis;