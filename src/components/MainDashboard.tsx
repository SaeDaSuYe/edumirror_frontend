import React from 'react';
import { ArrowLeft, TrendingUp, BarChart2, Mic } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
  LineChart, Line, Cell
} from 'recharts';

// ----- 데이터 -----
const barData = [
  { date: '6/10', score: 88, fill: '#BBF7D0' }, // green-200
  { date: '6/15', score: 82, fill: '#BBF7D0' },
  { date: '6/20', score: 78, fill: '#BBF7D0' },
  { date: '6/25', score: 85, fill: '#34D399' }, // green-400 (현재)
];

const growthData = [
  { label: '최근 4주', expression: 81, understanding: 75 },
  { label: '현재',    expression: 91, understanding: 81 },
];

// ----- 커스텀 라벨 (막대 위 점수) -----
function BarValueLabel(props: any) {
  const { x, y, width, value, index } = props;
  const cx = x + width / 2;
  const fill = index === 3 ? '#FFFFFF' : '#16A34A'; // 마지막 막대만 흰색
  return (
    <text x={cx} y={y - 6} textAnchor="middle" fill={fill} fontSize={10} fontWeight={600}>
      {value}
    </text>
  );
}

/* ---- 추천 테마 카드 재사용 컴포넌트 ---- */
function ThemeCard({
  title,
  sub,
}: {
  title: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="relative">
      {/* 뒤 그린 레이어 (왼쪽 얇은 띠) */}
      <div aria-hidden className="absolute inset-0 rounded-[20px] bg-[#74CD79]" />
      {/* 실제 카드: 왼쪽 띠 보이도록 살짝 우측으로 */}
      <div className="relative ml-2 rounded-[20px] border border-zinc-100 bg-[#F7FCF8] p-4">
        <h4 className="mb-1 font-bold text-neutral-600 text-lg">{title}</h4>
        <p className="text-sm text-neutral-400">{sub}</p>
      </div>
    </div>
  );
}

interface MainDashboardProps {
  onBackClick: () => void;
  onNewPresentationClick: () => void;
  onDetailedAnalysisClick: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  onBackClick,
  onNewPresentationClick,
  onDetailedAnalysisClick
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 상태바 */}
      <div className="bg-[#74CD79] px-4 py-2 text-white text-sm font-medium flex justify-between items-center">
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
      <div className="bg-[#74CD79] px-4 py-4 flex items-center">
        <button
          onClick={onBackClick}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-xl font-bold">내 성장 현황</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-4 py-6 space-y-6">

        {/* 발표 정보 카드 */}
        <div className="text-left bg-white rounded-2xl p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <div className="mb-2">
            <span className="text-sm text-gray-500">2024년 6월 25일</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">과학 발표 - 유전과 진화</h3>
          <p className="text-gray-600 text-sm">유전과 진화의 이론을 주제로 하는 5분 내외 발표</p>
        </div>
        
        {/* 성장 축하 메시지 */}
        <div className="bg-[#74CD79] rounded-2xl p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <h2 className="text-lg font-bold text-white mb-2">민지님, 축하드려요! 👏</h2>
          <p className="text-white">
            지난번보다 발표 실력이 <span className="text-[#FFED86] font-semibold">5% 성장</span>했어요!
          </p>
        </div>

        {/* 성장 분석 섹션 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          {/* 상단 점수 및 향상도 */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-green-600 text-6xl font-semibold font-['Golos_Text']">85</span>
              <span className="text-green-600 text-3xl font-semibold font-['Golos_Text']">점</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-xl font-semibold font-['Golos_Text']">+ 7점 향상</span>
            </div>
          </div>

          {/* 발표 점수 통계 차트 */}
          <div className="bg-neutral-50 rounded-[20px] border border-zinc-100 p-6 mb-6">
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  barCategoryGap="5%"
                  barGap={0}
                >
                  <CartesianGrid stroke="#F4F4F5" strokeDasharray="0 0" />
                  <XAxis dataKey="date" tick={{ fill: '#A3A3A3', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} ticks={[0,25,50,75,100]} tick={{ fill: '#A3A3A3', fontSize: 10 }} width={24} axisLine={false} tickLine={false} />
                  <Bar dataKey="score" radius={[4,4,0,0]} barSize={28}>
                    <LabelList dataKey="score" content={<BarValueLabel />} />
                    {barData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center">
              <span className="text-neutral-400 text-xs font-medium font-['Golos_Text']">발표 점수 통계</span>
            </div>
          </div>

          {/* 성장 그래프 */}
          <div className="bg-neutral-50 rounded-[20px] border border-zinc-100 p-6 mb-6">
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="#F4F4F5" strokeDasharray="0 0" />
                  <XAxis dataKey="label" tick={{ fill: '#A3A3A3', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={[70, 95]}
                    ticks={[70, 75, 80, 85, 90, 95]}
                    tick={{ fill: '#A3A3A3', fontSize: 10 }}
                    width={24}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="expression"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ r: 3, strokeWidth: 0, fill: '#F59E0B' }}
                    activeDot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="understanding"
                    stroke="#16A34A"
                    strokeWidth={3}
                    dot={{ r: 3, strokeWidth: 0, fill: '#16A34A' }}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 범례 */}
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 bg-yellow-500 rounded" />
                <span className="text-neutral-400 text-[10px] font-medium">표현력</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 bg-green-600 rounded" />
                <span className="text-neutral-400 text-[10px] font-medium">이해도</span>
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-neutral-400 text-xs font-medium font-['Golos_Text']">성장 그래프</span>
            </div>
          </div>

          {/* 세부 점수 카드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50/95 rounded-2xl border border-zinc-100 p-4 text-center">
              <div className="text-green-400 text-3xl font-semibold font-['Golos_Text'] mb-2">90</div>
              <div className="text-neutral-400 text-sm font-semibold font-['Golos_Text']">이해도</div>
            </div>
            <div className="bg-amber-50/95 rounded-2xl border border-zinc-100 p-4 text-center">
              <div className="text-green-400 text-3xl font-semibold font-['Golos_Text'] mb-2">80</div>
              <div className="text-neutral-400 text-sm font-semibold font-['Golos_Text']">표현력</div>
            </div>
          </div>
        </div>

        {/* AI 추천 연습 테마 (Figma 스타일) */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-bold text-neutral-600">AI 추천 연습 테마</h3>

          <div className="space-y-5 mb-8 text-left">
            <ThemeCard title={<>👩‍🔬 과학 발표</>} sub="실험 결과를 발표해보세요!" />
            <ThemeCard title={<>🗣️ 영어 자기 소개</>} sub="영어로 5분 내외의 자기소개를 진행해보세요!" />
            <ThemeCard title={<>👩‍🏫 토론 연습</>} sub="당신의 찬반 의견을 발표해보세요!" />
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-4">
            <button
              onClick={onNewPresentationClick}
              className="flex h-16 w-full items-center justify-center gap-2 rounded-[20px] bg-[#74CD79] text-white text-lg font-bold"
            >
              <Mic className="h-5 w-5" />
              <span>새 발표 시작하기</span>
            </button>

            <button
              onClick={onDetailedAnalysisClick}
              className="flex h-16 w-full items-center justify-center gap-2 rounded-[20px] bg-lime-400 text-white text-lg font-bold"
            >
              <BarChart2 className="h-5 w-5" />
              <span>상세 분석 보기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
