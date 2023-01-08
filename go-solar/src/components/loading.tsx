import React from "react"
import { View, ActivityIndicator } from "react-native"
import { colors, styles } from "../styles"

export const Loading = () => {
  return (
    <View
      style={styles.screen}
    >
      <ActivityIndicator color={colors.coolRed} animating={true} size="large"  />
    </View>
  )
}
