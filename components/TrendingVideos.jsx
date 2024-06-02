import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import animations from "../constants/animations";
import { useState } from "react";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={
        activeItem === item.$id ? animations.zoomIn : animations.zoomOut
      }
      duration={500}
    >
      <TouchableOpacity 
        className="w-52 h-72 rounded-[35px] shadow-lg shadow-black/40 my-5 overflow-hidden"
        activeOpacity={0.7}
        onPress={() => setPlay(!play)}
      >
        {play ? (
          <Video 
            source={{ uri: item.video }} className="w-full h-full bg-white/10 " 
            resizeMode={ResizeMode.COVER}
            useNativeControls={false}
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if(status.didJustFinish){
                setPlay(false)
              }
            }}
          />
        ) : (
          <View
            className="relative items-center justify-center"
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-full h-full"
              resizeMode="cover"
            />

            <Image source={icons.play} className="w-12 h-12 absolute" />
          </View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const TrendingVideos = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  //Control the viewer change
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default TrendingVideos;
