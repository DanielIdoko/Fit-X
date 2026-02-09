import { Stack } from "expo-router";
import { lazy, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/themes/colors";
import Toast from "@/components/ui/Toast";

export default function Layout() {
  const initialize = useAuthStore((s) => s.initialize);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    initialize();
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={colors.primary} size={35}/>
      </View>
    );

  return (
    <>
      <Toast />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
