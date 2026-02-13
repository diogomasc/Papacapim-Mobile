import { View, Text, TextProps, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "@/components/avatar";
import { colors } from "@/theme/colors";
import styles from "./styles";

type PostCardProps = {
  onPress?: () => void;
  children: ReactNode;
};

function PostCard({ onPress, children }: PostCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

type HeaderProps = {
  name: string;
  login: string;
  date: string;
  onAvatarPress?: () => void;
};

function Header({ name, login, date, onAvatarPress }: HeaderProps) {
  const timeAgo = getRelativeTime(date);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.7}>
        <Avatar name={name} size="sm" />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
        <Text style={styles.login}>@{login}</Text>
      </View>
    </View>
  );
}

function Content({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.content, style]} {...rest}>
      {children}
    </Text>
  );
}

type ActionsProps = {
  likes: number;
  replies: number;
  isLiked: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
};

function Actions({
  likes,
  replies,
  isLiked,
  onLike,
  onComment,
  onDelete,
  showDelete = false,
}: ActionsProps) {
  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onLike}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name={isLiked ? "favorite" : "favorite-border"}
          size={18}
          color={isLiked ? colors.secondary : colors.text.disabled}
        />
        {likes > 0 && (
          <Text
            style={[styles.actionText, isLiked && { color: colors.secondary }]}
          >
            {likes}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onComment}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="chat-bubble-outline"
          size={18}
          color={colors.text.disabled}
        />
        {replies > 0 && <Text style={styles.actionText}>{replies}</Text>}
      </TouchableOpacity>

      {showDelete && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="delete-outline"
            size={18}
            color={colors.danger}
          />
        </TouchableOpacity>
      )}
    </View>
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

PostCard.Header = Header;
PostCard.Content = Content;
PostCard.Actions = Actions;

export { PostCard };
