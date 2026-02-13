import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Follower, FollowRecord } from "@/types/api";

export function useGetFollowersQuery(login: string) {
  return useQuery({
    queryKey: ["followers", login],
    queryFn: async (): Promise<Follower[]> => {
      const response = await api.get<Follower[]>(`/users/${login}/followers`);
      return response.data;
    },
    enabled: !!login,
  });
}

export function useFollowUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (login: string): Promise<FollowRecord | null> => {
      const response = await api.post(`/users/${login}/followers`);
      // 201 returns FollowRecord, 204 means already following
      return response.status === 201 ? response.data : null;
    },
    onSuccess: (_data, login) => {
      queryClient.invalidateQueries({ queryKey: ["followers", login] });
    },
  });
}

export function useUnfollowUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      login,
      id,
    }: {
      login: string;
      id: number;
    }): Promise<void> => {
      await api.delete(`/users/${login}/followers/${id}`);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["followers", variables.login],
      });
    },
  });
}
