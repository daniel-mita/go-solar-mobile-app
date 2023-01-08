import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

import { BASE_URL } from "./config"

let axiosInstance = axios.create({
  baseURL: BASE_URL,
})

const errorHandler = (error: any) => {
  return Promise.reject(error)
}

const requestHandler = async (request: any) => {
  if (request.headers) {
    const token = await AsyncStorage.getItem("user_token")
    request.headers["Content-Type"] = "application/json"
    request.headers.Authorization =
      `Bearer ${JSON.parse(token)}` || ""
  }

  return request
}

axiosInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
)

export default axiosInstance
