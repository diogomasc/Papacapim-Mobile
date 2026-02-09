import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  label: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
});

export const variants = {
  primary: {
    container: {
      backgroundColor: colors.primary,
    },
    loadingColor: colors.text.primary,
  },
  secondary: {
    container: {
      backgroundColor: colors.surfaceHighlight,
      borderWidth: 1,
      borderColor: colors.border,
    },
    loadingColor: colors.text.primary,
  },
  ghost: {
    container: {
      backgroundColor: "transparent",
    },
    loadingColor: colors.text.primary,
  },
};

export default styles;
