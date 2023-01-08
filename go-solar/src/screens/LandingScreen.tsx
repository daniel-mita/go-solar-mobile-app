import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { View, Text, Image, Modal } from "react-native"
import { StyledButton } from "../components/custom-button"
import {  useAuth } from "../contexts/useAuth"
import { AppNavigationProps } from "../Router"
import { colors, px, styles } from "../styles"
import * as ImagePicker from "expo-image-picker"
import { uploadImage } from "../api/image"
import { Loading } from "../components/loading"
import { useImage } from "../contexts/useImage"

function LandingScreen() {
  const navigation = useNavigation<AppNavigationProps>()

  const { logout } = useAuth()
  const { setImage } = useImage()

  const [selectedImage, setSelectedImage] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [9, 16],
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setPhoto(result)
    }
  }

  const onUploadImage = async () => {
    try {
      setIsLoading(true)
      const imageResponse = await uploadImage(photo.assets[0])
      setImage(imageResponse.image)
      navigation.navigate("Results")
      setIsLoading(false)
      setPhoto(null)
      setSelectedImage(null)
    } catch (e: any) {
      console.log(e)
    }
  }

  const closeModal = () => {
    setPhoto(null)
    setSelectedImage(null)
  }

  const doLogout = async () => {
    await logout()
  }

  if (isLoading) return <Loading />

  return (
    <View style={styles.screen}>
      <Text
        style={[
          styles.headerText,
          styles.textCenter,
          { marginTop: px(10), marginBottom: px(10) },
        ]}
      >
        Landing Screen
      </Text>
      <View style={styles.flex_grow_1}></View>
      <View style={{ margin: px(15) }}>
        <StyledButton text="Pick image from camera roll" onPress={pickImage} />
      </View>
      {selectedImage && (
        <Modal visible={selectedImage ? true : false}>
          <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.fancyBlue }}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: 350,
                  height: 600,
                  borderColor: "white",
                  borderWidth: px(2),
                }}
              />
            </View>
            <View style={{ margin: px(15) }}>
              <StyledButton text="Upload Image" onPress={onUploadImage} />
            </View>
            <View style={{ margin: px(15) }}>
              <StyledButton text="Cancel" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
      <View style={{ margin: px(15) }}>
        <StyledButton
          text="Camera"
          onPress={() => navigation.navigate("Camera")}
        />
      </View>
      <View style={styles.flex_grow_1}></View>
      <View style={{ margin: px(15) }}>
        <StyledButton text="Logout" onPress={doLogout} />
      </View>
    </View>
  )
}

export default LandingScreen
