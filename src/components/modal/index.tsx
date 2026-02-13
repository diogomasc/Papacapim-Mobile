import {
  View,
  Modal as RNModal,
  Text,
  TextProps,
  Pressable,
} from "react-native";
import { ReactNode } from "react";
import { Button } from "../button";
import styles from "./styles";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ visible, onClose, children }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.content} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
}

function Title({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
}

function Description({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.description, style]} {...rest}>
      {children}
    </Text>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return <View style={styles.actions}>{children}</View>;
}

Modal.Title = Title;
Modal.Description = Description;
Modal.Actions = Actions;
Modal.Button = Button;

export { Modal };
