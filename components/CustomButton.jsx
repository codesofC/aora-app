import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, styles, isLoading, goToFn}) => {
  return (
    <TouchableOpacity 
        className={`w-full bg-secondary rounded-xl ${styles} ${isLoading ? 'opacity-5' : ''}`}
        activeOpacity={.7}
        onPress={goToFn}
        disabled={isLoading}
    >
      <Text className={`text-primary font-bold text-center text-xl`}>{ title }</Text>
    </TouchableOpacity>
  )
}

export default CustomButton