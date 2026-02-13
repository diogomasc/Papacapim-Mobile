import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 64,
    paddingRight: 24,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    minWidth: 200,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemDanger: {
    backgroundColor: colors.dangerLight,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
});

export default styles;
