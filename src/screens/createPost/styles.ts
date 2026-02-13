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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  publishButton: {
    width: "auto",
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  inputContainer: {
    height: "auto",
    minHeight: 150,
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  textArea: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 0,
  },
  charCount: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.text.disabled,
    textAlign: "right",
    marginTop: 12,
  },
});

export default styles;
