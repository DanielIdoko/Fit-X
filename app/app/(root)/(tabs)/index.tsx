import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { ScrollView, Text } from "react-native";

export default function Index() {
  const session = useAuthStore((s) => s.session);

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 80,
        }}
      >
        Home
      </Text>
    </ScrollView>
  );
}
