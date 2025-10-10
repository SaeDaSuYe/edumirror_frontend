import { apiClient } from './client';
import { API_ENDPOINTS } from './config';

// 분석 결과 타입
export interface AnalysisReportResponse {
  session_id: string;
  total_score: number;
  scores: {
    delivery: number;
    content: number;
    engagement: number;
    clarity: number;
  };
  speaking_metrics: {
    average_pace: number;
    volume_consistency: number;
    pause_count: number;
    filler_word_count: number;
  };
  eye_contact: {
    audience_percentage: number;
    slide_percentage: number;
    heatmap_url?: string;
  };
  script_comparison?: {
    accuracy: number;
    omissions: string[];
    additions: string[];
  };
  feedback: {
    strengths: string[];
    areas_for_improvement: string[];
    specific_suggestions: string[];
  };
  transcript?: string;
  video_url?: string;
}

// 분석 API 서비스
export const analysisService = {
  // 분석 리포트 조회
  async getAnalysisReport(sessionId: string) {
    return apiClient.get<AnalysisReportResponse>(
      API_ENDPOINTS.ANALYSIS.REPORT(sessionId)
    );
  },
};
