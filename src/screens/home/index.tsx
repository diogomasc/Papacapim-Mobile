import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { PostCard } from "@/components/postCard";
import { Menu } from "@/components/menu";
import { Loading } from "@/components/loading";
import { EmptyState } from "@/components/emptyState";
import { colors } from "@/theme/colors";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetPostsQuery,
  useGetLikesQuery,
  useGetRepliesQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useDeletePostMutation,
} from "@/queries/posts";
import { useLogoutMutation } from "@/queries/auth";
import type { Post, Like } from "@/types/api";
import styles from "./styles";

export function Home() {
  const router = useRouter();
  const { user, sessionId, signOut } = useAuth();
  const [feedMode, setFeedMode] = useState(false);

  const { mutateAsync: logoutUser } = useLogoutMutation();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useGetPostsQuery(feedMode ? { feed: 1 } : {});

  async function handleLogout() {
    try {
      if (sessionId) {
        await logoutUser(sessionId);
      }
    } catch (error: any) {
      console.error("Logout API error:", error);
    } finally {
      await signOut();
    }
  }

  function navigateToPostDetail(post: Post, focusComment = false) {
    router.push({
      pathname: "/(protected)/postDetail" as any,
      params: {
        postId: post.id.toString(),
        userLogin: post.user_login,
        userName: post.user_login,
        message: post.message,
        createdAt: post.created_at,
        focusComment: focusComment ? "true" : "false",
      },
    });
  }

  // Filter out replies, show only original posts
  const originalPosts = posts?.filter((p) => p.post_id === null) || [];

  if (!user) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(protected)/profile" as any,
              params: { login: user.login },
            })
          }
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={24} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.appTitle}>Papacapim</Text>

        <Menu>
          <Menu.Trigger>
            <MaterialIcons
              name="more-vert"
              size={24}
              color={colors.text.primary}
            />
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item
              icon={
                <MaterialIcons
                  name="settings"
                  size={20}
                  color={colors.text.primary}
                />
              }
              onPress={() => router.push("/(protected)/accountSettings" as any)}
            >
              <Text style={styles.menuItemText}>Configurações</Text>
            </Menu.Item>
            <Menu.Item
              icon={
                <MaterialIcons
                  name="logout"
                  size={20}
                  color={colors.text.primary}
                />
              }
              onPress={handleLogout}
            >
              <Text style={styles.menuItemText}>Sair</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </View>

      {/* Feed toggle */}
      <View style={styles.feedToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, !feedMode && styles.toggleActive]}
          onPress={() => setFeedMode(false)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.toggleText, !feedMode && styles.toggleTextActive]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, feedMode && styles.toggleActive]}
          onPress={() => setFeedMode(true)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.toggleText, feedMode && styles.toggleTextActive]}
          >
            Seguindo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Posts Feed */}
      {isLoading ? (
        <Loading />
      ) : originalPosts.length > 0 ? (
        <FlatList
          data={originalPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FeedPostCard
              post={item}
              currentUserLogin={user.login}
              onPress={() => navigateToPostDetail(item)}
              onComment={() => navigateToPostDetail(item, true)}
              onAvatarPress={() =>
                router.push({
                  pathname: "/(protected)/profile" as any,
                  params: { login: item.user_login },
                })
              }
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      ) : (
        <EmptyState>
          <EmptyState.Icon>
            <MaterialIcons
              name="dynamic-feed"
              size={64}
              color={colors.text.disabled}
            />
          </EmptyState.Icon>
          <EmptyState.Title>
            {feedMode
              ? "Nenhuma postagem no seu feed"
              : "Nenhuma postagem ainda"}
          </EmptyState.Title>
          <EmptyState.Subtitle>
            {feedMode
              ? "Siga usuários para ver suas postagens aqui"
              : "Seja o primeiro a postar!"}
          </EmptyState.Subtitle>
        </EmptyState>
      )}

      {/* FAB - Create Post */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(protected)/createPost" as any)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="edit" size={24} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

// Helper component to fetch likes/replies per post card
function FeedPostCard({
  post,
  currentUserLogin,
  onPress,
  onComment,
  onAvatarPress,
}: {
  post: Post;
  currentUserLogin: string;
  onPress: () => void;
  onComment: () => void;
  onAvatarPress: () => void;
}) {
  const { data: likes } = useGetLikesQuery(post.id);
  const { data: replies } = useGetRepliesQuery(post.id);
  const { mutateAsync: likePost } = useLikePostMutation();
  const { mutateAsync: unlikePost } = useUnlikePostMutation();
  const { mutateAsync: deletePost } = useDeletePostMutation();

  const myLike = likes?.find((l: Like) => l.user_login === currentUserLogin);
  const isLiked = !!myLike;
  const isOwner = post.user_login === currentUserLogin;

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

  async function handleDelete() {
    Alert.alert(
      "Excluir postagem",
      "Tem certeza que deseja excluir esta postagem?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(post.id);
            } catch (error) {
              console.error("Erro ao deletar:", error);
              Alert.alert("Erro", "Não foi possível excluir a postagem.");
            }
          },
        },
      ],
    );
  }

  return (
    <PostCard onPress={onPress}>
      <PostCard.Header
        name={post.user_login}
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
        onDelete={handleDelete}
        showDelete={isOwner}
      />
    </PostCard>
  );
}
