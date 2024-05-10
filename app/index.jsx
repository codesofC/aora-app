import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";

const App = () => {



  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full px-4 items-center justify-center min-h-[90vh]">
          <Image
            source={images.logo}
            className="w-[115px] h-[84px]"
            resizeMode="contain"
          />
          <View className="gap-y-4">
            <Image
              source={images.cards}
              className="w-[375px] h-[298px]"
              resizeMode="contain"
            />
            <View className="relative">
              <Text className="text-3xl text-white text-center font-bold">
                Descubra infinitas possibilidades com
                <Text className="relative text-secondary text-4xl"> Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-1 -right-3"
                resizeMode="contain"
              />
            </View>
            <Text className="font-poppins_extralight text-sm text-center text-[#cdcde0] mt-8">
              Onde a criatividade encontra a inovação: embarque numa jornada de exploração ilimitada
            </Text>
          </View>
          <CustomButton title="Continua com Email" styles="p-5 mt-8" goToFn={() => router.push("/login")}/>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
