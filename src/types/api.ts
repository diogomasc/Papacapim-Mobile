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

export interface Post {
  id: number;
  user_login: string;
  post_id: number | null;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  post: {
    message: string;
  };
}

export interface CreateReplyRequest {
  reply: {
    message: string;
  };
}

export interface GetPostsParams {
  page?: number;
  feed?: number;
  search?: string;
}

export interface Like {
  id: number;
  user_login: string;
  post_id: number;
  created_at: string;
  updated_at: string;
}

export interface Follower {
  id: number;
  login: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface FollowRecord {
  id: number;
  follower_login: string;
  followed_login: string;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
