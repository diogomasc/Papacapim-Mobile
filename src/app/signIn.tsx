import { View, Button } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function SingIn() {
  const { signIn } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Entrar" onPress={signIn} />
    </View>
  );
}
