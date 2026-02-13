import { useState, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useCreatePostMutation } from "@/queries/posts";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import styles from "./styles";

const MAX_CHARS = 500;
const WARNING_THRESHOLD = 0.8; // 80% = orange

export function CreatePost() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(150);
  const { mutateAsync: createPost, isPending } = useCreatePostMutation();

  const charRatio = message.length / MAX_CHARS;

  const counterColor =
    charRatio >= 1
      ? colors.danger
      : charRatio >= WARNING_THRESHOLD
        ? "#F59E0B" // amber/orange
        : colors.text.disabled;

  const handleChangeText = useCallback((text: string) => {
    if (text.length > MAX_CHARS) {
      setMessage(text.slice(0, MAX_CHARS));
    } else {
      setMessage(text);
    }
  }, []);

  async function handlePublish() {
    if (!message.trim()) {
      return Alert.alert("Publicar", "Escreva algo para publicar.");
    }

    try {
      await createPost({ post: { message: message.trim() } });
      router.back();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Não foi possível publicar.";
      Alert.alert("Erro", msg);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Button
            variant="ghost"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="close" size={24} color={colors.text.primary} />
          </Button>
          <Text style={styles.title}>Nova Postagem</Text>
          <Button
            onPress={handlePublish}
            isLoading={isPending}
            disabled={!message.trim()}
            style={styles.publishButton}
          >
            <Button.Title>Publicar</Button.Title>
          </Button>
        </View>

        <Input
          style={[
            styles.inputContainer,
            { minHeight: Math.min(Math.max(150, inputHeight + 24), 300) },
          ]}
        >
          <Input.Field
            placeholder="No que você está pensando?"
            value={message}
            onChangeText={handleChangeText}
            multiline
            textAlignVertical="top"
            style={[
              styles.textArea,
              { height: Math.min(Math.max(126, inputHeight), 276) },
            ]}
            onContentSizeChange={(e) =>
              setInputHeight(e.nativeEvent.contentSize.height)
            }
            scrollEnabled={inputHeight > 276}
            maxLength={MAX_CHARS}
          />
        </Input>

        <Text style={[styles.charCount, { color: counterColor }]}>
          {message.length}/{MAX_CHARS}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
