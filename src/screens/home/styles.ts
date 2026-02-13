import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  appTitle: {
    fontSize: 20,
    fontFamily: fontFamily.extraBold,
    color: colors.primary,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  feedToggle: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleActive: {
    backgroundColor: colors.surfaceHighlight,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.text.disabled,
  },
  toggleTextActive: {
    color: colors.text.primary,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default styles;
