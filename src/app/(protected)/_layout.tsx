import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
      />
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
