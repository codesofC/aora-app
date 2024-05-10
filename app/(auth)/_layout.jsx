import { Stack } from 'expo-router'
import 'react-native-url-polyfill/auto'

const AuthLayout = () => {
    return (
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false}} />
          <Stack.Screen name="sign-up" options={{headerShown: false}} />
        </Stack>
      )
}

export default AuthLayout