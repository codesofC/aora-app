import { View, Text, ScrollView, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import InputField from "../../components/InputField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = () => {
    if(!form.email || !form.password){
      Alert.alert("Erro", "Por favor, preenche todos os campos!")
    }

    setIsSubmitting(true)

    signIn(form.email, form.password)
    .then((response) => {

      router.replace("/home")
    })
    .catch(err => {
      Alert.alert("Error", err.message)
    })
    .finally(() => {
      setIsSubmitting(false)
    })
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full px-4 min-h-[90vh] gap-y-6 justify-center">
          <Image
            source={images.logo}
            className="w-[115px] h-[84px]"
            resizeMode="contain"
          />

          <View>
            <Text className="text-3xl font-bold text-white"> Conecte-se </Text>
            <InputField
              name="Email"
              value={form.email}
              keyboardType="email-address"
              inputStyle="mt-8"
              changeFormFn={(e) =>
                setForm((prevState) => ({ ...prevState, email: e }))
              }
              placeholder="Ex: Cristooo"
            />
            <InputField
              name="Senha"
              value={form.password}
              keyboardType="password"
              inputStyle="mt-8"
              changeFormFn={(e) =>
                setForm((prevState) => ({ ...prevState, password: e }))
              }
            />
            <CustomButton title="Entrar" styles="mt-12 p-5" isLoading={isSubmitting} goToFn={submitForm} />
            <View className="mt-4">
              <Text className="text-lg text-gray-100 text-center">
                {" "}
                Não tem conta ainda?{" "}
                <Link href={"/sign-up"} className="text-secondary">
                  Inscreve-se
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Login;
