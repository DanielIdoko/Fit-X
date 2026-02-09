import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/themes/colors";
import { customButtonProps } from "@/types/type";

export default function CustomButton({
  title,
  leftIcon,
  rightIcon,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
}: customButtonProps) {
  const getBackground = () => {
    if (disabled) return colors.border;
    if (variant === "secondary") return colors.secondary;
    if (variant === "danger") return colors.error;
    if (variant === "outline") return "transparent";
    return colors.primary;
  };

  const getTextColor = () => {
    if (variant === "outline") return colors.primary;
    return "#fff";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackground(),
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: colors.primary,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {leftIcon && <Text>{leftIcon}</Text>}
          {title}
          {rightIcon && <Text>{rightIcon}</Text>}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
  },
});
