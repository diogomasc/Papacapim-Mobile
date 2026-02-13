import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteUserMutation } from "@/queries/users";
import { useLoginMutation } from "@/queries/auth";
import { ConfirmModal } from "@/components/confirmModal";
import { colors } from "@/theme/colors";
import styles from "./styles";

export function AccountSettings() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { mutateAsync: deleteUser, isPending: isDeleting } =
    useDeleteUserMutation();
  const { mutateAsync: loginUser } = useLoginMutation();

  async function handleDeleteAccount(password: string) {
    if (!user) return;

    try {
      // Verify password by attempting login
      await loginUser({ login: user.login, password });

      // Password correct — delete account
      await deleteUser(user.id);
      Alert.alert("Conta Deletada", "Sua conta foi removida com sucesso.");
      setShowDeleteModal(false);
      await signOut();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert("Erro", "Senha incorreta. Tente novamente.");
      } else {
        const msg =
          error.response?.data?.message || "Não foi possível deletar a conta.";
        Alert.alert("Erro", msg);
      }
    }
  }

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
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Edit Profile */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/(protected)/editProfile")}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <MaterialIcons name="edit" size={22} color={colors.text.primary} />
            <Text style={styles.menuItemText}>Editar Perfil</Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.text.disabled}
          />
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity
          style={[styles.menuItem, styles.dangerItem]}
          onPress={() => setShowDeleteModal(true)}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <MaterialIcons
              name="delete-forever"
              size={22}
              color={colors.danger}
            />
            <Text style={[styles.menuItemText, { color: colors.danger }]}>
              Deletar Conta
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.danger} />
        </TouchableOpacity>
      </View>

      {/* Delete confirmation modal with password */}
      <ConfirmModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeleting}
      >
        <ConfirmModal.Title>Deletar Conta</ConfirmModal.Title>
        <ConfirmModal.Description>
          Tem certeza que deseja deletar sua conta? Esta ação não pode ser
          desfeita e todos os seus dados serão permanentemente removidos.
        </ConfirmModal.Description>
      </ConfirmModal>
    </View>
  );
}
