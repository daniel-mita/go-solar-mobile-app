/* eslint-disable react/jsx-no-constructed-context-values */
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {
  createContext,
  useState,
  FC,
  useContext,
  useEffect,
} from "react"
import { loginUser, signupUser } from "../api/auth"
import { User } from "../models/User"
import { LoginInfo } from "../screens/LoginScreen"

type AuthContextState = {
  isLoading: boolean
  isSignedIn: boolean
  login: (loginInfo: LoginInfo<string>) => Promise<void>
  signUp: (regInfo: User) => Promise<void>
  logout: () => Promise<void>
}

const contextDefaultValues: AuthContextState = {
  isLoading: false,
  isSignedIn: false,
  login: () => undefined,
  signUp: () => undefined,
  logout: () => undefined,
}

export const AuthContext = createContext(contextDefaultValues)

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const login = async (loginInfo: LoginInfo<string>) => {
    try {
      const response = await loginUser({
        email: loginInfo.email,
        password: loginInfo.password,
      })
      if (response.token) {
        setIsSignedIn(true)
        await AsyncStorage.setItem("user_token", JSON.stringify(response.token))
      }
    } catch (e) {
      throw e
    }
  }

  const signUp = async (regInfo: User) => {
    try {
      await signupUser(regInfo)
    } catch (e) {
      throw e
    }
  }

  const logout = async () => {
    setIsSignedIn(false)
    await AsyncStorage.removeItem("user_token")
  }

  const loadStorageToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("user_token"))
    if (token) {
      setIsSignedIn(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadStorageToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoading, isSignedIn, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
