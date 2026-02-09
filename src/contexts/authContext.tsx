import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setApiToken } from "@/services/api";
import type { User } from "@/types/api";

type AuthState = {
  user: User | null;
  token: string | null;
  sessionId: number | null;
  isLoggedIn: boolean;
  isReady: boolean;
  isLoading: boolean;
  signIn: (token: string, sessionId: number, user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AUTH_TOKEN_KEY = "@papacapim:auth-token";
const AUTH_USER_KEY = "@papacapim:auth-user";
const AUTH_SESSION_ID_KEY = "@papacapim:auth-session-id";

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = !!user && !!token;

  async function signIn(newToken: string, newSessionId: number, newUser: User) {
    try {
      setIsLoading(true);
      setApiToken(newToken);

      setToken(newToken);
      setSessionId(newSessionId);
      setUser(newUser);
      await AsyncStorage.multiSet([
        [AUTH_TOKEN_KEY, newToken],
        [AUTH_SESSION_ID_KEY, newSessionId.toString()],
        [AUTH_USER_KEY, JSON.stringify(newUser)],
      ]);

      console.log("✅ Login realizao com sucesso. Usuário: ", newUser.login);
      router.replace("/(protected)");
    } catch (error) {
      console.error("❌ Erro ao realizar login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);

      setApiToken(null);

      setToken(null);
      setSessionId(null);
      setUser(null);

      await AsyncStorage.multiRemove([
        AUTH_TOKEN_KEY,
        AUTH_SESSION_ID_KEY,
        AUTH_USER_KEY,
      ]);

      console.log("✅ Logout realizado com sucesso");
      router.replace("/signIn");
    } catch (error) {
      console.error("❌ Erro ao realizar logout:", error);
      setApiToken(null);
      setToken(null);
      setSessionId(null);
      setUser(null);
      router.replace("/signIn");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadStorageState() {
      try {
        const [[, storedToken], [, storedSessionId], [, storedUser]] =
          await AsyncStorage.multiGet([
            AUTH_TOKEN_KEY,
            AUTH_SESSION_ID_KEY,
            AUTH_USER_KEY,
          ]);

        if (storedToken && storedSessionId && storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;

          setToken(storedToken);
          setSessionId(Number(storedSessionId));
          setUser(parsedUser);
          setApiToken(storedToken);

          console.log(
            "✅ Estado de autenticação restaurado para o usuário:",
            parsedUser.login,
          );
        } else {
          console.log("ℹ️ Estado de autenticação não encontrado no storage");
        }
      } catch (error) {
        console.error("❌ Erro ao restaurar estado de autenticação:", error);
        await AsyncStorage.multiRemove([
          AUTH_TOKEN_KEY,
          AUTH_SESSION_ID_KEY,
          AUTH_USER_KEY,
        ]);
      } finally {
        setIsReady(true);
      }
    }
    loadStorageState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        sessionId,
        isLoggedIn,
        isReady,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
