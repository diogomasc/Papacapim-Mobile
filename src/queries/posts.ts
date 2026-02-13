import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type {
  Post,
  Like,
  GetPostsParams,
  CreatePostRequest,
  CreateReplyRequest,
} from "@/types/api";

export function useGetPostsQuery(params: GetPostsParams = {}) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: async (): Promise<Post[]> => {
      const response = await api.get<Post[]>("/posts", { params });
      return response.data;
    },
  });
}

export function useGetUserPostsQuery(login: string, page: number = 1) {
  return useQuery({
    queryKey: ["userPosts", login, page],
    queryFn: async (): Promise<Post[]> => {
      const response = await api.get<Post[]>(`/users/${login}/posts`, {
        params: { page },
      });
      return response.data;
    },
    enabled: !!login,
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreatePostRequest): Promise<Post> => {
      const response = await api.post<Post>("/posts", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
}

export function useGetRepliesQuery(postId: number) {
  return useQuery({
    queryKey: ["replies", postId],
    queryFn: async (): Promise<Post[]> => {
      const response = await api.get<Post[]>(`/posts/${postId}/replies`);
      return response.data;
    },
    enabled: !!postId,
  });
}

export function useCreateReplyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      data,
    }: {
      postId: number;
      data: CreateReplyRequest;
    }): Promise<Post> => {
      const response = await api.post<Post>(`/posts/${postId}/replies`, data);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["replies", variables.postId],
      });
    },
  });
}

export function useGetLikesQuery(postId: number) {
  return useQuery({
    queryKey: ["likes", postId],
    queryFn: async (): Promise<Like[]> => {
      const response = await api.get<Like[]>(`/posts/${postId}/likes`);
      return response.data;
    },
    enabled: !!postId,
  });
}

export function useLikePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: number): Promise<Like | null> => {
      const response = await api.post(`/posts/${postId}/likes`);
      // 201 returns Like, 204 returns null (already liked)
      return response.status === 201 ? response.data : null;
    },
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
  });
}

export function useUnlikePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      likeId,
    }: {
      postId: number;
      likeId: number;
    }): Promise<void> => {
      await api.delete(`/posts/${postId}/likes/${likeId}`);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["likes", variables.postId],
      });
    },
  });
}
