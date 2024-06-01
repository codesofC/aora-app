
import { View, Text, Image, TouchableOpacity } from 'react-native'
import icons from '../constants/icons'

const VideoCard = ({ video: {title, thumbnail, video, creator: { username, avatar } }}) => {
  return (
    <View className="flex-1 mb-14 px-4 gap-4">
        <View className="flex-1 flex-row justify-between">
            <View className="flex-row gap-2 items-start max-w-[60%]">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary overflow-hidden p-0.5 items-center justify-center">
                    <Image source={{uri: avatar}} className="w-full h-full rounded-lg" resizeMode='cover' />
                </View>
                <View className="gap-y-1">
                    <Text className=" text-white font-bold" numberOfLines={1}> {title} </Text>
                    <Text className="text-sm font-poppins_regular text-gray-100" numberOfLines={1}> { username } </Text>
                </View>
            </View>
            <View className="pt-2">
                <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
            </View>
        </View>

        <TouchableOpacity activeOpacity={0.7} className="relative flex-1 h-60 rounded-xl overflow-hidden items-center justify-center">
            <Image 
                source={{uri: thumbnail}}
                alt='thumbnail'
                className="w-full h-full"
                resizeMode='cover'
            />
            <Image 
                source={icons.play}
                className="w-12 h-12 absolute"
            />
        </TouchableOpacity>
      
    </View>
  )
}

export default VideoCard