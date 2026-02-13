import { View, Text, TextProps } from "react-native";
import { ReactNode, useState } from "react";
import { Modal } from "@/components/modal";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import styles from "./styles";

type ConfirmModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading?: boolean;
  children: ReactNode;
};

function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  isLoading = false,
  children,
}: ConfirmModalProps) {
  const [password, setPassword] = useState("");

  function handleConfirm() {
    if (!password.trim()) return;
    onConfirm(password);
    setPassword("");
  }

  function handleClose() {
    setPassword("");
    onClose();
  }

  return (
    <Modal visible={visible} onClose={handleClose}>
      {children}
      <View style={styles.passwordSection}>
        <Text style={styles.passwordLabel}>
          Confirme com sua senha para continuar
        </Text>
        <Input>
          <Input.Icon>
            <MaterialIcons
              name="lock"
              size={20}
              color={colors.text.secondary}
            />
          </Input.Icon>
          <Input.Field
            placeholder="Sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Input>
      </View>
      <Modal.Actions>
        <Button variant="secondary" onPress={handleClose} style={{ flex: 1 }}>
          <Button.Title>Cancelar</Button.Title>
        </Button>
        <Button
          variant="primary"
          onPress={handleConfirm}
          isLoading={isLoading}
          disabled={!password.trim()}
          style={{ flex: 1 }}
        >
          <Button.Title>Confirmar</Button.Title>
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function Title({ children, style, ...rest }: TextProps) {
  return (
    <Modal.Title style={style} {...rest}>
      {children}
    </Modal.Title>
  );
}

function Description({ children, style, ...rest }: TextProps) {
  return (
    <Modal.Description style={style} {...rest}>
      {children}
    </Modal.Description>
  );
}

ConfirmModal.Title = Title;
ConfirmModal.Description = Description;

export { ConfirmModal };
