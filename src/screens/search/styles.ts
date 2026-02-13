import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 64,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  searchInput: {
    marginBottom: 24,
  },
  list: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
    textAlign: "center",
  },
});

export default styles;
