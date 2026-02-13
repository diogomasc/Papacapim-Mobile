import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: colors.text.primary,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  login: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});

export default styles;
