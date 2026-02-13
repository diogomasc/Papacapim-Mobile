import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
  },
});

export default styles;
