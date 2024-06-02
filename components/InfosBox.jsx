import { View, Text } from "react-native";
import React from "react";

const InfosBox = ({ title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={`items-center justify-center ${containerStyles}`}>
      <Text className={`text-white ${titleStyles}`}> {title} </Text>
      <Text className="text-white font-extralight"> {subtitle} </Text>
    </View>
  );
};

export default InfosBox;
