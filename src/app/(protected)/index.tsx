import { View, Button } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Sair do app" onPress={signOut} />
    </View>
  );
}
