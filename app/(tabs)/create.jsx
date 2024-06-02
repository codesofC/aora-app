import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import { createVideo } from "../../lib/appwrite";
import { router } from "expo-router";
import {useGlobalContext} from "../../context/GlobalContext"

const Create = () => {
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });

  const { user } = useGlobalContext()

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm((prevState) => ({ ...prevState, thumbnail: result.assets[0] }));
      }

      if (selectType === "video") {
        setForm((prevState) => ({ ...prevState, video: result.assets[0] }));
      }
    }
  };

  const submitForm = async () => {
    if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert("Todo os campos devem ser preenchidos!");
    }

    setUploading(true);

    await createVideo({ ...form, userId: user.$id })
      .then(() => {
        Alert.alert("Success", "Post carregado com successo");
        router.push("/home");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setForm({
          title: "",
          thumbnail: null,
          video: null,
          prompt: "",
        });
        setUploading(false);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-semibold">
          Carregar Vídeo
        </Text>

        <InputField
          name="Título do vídeo"
          value={form.title}
          placeholder="Dá um título para seu vídeo"
          changeFormFn={(e) =>
            setForm((prevstate) => ({ ...prevstate, title: e }))
          }
          inputStyle="mt-10"
        />

        <View className="mt-6 space-y-2">
          <Text className="text-gray-100 text-base font-semibold">
            {" "}
            Carregar um vídeo{" "}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("video")}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-40"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 bg-black-100 items-center justify-center px-4 rounded-2xl">
                <View className="w-14 h-14 border border-dashed border-secondary items-center justify-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-6 space-y-2">
          <Text className="text-gray-100 text-base font-semibold">
            {" "}
            Imagem da miniatura{" "}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-60"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 bg-black-100 flex-row items-center justify-center px-4 rounded-2xl">
                <Image
                  source={icons.upload}
                  className="w-6 h-6 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-gray-100 font-poppins_medium text-sm">
                  {" "}
                  Escolhe um arquivo{" "}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          name="AI Prompt"
          value={form.prompt}
          placeholder="O prompt que usou para criar o vídeo"
          changeFormFn={(e) =>
            setForm((prevstate) => ({ ...prevstate, prompt: e }))
          }
          inputStyle="mt-7"
        />

        <CustomButton
          title="Publicar"
          isLoading={uploading}
          styles="p-4 mt-7"
          goToFn={submitForm}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
