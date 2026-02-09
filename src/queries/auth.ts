import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/api";

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>("/sessions", data);
      return response.data;
    },
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: async (sessionId: number): Promise<void> => {
      await api.delete(`/sessions/${sessionId}`);
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<RegisterResponse> => {
      const response = await api.post<RegisterResponse>("/users", data);
      return response.data;
    },
  });
}
