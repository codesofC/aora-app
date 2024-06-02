import { useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyComponent from "../../components/EmptyComponent";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { getUsersPosts, singOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalContext";
import icons from "../../constants/icons";
import InfosBox from "../../components/InfosBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsConnected } = useGlobalContext();

  const { data: userPosts } = useAppwrite(() => getUsersPosts(user.$id));

  const logout = async () => {
    await singOut();
    router.replace("/login");
    setUser(null)
    setIsConnected(false)
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <FlatList
        data={userPosts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <HeaderComponent
            user={user}
            logout={logout}
            postsLength={userPosts.length}
          />
        )}
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

export default Profile;

const HeaderComponent = ({ user, postsLength, logout }) => {
  return (
    <View className="my-6 px-4 mb-12">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={logout}
        className="items-end justify-end mt-4"
      >
        <Image source={icons.logout} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
      <View className="items-center justify-center gap-y-4 mt-6">
        <View className="items-center justify-center gap-y-2">
          <View className="w-[55px] h-[55px] rounded-lg border border-secondary overflow-hidden p-0.5 items-center justify-center">
            <Image
              source={{ uri: user.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xl text-white font-bold">
            {" "}
            {user.username}{" "}
          </Text>
        </View>
        <View className="flex-row items-center justify-center">
          <InfosBox
            title={postsLength}
            subtitle="Posts"
            containerStyles="mr-6"
            titleStyles="text-xl font-bold"
          />
          <InfosBox
            title="9.2k"
            subtitle="Seguidores"
            titleStyles="text-xl font-bold"
          />
        </View>
      </View>
    </View>
  );
};
