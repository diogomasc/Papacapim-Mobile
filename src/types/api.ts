export interface User {
  id: number;
  login: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  token: string;
  user_login: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterRequest {
  user: {
    login: string;
    name: string;
    password: string;
    password_confirmation: string;
  };
}

export interface RegisterResponse {
  id: number;
  login: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  user: {
    login?: string;
    name?: string;
    password?: string;
    password_confirmation?: string;
  };
}

export interface GetUsersParams {
  page?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
