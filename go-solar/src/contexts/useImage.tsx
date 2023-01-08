/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react"

type ImageContextState = {
  image: string
  setImage: Dispatch<SetStateAction<string>>
}

const contextDefaultValues: ImageContextState = {
  image: "",
  setImage: () => undefined,
}

export const ImageContext = createContext(contextDefaultValues)

const ImageProvider = ({ children }) => {
  const [image, setImage] = useState<string>("")

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  )
}

export const useImage = () => useContext(ImageContext)

export default ImageProvider
