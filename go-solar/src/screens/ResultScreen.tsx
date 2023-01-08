import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Text, Image } from "react-native"
import { StyledButton } from "../components/custom-button"
import { useImage } from "../contexts/useImage"
import { AppNavigationProps } from "../Router"
import { px, styles } from "../styles"

function ResultsScreen() {
  const navigation = useNavigation<AppNavigationProps>()
  const { image, setImage } = useImage()

  const goBack = () => {
    setImage(null)
    navigation.navigate("Landing")
  }

  return (
    <View style={styles.screen}>
      <Text
        style={[
          styles.headerText,
          styles.textCenter,
          { marginTop: px(10), marginBottom: px(10) },
        ]}
      >
        Results
      </Text>
      <View style={styles.flex_grow_1}></View>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 275,
            height: 500,
            borderColor: "white",
            borderWidth: px(2),
          }}
          source={{ uri: `data:image/jpeg;base64,${image}` }}
        />
      </View>
      <View style={styles.flex_grow_1}></View>
      <View style={{ margin: px(15) }}>
        <StyledButton onPress={goBack} text="Go Back"></StyledButton>
      </View>
    </View>
  )
}

export default ResultsScreen
