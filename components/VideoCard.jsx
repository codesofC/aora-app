import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import icons from "../constants/icons";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { SavedVideo } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalContext";

const VideoCard = ({ video }) => {
  const [play, setPlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useGlobalContext();

  const updateTheData = async () => {
    const result = await SavedVideo(video.$id, {
      saved: [...video.saved, user.$id],
    })
      .then(() => {
        return Alert.alert("Success", "Foi");
      })
      .catch((error) => {
        return Alert.alert("Error", error.message + " " + id);
      });
  };

  return (
    <View className="w-full mb-14 px-4 gap-4">
      <View className="flex-1 flex-row justify-between">
        <View className="flex-row gap-2 items-start max-w-[60%]">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary overflow-hidden p-0.5 items-center justify-center">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="gap-y-1">
            <Text className=" text-white font-bold" numberOfLines={1}>
              {" "}
              {video.title}{" "}
            </Text>
            <Text
              className="text-sm font-poppins_regular text-gray-100"
              numberOfLines={1}
            >
              {" "}
              {video.username}{" "}
            </Text>
          </View>
        </View>
        <View className="relative pt-2">
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {showMenu && (
            <View className="absolute -bottom-20 right-0 border border-gray-400 bg-primary p-4 space-y-4 w-28 rounded-md z-10">
              <TouchableOpacity
                onPress={updateTheData}
                className="flex-row items-center space-x-1"
              >
                <Image
                  source={icons.bookmark}
                  className="w-3 h-4"
                  resizeMode="contain"
                />
                <Text className="text-white"> Salvar </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center space-x-1">
                <Image
                  source={icons.bookmark}
                  className="w-3 h-4"
                  resizeMode="contain"
                />
                <Text className="text-white"> Apaguar </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video.video }}
          className="w-full h-60 bg-white/10 "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative flex-1 h-60 rounded-xl overflow-hidden items-center justify-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            alt="thumbnail"
            className="w-full h-full"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
