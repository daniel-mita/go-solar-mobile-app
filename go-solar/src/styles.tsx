import { Dimensions, PixelRatio, StyleProp, StyleSheet } from "react-native"

export const { width, height } = Dimensions.get("window")
export const dpi = PixelRatio.get()

export function px(value: number) {
  return (value * width) / 400
}
//scalability for different device screen ratio

export function toStyleArray<T>(style: StyleProp<T>) {
  return style && "map" in style ? style : [style]
} //accept local style + styles given when used

export function size(width: number, height?: number) {
  return {
    width: px(width),
    height: px(height ?? width),
  }
}

export const colors = {
  fancyBlue: "#3C91E6",
  coolGray: "#7A7265",
  coolRed: "#C8553D",
}

export const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
  center: {
    alignSelf: "center",
  },
  flex_grow_1: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: px(30),
    fontWeight: "bold",
    color: "white",
  },
  flex_row: {
    flexDirection: "row",
  },
  circularLogo: {
    borderRadius: px(150),
  },
  camera: {
    height: "70%",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  results: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: px(15),
    marginTop: px(25),
  },
})

export const ScreenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: colors.fancyBlue },
}

export const screenOptions = {
  cardStyle: { backgroundColor: colors.fancyBlue },
  headerTintColor: "white",
}
