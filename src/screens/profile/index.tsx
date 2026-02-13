import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetUserQuery } from "@/queries/users";
import { useGetUserPostsQuery, useGetRepliesQuery } from "@/queries/posts";
import {
  useGetFollowersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/queries/followers";
import {
  useGetLikesQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/queries/posts";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/avatar";
import { PostCard } from "@/components/postCard";
import { Loading } from "@/components/loading";
import { EmptyState } from "@/components/emptyState";
import { colors } from "@/theme/colors";
import type { Post, Like } from "@/types/api";
import styles from "./styles";

export function Profile() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const params = useLocalSearchParams<{ login: string }>();
  const login = params.login || currentUser?.login || "";

  const isOwnProfile = login === currentUser?.login;

  const { data: profileUser, isLoading: loadingUser } = useGetUserQuery(login);
  const { data: posts, isLoading: loadingPosts } = useGetUserPostsQuery(login);
  const {
    data: followers,
    isLoading: loadingFollowers,
    refetch: refetchFollowers,
  } = useGetFollowersQuery(login);
  const { mutateAsync: followUser, isPending: isFollowing } =
    useFollowUserMutation();
  const { mutateAsync: unfollowUser, isPending: isUnfollowing } =
    useUnfollowUserMutation();

  const isFollowedByMe = followers?.some((f) => f.login === currentUser?.login);

  const myFollowRecord = followers?.find((f) => f.login === currentUser?.login);

  useFocusEffect(
    useCallback(() => {
      refetchFollowers();
    }, [refetchFollowers]),
  );

  async function handleToggleFollow() {
    try {
      if (isFollowedByMe && myFollowRecord) {
        await unfollowUser({ login, id: myFollowRecord.id });
      } else {
        await followUser(login);
      }
      refetchFollowers();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao seguir usuário.";
      Alert.alert("Erro", msg);
    }
  }

  function navigateToPostDetail(post: Post, focusComment = false) {
    router.push({
      pathname: "/(protected)/postDetail" as any,
      params: {
        postId: post.id.toString(),
        userLogin: post.user_login,
        userName: profileUser?.name || post.user_login,
        message: post.message,
        createdAt: post.created_at,
        focusComment: focusComment ? "true" : "false",
      },
    });
  }

  if (loadingUser) {
    return <Loading />;
  }

  if (!profileUser) {
    return (
      <View style={styles.container}>
        <EmptyState>
          <EmptyState.Icon>
            <MaterialIcons
              name="person-off"
              size={48}
              color={colors.text.disabled}
            />
          </EmptyState.Icon>
          <EmptyState.Title>Usuário não encontrado</EmptyState.Title>
        </EmptyState>
      </View>
    );
  }

  const memberSince = new Date(profileUser.created_at).toLocaleDateString(
    "pt-BR",
    { month: "long", year: "numeric" },
  );

  // Only show original posts (not replies)
  const originalPosts = posts?.filter((p) => p.post_id === null) || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        {isOwnProfile ? (
          <TouchableOpacity
            onPress={() => router.push("/(protected)/accountSettings" as any)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>

      <FlatList
        data={originalPosts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.profileSection}>
            <Avatar name={profileUser.name} size="lg" />
            <Text style={styles.profileName}>{profileUser.name}</Text>
            <Text style={styles.profileLogin}>@{profileUser.login}</Text>
            <Text style={styles.memberSince}>
              <MaterialIcons
                name="calendar-today"
                size={13}
                color={colors.text.disabled}
              />{" "}
              Membro desde {memberSince}
            </Text>

            {/* Followers count */}
            <TouchableOpacity
              style={styles.followersButton}
              onPress={() =>
                router.push({
                  pathname: "/(protected)/followers" as any,
                  params: { login },
                })
              }
              activeOpacity={0.7}
            >
              <Text style={styles.followersCount}>
                {loadingFollowers ? "..." : followers?.length || 0}
              </Text>
              <Text style={styles.followersLabel}>seguidores</Text>
            </TouchableOpacity>

            {/* Action buttons */}
            {isOwnProfile ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push("/(protected)/editProfile")}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="edit"
                  size={18}
                  color={colors.text.primary}
                />
                <Text style={styles.editButtonText}>Editar perfil</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.followButton,
                  isFollowedByMe && styles.followButtonActive,
                ]}
                onPress={handleToggleFollow}
                disabled={isFollowing || isUnfollowing}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.followButtonText,
                    isFollowedByMe && styles.followButtonTextActive,
                  ]}
                >
                  {isFollowedByMe ? "Seguindo" : "Seguir"}
                </Text>
              </TouchableOpacity>
            )}

            {/* Posts section title */}
            <View style={styles.postsHeader}>
              <Text style={styles.postsTitle}>Postagens</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <PostCardWithLikes
            post={item}
            userName={profileUser.name}
            currentUserLogin={currentUser?.login || ""}
            onPress={() => navigateToPostDetail(item)}
            onComment={() => navigateToPostDetail(item, true)}
            onAvatarPress={() => {}}
          />
        )}
        ListEmptyComponent={
          loadingPosts ? (
            <Loading size="small" />
          ) : (
            <EmptyState>
              <EmptyState.Icon>
                <MaterialIcons
                  name="article"
                  size={48}
                  color={colors.text.disabled}
                />
              </EmptyState.Icon>
              <EmptyState.Title>Nenhuma postagem ainda</EmptyState.Title>
            </EmptyState>
          )
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Helper component that fetches likes for each post
function PostCardWithLikes({
  post,
  userName,
  currentUserLogin,
  onPress,
  onComment,
  onAvatarPress,
}: {
  post: Post;
  userName: string;
  currentUserLogin: string;
  onPress: () => void;
  onComment: () => void;
  onAvatarPress: () => void;
}) {
  const { data: likes } = useGetLikesQuery(post.id);
  const { data: replies } = useGetRepliesQuery(post.id);
  const { mutateAsync: likePost } = useLikePostMutation();
  const { mutateAsync: unlikePost } = useUnlikePostMutation();

  const myLike = likes?.find((l: Like) => l.user_login === currentUserLogin);
  const isLiked = !!myLike;

  async function handleToggleLike() {
    try {
      if (isLiked && myLike) {
        await unlikePost({ postId: post.id, likeId: myLike.id });
      } else {
        await likePost(post.id);
      }
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  }

  return (
    <PostCard onPress={onPress}>
      <PostCard.Header
        name={userName}
        login={post.user_login}
        date={post.created_at}
        onAvatarPress={onAvatarPress}
      />
      <PostCard.Content>{post.message}</PostCard.Content>
      <PostCard.Actions
        likes={likes?.length || 0}
        replies={replies?.length || 0}
        isLiked={isLiked}
        onLike={handleToggleLike}
        onComment={onComment}
      />
    </PostCard>
  );
}
