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
  post: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  postHeaderInfo: {
    marginLeft: 12,
  },
  postName: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  postLogin: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  postMessage: {
    fontSize: 17,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 26,
    marginBottom: 16,
  },
  postDate: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: "row",
    gap: 32,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
  },
  repliesSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  repliesTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  replyCard: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  replyContent: {
    flex: 1,
    marginLeft: 10,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  replyName: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  replyTime: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
  },
  replyText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 20,
  },
  replyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  replyInput: {
    flex: 1,
    height: 44,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 22,
    paddingHorizontal: 16,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
