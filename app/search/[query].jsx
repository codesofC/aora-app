import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyComponent from "../../components/EmptyComponent";
import SearchBar from "../../components/SearchBar";
import { getSearchQuery } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const {
    data: searchResult,
    isLoading,
    refresh,
  } = useAppwrite(() => getSearchQuery(query));


  useEffect(() => {
    refresh()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <FlatList
        data={searchResult}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => <HeaderComponent query={query} />}
        ListEmptyComponent={() => (
          <EmptyComponent
            title="Nenhum vídeo encontrado"
            subtitle="Nenhum resultado para essa pesquisa"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const HeaderComponent = ({ query }) => {
  return (
    <View className="my-6 px-4 space-y-6">
      <View className="mb-6">
        <View className="mb-4">
          <Text className="text-sm font-semibold text-white">
            Pesquisa para:
          </Text>
          <Text className="text-2xl font-bold text-white"> {query} </Text>
        </View>

        <SearchBar initialQuery={query} />
      </View>
    </View>
  );
};
