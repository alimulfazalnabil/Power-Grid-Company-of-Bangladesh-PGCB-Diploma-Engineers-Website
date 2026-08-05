import { api } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  roles: string[];
}

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/api/v1/auth/login', data);
    return response.data;
  }

  async logout(refreshToken: string): Promise<void> {
    await api.post('/api/v1/auth/logout', { refresh_token: refreshToken });
  }

  async me(): Promise<AuthUser> {
    const response = await api.get<AuthUser>('/api/v1/auth/me');
    return response.data;
  }

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const response = await api.post<RefreshResponse>('/api/v1/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  }
}

export const authService = new AuthService();