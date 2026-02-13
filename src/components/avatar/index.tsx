import { View, Text } from "react-native";
import styles, { sizeStyles } from "./styles";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  name: string;
  size?: AvatarSize;
};

function Avatar({ name, size = "md" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sizeStyle = sizeStyles[size];

  return (
    <View style={[styles.container, sizeStyle.container]}>
      <Text style={[styles.text, sizeStyle.text]}>{initials}</Text>
    </View>
  );
}

export { Avatar };
