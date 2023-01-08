import React from "react"
import { KeyboardTypeOptions, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Madoka } from "react-native-textinput-effects"
import { colors, px } from "../styles"

export const StyledInput = (props: {
  label: string
  onChangeText: (text: string) => void
  value: string
  keyboardType?: KeyboardTypeOptions
  isPassword?: boolean
}) => {
  return (
    <View style={{ margin: px(15) }}>
      <Madoka
        autoCapitalize="none"
        secureTextEntry={props.isPassword}
        label={props.label}
        onChangeText={props.onChangeText}
        value={props.value}
        keyboardType={props.keyboardType}
        borderColor={"white"}
        inputPadding={16}
        labelStyle={{ color: colors.coolRed }}
        inputStyle={{ color: "white" }}
      />
    </View>
  )
}
