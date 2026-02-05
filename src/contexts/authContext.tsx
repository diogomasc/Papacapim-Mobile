import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AUTH_STORAGE_KEY = "@papacapim:auth-state";

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  async function storageAuthState(isLoggedIn: boolean) {
    try {
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ isLoggedIn }),
      );
    } catch (error) {
      console.error("Erro ao salvar estado de autenticação", error);
    }
  }

  function signIn() {
    setIsLoggedIn(true);
    storageAuthState(true);
    router.replace("/(protected)");
  }

  function signOut() {
    setIsLoggedIn(false);
    storageAuthState(false);
    router.replace("/signIn");
  }

  useEffect(() => {
    async function loadStorageState() {
      try {
        const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const state = storedState ? JSON.parse(storedState) : null;
        console.log("Estado carregado", state);
        setIsLoggedIn(state?.isLoggedIn ?? false);
      } catch (error) {
        console.error("Erro ao carregar estado de autenticação", error);
        setIsLoggedIn(false);
      } finally {
        setIsReady(true);
      }
    }
    loadStorageState();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
