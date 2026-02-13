import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  passwordSection: {
    marginBottom: 20,
    gap: 12,
  },
  passwordLabel: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
});

export default styles;
