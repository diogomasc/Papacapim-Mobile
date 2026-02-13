import { View, ViewProps, Text, TextProps } from "react-native";
import { colors } from "@/theme/colors";
import styles from "./styles";

function UserCard({ children, style, ...rest }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

type AvatarProps = {
  name: string;
};

function Avatar({ name }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function Info({ children }: { children: React.ReactNode }) {
  return <View style={styles.info}>{children}</View>;
}

function Name({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.name, style]} {...rest}>
      {children}
    </Text>
  );
}

function Login({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[styles.login, style]} {...rest}>
      {children}
    </Text>
  );
}

UserCard.Avatar = Avatar;
UserCard.Info = Info;
UserCard.Name = Name;
UserCard.Login = Login;

export { UserCard };
