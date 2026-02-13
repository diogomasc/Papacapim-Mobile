import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetUsersQuery } from "@/queries/users";
import { UserCard } from "@/components/userCard";
import { Input } from "@/components/input";
import { colors } from "@/theme/colors";
import styles from "./styles";

export function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersQuery({
    search: debouncedSearch,
    page,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  function handleUserPress(login: string) {
    router.push({
      pathname: "/(protected)/profile" as any,
      params: { login },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar Usuários</Text>
      </View>

      <Input style={styles.searchInput}>
        <Input.Icon>
          <MaterialIcons
            name="search"
            size={20}
            color={colors.text.secondary}
          />
        </Input.Icon>
        <Input.Field
          placeholder="Buscar por nome ou login..."
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
      </Input>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="error" size={48} color={colors.text.disabled} />
          <Text style={styles.emptyText}>
            Erro ao buscar usuários. Tente novamente.
          </Text>
        </View>
      ) : users && users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleUserPress(item.login)}
              activeOpacity={0.7}
            >
              <UserCard>
                <UserCard.Avatar name={item.name} />
                <UserCard.Info>
                  <UserCard.Name>{item.name}</UserCard.Name>
                  <UserCard.Login>@{item.login}</UserCard.Login>
                </UserCard.Info>
              </UserCard>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="person-search"
            size={64}
            color={colors.text.disabled}
          />
          <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
          <Text style={styles.emptySubtext}>
            Tente buscar por outro nome ou login
          </Text>
        </View>
      )}
    </View>
  );
}
