import { View, Text, TextProps } from "react-native";
import { ReactNode } from "react";
import styles from "./styles";

type EmptyStateProps = {
  children: ReactNode;
};

function EmptyState({ children }: EmptyStateProps) {
  return <View style={styles.container}>{children}</View>;
}

function Icon({ children }: { children: ReactNode }) {
  return <View style={styles.icon}>{children}</View>;
}

function Title({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
}

function Subtitle({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.subtitle, style]} {...rest}>
      {children}
    </Text>
  );
}

EmptyState.Icon = Icon;
EmptyState.Title = Title;
EmptyState.Subtitle = Subtitle;

export { EmptyState };
