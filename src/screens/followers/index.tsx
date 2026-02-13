import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetFollowersQuery } from "@/queries/followers";
import { UserCard } from "@/components/userCard";
import { Loading } from "@/components/loading";
import { EmptyState } from "@/components/emptyState";
import { colors } from "@/theme/colors";
import type { Follower } from "@/types/api";
import styles from "./styles";

export function Followers() {
  const router = useRouter();
  const params = useLocalSearchParams<{ login: string }>();
  const login = params.login || "";

  const { data: followers, isLoading } = useGetFollowersQuery(login);

  function handleUserPress(userLogin: string) {
    router.push({
      pathname: "/(protected)/profile" as any,
      params: { login: userLogin },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguidores</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Loading />
      ) : followers && followers.length > 0 ? (
        <FlatList
          data={followers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: Follower }) => (
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
        <EmptyState>
          <EmptyState.Icon>
            <MaterialIcons
              name="group"
              size={48}
              color={colors.text.disabled}
            />
          </EmptyState.Icon>
          <EmptyState.Title>Nenhum seguidor ainda</EmptyState.Title>
          <EmptyState.Subtitle>
            Este usuário ainda não possui seguidores
          </EmptyState.Subtitle>
        </EmptyState>
      )}
    </View>
  );
}
