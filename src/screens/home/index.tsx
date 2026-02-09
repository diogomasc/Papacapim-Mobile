import { View, Text, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Button } from "@/components/button";
import { colors } from "@/theme/colors";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutMutation } from "@/queries/auth";
import styles from "./styles";

export function Home() {
  const { user, sessionId, signOut } = useAuth();
  const { mutateAsync: logoutUser, isPending: isLoggingOut } =
    useLogoutMutation();

  async function handleLogout() {
    try {
      // 1. Chama a API de logout se houver um ID de sessão
      if (sessionId) {
        await logoutUser(sessionId);
      }
    } catch (error: any) {
      console.error("Logout API error:", error);
      // Continua com o logout local mesmo se a API falhar
      Alert.alert(
        "Aviso",
        "Não foi possível comunicar com o servidor, mas você será desconectado localmente.",
      );
    } finally {
      // 2. Limpa o estado de autenticação local independentemente da resposta da API
      await signOut();
    }
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bem-vindo,</Text>
          <Text style={styles.username}>{user.name}</Text>
        </View>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={32} color={colors.primary} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Esta é a tela inicial do aplicativo Papacapim.
        </Text>
      </View>

      <Button
        variant="secondary"
        onPress={handleLogout}
        isLoading={isLoggingOut}
        style={styles.logoutButton}
      >
        <MaterialIcons
          name="logout"
          size={20}
          color={colors.danger}
          style={{ marginRight: 8 }}
        />
        <Button.Title style={{ color: colors.danger }}>
          Sair da Aplicação
        </Button.Title>
      </Button>
    </View>
  );
}
