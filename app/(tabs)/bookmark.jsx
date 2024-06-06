import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyComponent from "../../components/EmptyComponent";
import SearchBar from "../../components/SearchBar";
import { getVideosSaved } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalContext";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: allPosts, isLoading, refresh } = useAppwrite(() => getVideosSaved(user.$id));


  const [isRefresh, setIsRefresh] = useState(false);

  const onRefresh = async () => {
    setIsRefresh(true);
    // fetch videos
    await refresh();
    setIsRefresh(false);
  };


  return (
    <SafeAreaView className="bg-primary min-h-full w-full">
      <FlatList
        data={allPosts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => <HeaderComponent />}
        ListEmptyComponent={() => (
          <EmptyComponent
            title="Nenhum vídeo encontrado"
            subtitle="Seja o primeiro a carregar um vídeo"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const HeaderComponent = () => {


  return (
    <View className="my-6 px-4 space-y-6">
      <Text className="text-2xl font-bold text-white mb-10"> Vídeos salvas </Text>
      <SearchBar />
    </View>
  );
};
