import { useEffect } from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/authContext";
import * as NavigationBar from "expo-navigation-bar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function Layout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("overlay-swipe");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <Stack>
          <Stack.Screen
            name="(protected)"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="signIn"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="signUp"
            options={{ headerShown: false, animation: "none" }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
