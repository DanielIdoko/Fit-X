import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/themes/colors";

interface Props {
  text: string;
}

export default function Footer({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
