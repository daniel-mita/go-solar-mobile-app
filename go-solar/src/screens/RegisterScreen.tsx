import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { View, Text, Alert } from "react-native"
import { StyledButton } from "../components/custom-button"
import { StyledInput } from "../components/custom-text-input"
import { useAuth } from "../contexts/useAuth"
import { AuthNavigationProps } from "../Router"
import { px, styles } from "../styles"

export type RegInfo<T> = {
  email: T
  username: T
  password: T
}

function RegisterScreen() {
  const navigation = useNavigation<AuthNavigationProps>()

  const [regInfo, setRegInfo] = useState<RegInfo<string>>({
    email: "",
    username: "",
    password: "",
  })

  const [error, setError] = useState<any>()

  const { signUp } = useAuth()

  const onChangeEmail = (val: string) => {
    setRegInfo({ ...regInfo!, email: val })
  }

  const onChangeUsername = (val: string) => {
    setRegInfo({ ...regInfo!, username: val })
  }

  const onChangePassword = (val: string) => {
    setRegInfo({ ...regInfo!, password: val })
  }

  const doSignup = async () => {
    try {
      await signUp(regInfo)
      Alert.alert("Successfully signed up")
      navigation.navigate("Login")
    } catch (e) {
      setError(e)
    }
  }

  return (
    <View style={styles.screen}>
      <Text
        style={[
          styles.headerText,
          styles.textCenter,
          { marginTop: px(50), marginBottom: px(10) },
        ]}
      >
        Register
      </Text>
      <View>
        <StyledInput
          onChangeText={onChangeEmail}
          value={regInfo.email}
          label="email"
        />
        <StyledInput
          onChangeText={onChangeUsername}
          value={regInfo.username}
          label="username"
        />
        <StyledInput
          onChangeText={onChangePassword}
          value={regInfo.password}
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
        <StyledButton text="Register" onPress={doSignup} />
      </View>
    </View>
  )
}

export default RegisterScreen
