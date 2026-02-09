import { TextInput, TextInputProps, View, ViewProps } from "react-native";

import styles from "./styles";
import { colors } from "@/theme/colors";

function Input({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

function Field({ style, ...rest }: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.text.disabled}
      cursorColor={colors.primary}
      {...rest}
    />
  );
}

type IconProps = {
  children: React.ReactNode;
};

function Icon({ children }: IconProps) {
  return <View style={styles.icon}>{children}</View>;
}

Input.Field = Field;
Input.Icon = Icon;

export { Input };
