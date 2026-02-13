import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { colors } from "@/theme/colors";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUserMutation } from "@/queries/users";
import styles from "./styles";

export function EditProfile() {
  const router = useRouter();
  const { user, signIn, signOut, token, sessionId } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [login, setLogin] = useState(user?.login || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { mutateAsync: updateUser, isPending: isLoading } =
    useUpdateUserMutation();

  async function handleUpdate() {
    if (!name.trim() || !login.trim()) {
      return Alert.alert("Editar Perfil", "Nome e login são obrigatórios.");
    }

    if (password && password !== passwordConfirmation) {
      return Alert.alert("Editar Perfil", "As senhas não conferem.");
    }

    if (!user) return;

    try {
      const updatedUser = await updateUser({
        id: user.id,
        data: {
          user: {
            name,
            login,
            ...(password && {
              password,
              password_confirmation: passwordConfirmation,
            }),
          },
        },
      });

      // Se a senha foi alterada, o backend deleta todas as sessões
      // Neste caso, fazemos logout e o usuário precisa fazer login novamente
      if (password) {
        Alert.alert(
          "Perfil Atualizado",
          "Sua senha foi alterada. Por segurança, você será desconectado e precisará fazer login novamente.",
          [
            {
              text: "OK",
              onPress: async () => {
                await signOut();
              },
            },
          ],
        );
      } else {
        // Se não alterou senha, apenas atualiza o contexto
        if (token && sessionId) {
          await signIn(token, sessionId, updatedUser);
        }

        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        router.replace("/(protected)");
      }
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      const message =
        error.response?.data?.message || "Não foi possível atualizar o perfil.";
      Alert.alert("Erro", message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Editar Perfil</Text>
          <Text style={styles.subtitle}>
            Atualize suas informações pessoais
          </Text>
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
              placeholder="Nova senha (opcional)"
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
              placeholder="Confirme a nova senha"
              secureTextEntry
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </Input>

          <Button onPress={handleUpdate} isLoading={isLoading}>
            <Button.Title>Atualizar Perfil</Button.Title>
          </Button>

          <Button
            variant="ghost"
            onPress={() => router.push("/(protected)/home")}
            style={{ marginTop: 16 }}
          >
            <Button.Label>Cancelar</Button.Label>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
