import { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/theme/colors";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/queries/auth";
import { api } from "@/services/api";
import styles from "./styles";

export function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { signIn } = useAuth();

  const { mutateAsync: loginUser, isPending: isLoading } = useLoginMutation();

  async function handleSignIn() {
    if (!login.trim() || !password.trim()) {
      return Alert.alert("Entrar", "Preencha todos os campos para continuar.");
    }

    try {
      // 1. Login (obter dados da sessão com o token)
      const sessionData = await loginUser({
        login,
        password,
      });

      // 2. Buscar dados completos do usuário
      const { data: userData } = await api.get(
        `/users/${sessionData.user_login}`,
        {
          headers: {
            "x-session-token": sessionData.token,
          },
        },
      );

      // 3. Salvar no contexto de autenticação
      await signIn(sessionData.token, sessionData.id, userData);

      // A navegação é tratada pela função signIn
    } catch (error: any) {
      console.error("Erro no login:", error);
      const message =
        error.response?.data?.message || "Não foi possível entrar.";
      Alert.alert("Erro no Login", message);
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
          <Text style={styles.title}>Papacapim</Text>
          <Text style={styles.subtitle}>Faça login para começar</Text>
        </View>

        <View style={styles.form}>
          <Input>
            <Input.Icon>
              <MaterialIcons
                name="account-circle"
                size={20}
                color={colors.text.secondary}
              />
            </Input.Icon>
            <Input.Field
              placeholder="Login (usuário)"
              autoCapitalize="none"
              value={login}
              onChangeText={setLogin}
            />
          </Input>

          <Input>
            <Input.Icon>
              <MaterialIcons
                name="lock"
                size={20}
                color={colors.text.secondary}
              />
            </Input.Icon>
            <Input.Field
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </Input>

          <Button onPress={handleSignIn} isLoading={isLoading}>
            <Button.Title>Entrar</Button.Title>
          </Button>

          <Button
            variant="ghost"
            onPress={() => router.push("/signUp")}
            style={{ marginTop: 16 }}
          >
            <Button.Label>Ainda não tem conta? Cadastre-se</Button.Label>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
