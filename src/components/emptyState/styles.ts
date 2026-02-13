import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
  },
  icon: {
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
    textAlign: "center",
  },
});

export default styles;
