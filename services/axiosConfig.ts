// axiosConfig.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Додаємо інтерцептор для кожного запиту
axios.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers["accessToken"] = accessToken;
    }

    if (refreshToken) {
      config.headers["refreshToken"] = refreshToken;
    }
    console.log("config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Інтерцептор для відповідей, щоб оновити access-токен
axios.interceptors.response.use(
  async (response) => {
    if (response.headers?.accessToken) {
      console.log("Updating access token");
      await AsyncStorage.setItem("accessToken", response.headers.accessToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
import { getItem, setItem } from "expo-secure-store";
