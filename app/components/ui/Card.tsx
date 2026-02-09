import { View, StyleSheet, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { colors } from "@/themes/colors";

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    // shadowColor: "#000",
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // shadowOffset: { width: 0, height: 4 },
    // elevation: 3,
  },
});
