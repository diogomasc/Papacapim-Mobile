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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  profileName: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginTop: 16,
  },
  profileLogin: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 4,
  },
  memberSince: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
    marginTop: 8,
  },
  followersButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followersCount: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  followersLabel: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },
  followButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  followButtonActive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  followButtonTextActive: {
    color: colors.text.secondary,
  },
  postsHeader: {
    width: "100%",
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  postsTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});

export default styles;
