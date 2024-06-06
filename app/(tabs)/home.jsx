import { useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyComponent from '../../components/EmptyComponent'
import SearchBar from '../../components/SearchBar'
import TrendingVideos from '../../components/TrendingVideos'
import images from '../../constants/images'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalContext'

const Home = () => {

  const {data: allPosts, isLoading, refresh } = useAppwrite(getAllPosts)

  const {user} = useGlobalContext()

  const [isRefresh, setIsRefresh] = useState(false)

  const onRefresh = async () => {
    setIsRefresh(true)
    // fetch videos
    await refresh()
    setIsRefresh(false)
  }


  return (
    <SafeAreaView className="bg-primary min-h-full w-full">
      <FlatList 
        data={allPosts}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => <HeaderComponent username={user.username} />}
        ListEmptyComponent={() => <EmptyComponent title="Nenhum vídeo encontrado" subtitle="Seja o primeiro a carregar um vídeo" />}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home


const HeaderComponent = ({username}) => {

  const {data: latestPosts} = useAppwrite(getLatestPosts)

  return (
    <View className="my-6 px-4 space-y-6">
      <View className="items-start justify-between flex-row mb-6">
        <View>
          <Text className="text-sm font-semibold text-white"> Bem-vindo de volta </Text>
          <Text className="text-2xl font-bold text-white"> {username} </Text>
        </View>
        <Image 
          source={images.logoSmall}
          className="w-10 h-11"
          resizeMode='contain'
        />
      </View>
      <SearchBar />
      <View>
        <Text className="text-white">Últimos vídeos</Text>
        <TrendingVideos posts={latestPosts || []} />
      </View>
    </View>
  )
}