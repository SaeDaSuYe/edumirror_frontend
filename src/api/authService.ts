import { apiClient } from './client';
import { API_ENDPOINTS } from './config';

// 인증 관련 타입
export interface SignUpRequest {
  email: string;
  password: string;
  user_type: 'student' | 'teacher' | 'parent';
  name: string;
  grade?: string;
  school?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  user_id?: string;
  error?: string;
}

// 인증 API 서비스
export const authService = {
  // 회원가입
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, data);
    // 백엔드가 data 객체 없이 직접 반환하므로 response를 그대로 반환
    return response as AuthResponse;
  },

  // 로그인
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    // 백엔드가 data 객체 없이 직접 반환하므로 response를 그대로 반환
    return response as AuthResponse;
  },

  // 로그아웃
  async logout() {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  // 토큰 갱신
  async refresh(refreshToken: string) {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken,
    });
  },
};
