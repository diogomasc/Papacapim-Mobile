import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useGetRepliesQuery,
  useCreateReplyMutation,
  useGetLikesQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/queries/posts";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/avatar";
import { Loading } from "@/components/loading";
import { EmptyState } from "@/components/emptyState";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";
import type { Post, Like } from "@/types/api";
import styles from "./styles";

export function PostDetail() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{
    postId: string;
    userLogin: string;
    userName: string;
    message: string;
    createdAt: string;
    focusComment?: string;
  }>();

  const postId = Number(params.postId);
  const inputRef = useRef<TextInput>(null);
  const [reply, setReply] = useState("");

  const { data: replies, isLoading: loadingReplies } =
    useGetRepliesQuery(postId);
  const { data: likes } = useGetLikesQuery(postId);
  const { mutateAsync: createReply, isPending: sendingReply } =
    useCreateReplyMutation();
  const { mutateAsync: likePost } = useLikePostMutation();
  const { mutateAsync: unlikePost } = useUnlikePostMutation();

  const myLike = likes?.find((l: Like) => l.user_login === user?.login);
  const isLiked = !!myLike;

  useEffect(() => {
    if (params.focusComment === "true") {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [params.focusComment]);

  async function handleSendReply() {
    if (!reply.trim()) return;
    try {
      await createReply({
        postId,
        data: { reply: { message: reply.trim() } },
      });
      setReply("");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Não foi possível comentar.";
      Alert.alert("Erro", msg);
    }
  }

  async function handleToggleLike() {
    try {
      if (isLiked && myLike) {
        await unlikePost({ postId, likeId: myLike.id });
      } else {
        await likePost(postId);
      }
    } catch (error) {
      console.error("Erro ao curtir/descurtir:", error);
    }
  }

  // Sort replies: most recent first
  const sortedReplies = replies
    ? [...replies].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
    : [];

  function renderReply({ item }: { item: Post }) {
    return (
      <View style={styles.replyCard}>
        <Avatar name={item.user_login} size="sm" />
        <View style={styles.replyContent}>
          <View style={styles.replyHeader}>
            <Text style={styles.replyName}>@{item.user_login}</Text>
            <Text style={styles.replyTime}>
              {getRelativeTime(item.created_at)}
            </Text>
          </View>
          <Text style={styles.replyText}>{item.message}</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >
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
          <Text style={styles.headerTitle}>Postagem</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Post content */}
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Avatar name={params.userName || params.userLogin} size="md" />
            <View style={styles.postHeaderInfo}>
              <Text style={styles.postName}>
                {params.userName || params.userLogin}
              </Text>
              <Text style={styles.postLogin}>@{params.userLogin}</Text>
            </View>
          </View>
          <Text style={styles.postMessage}>{params.message}</Text>
          <Text style={styles.postDate}>
            {params.createdAt
              ? new Date(params.createdAt).toLocaleString("pt-BR")
              : ""}
          </Text>

          {/* Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleToggleLike}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={isLiked ? "favorite" : "favorite-border"}
                size={22}
                color={isLiked ? colors.secondary : colors.text.disabled}
              />
              <Text
                style={[
                  styles.actionText,
                  isLiked && { color: colors.secondary },
                ]}
              >
                {likes?.length || 0}
              </Text>
            </TouchableOpacity>
            <View style={styles.actionButton}>
              <MaterialIcons
                name="chat-bubble-outline"
                size={22}
                color={colors.text.disabled}
              />
              <Text style={styles.actionText}>{sortedReplies.length}</Text>
            </View>
          </View>
        </View>

        {/* Replies */}
        <View style={styles.repliesSection}>
          <Text style={styles.repliesTitle}>Comentários</Text>

          {loadingReplies ? (
            <Loading size="small" />
          ) : sortedReplies.length > 0 ? (
            <FlatList
              data={sortedReplies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderReply}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          ) : (
            <EmptyState>
              <EmptyState.Icon>
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={48}
                  color={colors.text.disabled}
                />
              </EmptyState.Icon>
              <EmptyState.Title>Nenhum comentário ainda</EmptyState.Title>
              <EmptyState.Subtitle>
                Seja o primeiro a comentar!
              </EmptyState.Subtitle>
            </EmptyState>
          )}
        </View>

        {/* Reply input */}
        <View style={styles.replyInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.replyInput}
            placeholder="Escreva um comentário..."
            placeholderTextColor={colors.text.disabled}
            value={reply}
            onChangeText={setReply}
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSendReply}
            disabled={!reply.trim() || sendingReply}
            activeOpacity={0.7}
            style={[
              styles.sendButton,
              (!reply.trim() || sendingReply) && { opacity: 0.4 },
            ]}
          >
            <MaterialIcons name="send" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "agora";
  if (diffMinutes < 60) return `${diffMinutes}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 30) return `${diffDays}d`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
