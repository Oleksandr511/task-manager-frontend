import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfile = async () => {
  try {
    console.log("get user profile");
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log("accessToken", accessToken);
    const response = await axios({
      method: "GET",
      url: "http://localhost:8000/users/profile",
      headers: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
    console.log("r", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
