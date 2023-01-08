import { NavigationContainer } from "@react-navigation/native"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import React, { useEffect } from "react"
import { Loading } from "./components/loading"
import AuthProvider, { useAuth } from "./contexts/useAuth"
import CameraScreen from "./screens/CameraScreen"
import HomeScreen from "./screens/HomeScreen"
import LandingScreen from "./screens/LandingScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ResultsScreen from "./screens/ResultScreen"
import { ScreenOptions } from "./styles"

export type AuthStackParamList = {
  Home: undefined
  Login: undefined
  Register: undefined
}
export type AppStackParamList = {
  Landing: undefined
  Camera: undefined
  Results: undefined
}

export type AuthNavigationProps = StackNavigationProp<AuthStackParamList>
export type AppNavigationProps = StackNavigationProp<AppStackParamList>
const Stack = createStackNavigator()

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={ScreenOptions as {}}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  )
}

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={ScreenOptions as {}}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const Router = () => {
  const { isLoading, isSignedIn } = useAuth()

  if (isLoading) return <Loading />
  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router
