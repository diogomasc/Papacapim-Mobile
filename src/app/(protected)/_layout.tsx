import { Tabs } from "expo-router";
import { Redirect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator } from "react-native";
import { colors } from "@/theme/colors";

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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.disabled,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="editProfile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="createPost"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="postDetail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="followers"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="accountSettings"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
