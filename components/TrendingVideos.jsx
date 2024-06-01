import { View, Text, FlatList } from 'react-native'

const TrendingVideos = ({ posts }) => {
  return (
    <FlatList 
        data={posts}
        renderItem={({item}) => (
            <View>
                <Text className="text-white"> {item.id} </Text>
            </View>
        )}
        horizontal
    />
  )
}

export default TrendingVideos