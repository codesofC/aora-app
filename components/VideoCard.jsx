import { View, Text, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="w-full mb-14 px-4 gap-4">
      <View className="flex-1 flex-row justify-between">
        <View className="flex-row gap-2 items-start max-w-[60%]">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary overflow-hidden p-0.5 items-center justify-center">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="gap-y-1">
            <Text className=" text-white font-bold" numberOfLines={1}>
              {" "}
              {title}{" "}
            </Text>
            <Text
              className="text-sm font-poppins_regular text-gray-100"
              numberOfLines={1}
            >
              {" "}
              {username}{" "}
            </Text>
          </View>
        </View>
        <View className="relative pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
          <View>
            <View className="absolute -bottom-4 -right-2 border bg-primary">
              <Image source={icons.bookmark} className="w-3 h-4" resizeMode="contain" />
              <Text> Salvar </Text>
            </View>
          </View>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
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
            source={{ uri: thumbnail }}
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
