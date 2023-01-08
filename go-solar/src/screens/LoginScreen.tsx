import React, { useState } from "react"
import { View, Text } from "react-native"
import { StyledButton } from "../components/custom-button"
import { StyledInput } from "../components/custom-text-input"
import { Loading } from "../components/loading"
import { useAuth } from "../contexts/useAuth"
import { px, styles, size } from "../styles"

export type LoginInfo<T> = {
  email: T
  password: T
}

function LoginScreen() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo<string>>({
    email: "",
    password: "",
  })

  const [error, setError] = useState<any>()

  const { login, isLoading } = useAuth()

  const onChangeEmail = (val: string) => {
    setLoginInfo({ ...loginInfo!, email: val })
  }

  const onChangePassword = (val: string) => {
    setLoginInfo({ ...loginInfo!, password: val })
  }

  const doLogin = async () => {
    try {
      await login(loginInfo)
    } catch (e) {
      setError(e)
    }
  }

  if (isLoading) return <Loading />
  return (
    <View style={styles.screen}>
      <Text
        style={[
          styles.headerText,
          styles.textCenter,
          { marginTop: px(50), marginBottom: px(10) },
        ]}
      >
        Login
      </Text>
      <View>
        <StyledInput
          onChangeText={onChangeEmail}
          value={loginInfo.email}
          label="email"
        />
        <StyledInput
          onChangeText={onChangePassword}
          value={loginInfo.password}
          label="password"
          isPassword={true}
        />
      </View>
      {error && (
        <View>
          <Text style={{ color: "red" }}>{error.message}</Text>
        </View>
      )}
      <View style={{ margin: px(15) }}>
        <StyledButton text="Login" onPress={doLogin} />
      </View>
    </View>
  )
}

export default LoginScreen
