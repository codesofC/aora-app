import { router } from "expo-router";
import { View, Text, Image } from "react-native";
import images from "../constants/images";
import CustomButton from "./CustomButton"

const EmptyComponent = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xs font-semibold text-white">{subtitle}</Text>
      <Text className="text-xl font-bold text-white"> {title} </Text>

      <CustomButton 
        title="Crie um vídeo"
        goToFn={() => router.push("/create")}
        styles="my-5 py-4 px-2"
      />
    </View>
  );
};

export default EmptyComponent;
