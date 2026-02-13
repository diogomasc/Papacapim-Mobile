import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    flexShrink: 1,
  },
  dot: {
    fontSize: 14,
    color: colors.text.disabled,
  },
  time: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
  },
  login: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 1,
  },
  content: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
  },
});

export default styles;
