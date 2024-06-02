import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import icons from "../constants/icons"
import { router, usePathname } from 'expo-router'

const SearchBar = ({ initialQuery }) => {

    const [query, setQuery] = useState(initialQuery || '')

    const pathname = usePathname()

    const searchFn = () => {
      if(!query){
        return Alert.alert("Indique uma coisa a pesquisar!")
      }
      if(pathname.startsWith("/search")){
        router.setParams({ query })
      }else{
        router.push(`/search/${query}`)
      }
    }

  return (
      <View className="flex-row items-center border-2 border-black-100 bg-black-100 px-4 h-16 rounded-xl focus:border-secondary space-x-4">
        <TextInput
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder="Busca um tópico de vídeo"
          placeholderTextColor="#7b7b8b"
          className="flex-1 text-base font-semibold text-white"
        />

        <TouchableOpacity
          onPress={searchFn}
        >
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