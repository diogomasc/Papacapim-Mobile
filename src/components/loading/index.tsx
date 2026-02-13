import { View, ActivityIndicator } from "react-native";
import { colors } from "@/theme/colors";
import styles from "./styles";

type LoadingProps = {
  size?: "small" | "large";
};

function Loading({ size = "large" }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

export { Loading };
