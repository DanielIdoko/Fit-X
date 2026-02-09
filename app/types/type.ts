import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface cardProps {
  children: ReactNode;
  style?: ViewStyle;
}


type Variant = "primary" | "secondary" | "outline" | "danger";

  export interface customButtonProps {
  title: string;
  leftIcon?: any; 
  rightIcon?: any; 
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
