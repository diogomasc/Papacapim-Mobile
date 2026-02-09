import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    height: "100%",
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
