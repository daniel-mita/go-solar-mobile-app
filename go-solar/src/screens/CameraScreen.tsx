import React, { useEffect, useRef, useState } from "react"
import { View, Text, Image } from "react-native"
import { Camera } from "expo-camera"
import { px, styles } from "../styles"
import { StyledButton } from "../components/custom-button"
import * as MediaLibrary from "expo-media-library"
import { uploadImage } from "../api/image"
import { Loading } from "../components/loading"
import { useNavigation } from "@react-navigation/native"
import { AppNavigationProps } from "../Router"
import { useImage } from "../contexts/useImage"

function CameraScreen() {
  let cameraRef = useRef<any>()
  const navigation = useNavigation<AppNavigationProps>()
  const { setImage } = useImage()
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >()
  const [photo, setPhoto] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === "granted")
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
    })()
  }, [])

  const onUploadImage = async () => {
    try {
      setIsLoading(true)
      const imageResponse = await uploadImage(photo)
      setImage(imageResponse.image)
      navigation.navigate("Results")
      setIsLoading(false)
      setPhoto(null)
    } catch (e: any) {
      console.log(e)
    }
  }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    )
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    }

    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
  }

  if (isLoading) return <Loading />

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }

    return (
      <View style={styles.screen}>
        <Image
          style={{
            alignSelf: "stretch",
            flex: 1,
            borderColor: "white",
            borderWidth: px(2),
          }}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={{ margin: px(15) }}>
          {hasMediaLibraryPermission ? (
            <StyledButton style={{marginTop: px(5)}} text="Save" onPress={savePhoto} />
          ) : undefined}
          <StyledButton style={{marginTop: px(5)}} text="Discard" onPress={() => setPhoto(undefined)} />
          <StyledButton style={{marginTop: px(5)}} text="Upload Image" onPress={onUploadImage} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Camera style={styles.camera} ref={cameraRef}></Camera>
      <View style={{ marginTop: px(15) }}>
        <StyledButton onPress={takePic} text="Take Photo"></StyledButton>
      </View>
    </View>
  )
}

export default CameraScreen
