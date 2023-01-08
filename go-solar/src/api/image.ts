import { AxiosResponse } from "axios"
import axios from "../utils/axios"

const responseBody = (response: AxiosResponse) => response.data

export const uploadImage = async (file: any): Promise<any> => {
  const payload = { image: file.base64 }
  const response = await axios.post("/image/upload", payload)
  return responseBody(response)
}
