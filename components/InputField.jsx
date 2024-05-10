import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants"

const InputField = ({
  name,
  value,
  keyboardType,
  inputStyle,
  changeFormFn,
  placeholder
}) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`gap-2 ${inputStyle}`}>
      <Text className="text-base text-gray-100 font-semibold"> {name} </Text>
      <View className="flex-row items-center border-2 border-black-100 bg-black-100 px-4 h-16 rounded-xl focus:border-secondary">
        <TextInput
          value={value}
          keyboardType={keyboardType}
          onChangeText={changeFormFn}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          className="flex-1 text-base font-semibold text-white"
          secureTextEntry={keyboardType === "password" && !showPassword}
        />

        {keyboardType === "password" && (
          <TouchableOpacity activeOpacity={.7} onPress={() => setShowPassword(!showPassword)}>
            <Image 
              source={ showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
