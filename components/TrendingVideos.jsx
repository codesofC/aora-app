import { View, Text, FlatList } from 'react-native'
import React from 'react'

const TrendingVideos = ({ posts }) => {
  return (
    <FlatList 
        data={posts}
        renderItem={({item}) => (
            <View>
                <Text className="text-white"> {item.id} </Text>
            </View>
        )}
        keyExtractor={item => item.id}
        horizontal
    />
  )
}

export default TrendingVideos