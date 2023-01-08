import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Text, SafeAreaView, Image } from "react-native"
import { StyledButton } from "../components/custom-button"
import { AuthNavigationProps } from "../Router"
import { px, styles, size } from "../styles"

function HomeScreen() {
  const navigation = useNavigation<AuthNavigationProps>()
  return (
       <View style={styles.screen}>
        <View style={styles.flex_grow_1}></View>
        <View style={[styles.center]}>
          <Image
            style={[size(250, 250), styles.circularLogo]}
            source={require("../../assets/logo.png")}
          ></Image>
          {/* using size for images so that they scale for different screen sizes */}
        </View>
        <View style={styles.flex_grow_1}></View>
        <Text
          style={[
            styles.headerText,
            styles.textCenter,
            { marginTop: px(50), marginBottom: px(10) },
          ]}
        >
          Welcome to Go-Solar
        </Text>
        <View style={{ margin: px(15) }}>
          <StyledButton
            text="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={{ margin: px(15) }}>
          <StyledButton
            text="Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
  )
}

export default HomeScreen
