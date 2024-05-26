import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import icons from "../constants/icons"

const SearchBar = () => {

    const [searchData, setSearchData] = useState('')

  return (
      <View className="flex-row items-center border-2 border-black-100 bg-black-100 px-4 h-16 rounded-xl focus:border-secondary space-x-4">
        <TextInput
          value={searchData}
          onChangeText={setSearchData}
          placeholder="Busca um tópico de vídeo"
          placeholderTextColor="#7b7b8b"
          className="flex-1 text-base font-semibold text-white"
        />

        <TouchableOpacity>
            <Image 
                source={icons.search}
                className="w-5 h-5"
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchBar