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
import { useRegisterMutation } from "@/queries/auth";
import styles from "./styles";

export function SignUp() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const router = useRouter();

  const { mutateAsync: registerUser, isPending: isLoading } =
    useRegisterMutation();

  async function handleSignUp() {
    if (
      !name.trim() ||
      !login.trim() ||
      !password.trim() ||
      !passwordConfirmation.trim()
    ) {
      return Alert.alert("Cadastro", "Preencha todos os campos.");
    }

    if (password !== passwordConfirmation) {
      return Alert.alert("Cadastro", "As senhas não conferem.");
    }

    try {
      await registerUser({
        user: {
          name,
          login,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Faça login para continuar.",
      );
      router.back();
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      const message =
        error.response?.data?.message || "Não foi possível criar a conta.";
      Alert.alert("Erro no Cadastro", message);
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
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Junte-se ao Papacapim hoje!</Text>
        </View>

        <View style={styles.form}>
          <Input>
            <Input.Icon>
              <MaterialIcons
                name="person"
                size={20}
                color={colors.text.secondary}
              />
            </Input.Icon>
            <Input.Field
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
            />
          </Input>

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

          <Input>
            <Input.Icon>
              <MaterialIcons
                name="lock-outline"
                size={20}
                color={colors.text.secondary}
              />
            </Input.Icon>
            <Input.Field
              placeholder="Confirme a senha"
              secureTextEntry
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </Input>

          <Button onPress={handleSignUp} isLoading={isLoading}>
            <Button.Title>Cadastrar</Button.Title>
          </Button>

          <Button
            variant="ghost"
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <Button.Label>Já tem uma conta? Faça login</Button.Label>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
