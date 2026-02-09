import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { User, GetUsersParams, UpdateUserRequest } from "@/types/api";

export function useGetUserQuery(login: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["user", login],
    queryFn: async (): Promise<User> => {
      const response = await api.get<User>(`/users/${login}`);
      return response.data;
    },
    enabled: enabled && !!login,
  });
}

export function useGetUsersQuery(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get<User[]>("/users", { params });
      return response.data;
    },
  });
}

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateUserRequest;
    }): Promise<User> => {
      const response = await api.patch<User>(`/users/${id}`, data);
      return response.data;
    },
  });
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/users/${id}`);
    },
  });
}
