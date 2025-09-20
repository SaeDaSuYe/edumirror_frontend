import { useState, useEffect } from 'react';
import appLogo from '../assets/app-logo.svg';
import textLogo from '../assets/text-logo.svg';

const SplashScreen = () => {
  const [sloganText, setSloganText] = useState('말하는 순간, 배움이 보인다!');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setSloganText('Show, Speak, Grow!');
        setIsAnimating(false);
      }, 300); // Short delay for smooth transition
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#74CD79] overflow-hidden flex flex-col items-center justify-center">
      {/* 상단 상태바 */}
      <div className="fixed top-0 left-0 right-0 bg-[#74CD79] px-4 py-2 text-white text-sm font-medium flex justify-between items-center z-10">
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

      {/* 배경 격자 패턴 */}
      <div className="absolute inset-0 opacity-10">
        {/* 세로선들 */}
        <div className="absolute inset-0">
          {Array.from({length: 20}).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-white opacity-20"
              style={{left: `${(i * 100) / 20}%`}}
            />
          ))}
        </div>
        {/* 가로선들 */}
        <div className="absolute inset-0">
          {Array.from({length: 30}).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-white opacity-20"
              style={{top: `${(i * 100) / 30}%`}}
            />
          ))}
        </div>
      </div>

      {/* 로고 영역 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 로고 아이콘 */}
        <div className="flex items-center mb-5">
          {/* 로고 아이콘 (SVG) */}
          <div className="mb-6">
            <img
              src={appLogo}
              alt="Edu-Mirror App Logo"
              className="w-50 h-40 md:w-24 md:h-24 drop-shadow-lg"
              draggable={false}
            />
          </div>
        </div>

        {/* 로고 텍스트 (SVG) */}
        <div className="text-center mb-8">
          <img
            src={textLogo}
            alt="Edu-Mirror"
            className="h-12 md:h-16 lg:h-20 mx-auto drop-shadow"
            draggable={false}
          />
        </div>

        {/* 메인 슬로건 */}
        <div className="text-center px-6">
          <h2 className={`text-white/95 text-lg md:text-xl leading-relaxed font-normal transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}>
            {sloganText}
          </h2>
        </div>
      </div>

      {/* 장식 요소들 */}
      <div className="absolute bottom-20 left-8 w-32 h-16 opacity-60">
        <div className="w-full h-full bg-white/10 rounded-lg backdrop-blur-sm"></div>
      </div>

      {/* 상단 장식 요소 */}
      <div className="absolute top-20 right-8 w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 border border-white/30 rounded-full"></div>
      </div>

      <div className="absolute top-28 left-8 w-12 h-12 border border-white/20 rounded-lg rotate-45 flex items-center justify-center">
        <div className="w-6 h-6 bg-white/10 rounded-sm"></div>
      </div>

      {/* 부가 장식 점들 */}
      <div className="absolute top-40 right-16 w-2 h-2 bg-white/30 rounded-full"></div>
      <div className="absolute top-48 right-24 w-1 h-1 bg-white/40 rounded-full"></div>
      <div className="absolute bottom-32 left-16 w-3 h-3 bg-white/20 rounded-full"></div>

      {/* 하단 장식 파도 효과 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 393 100"
          className="w-full h-24 text-white/5"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C100,60 200,0 393,40 L393,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default SplashScreen;