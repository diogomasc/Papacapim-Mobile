import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.text.primary,
    fontFamily: fontFamily.bold,
  },
});

export const sizeStyles = {
  sm: {
    container: { width: 32, height: 32 },
    text: { fontSize: 12 },
  },
  md: {
    container: { width: 48, height: 48 },
    text: { fontSize: 16 },
  },
  lg: {
    container: { width: 80, height: 80 },
    text: { fontSize: 28 },
  },
};

export default styles;
