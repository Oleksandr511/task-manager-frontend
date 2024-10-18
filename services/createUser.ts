import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface UserData {
  name: string;
  email: string;
  password: string;
}
export const createUser = async (userData: UserData) => {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/auth/register",
      data: userData,
    });
    console.log("success", response.data);

    await AsyncStorage.setItem("accessToken", response.data.accessToken);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    Alert.alert("Error", "An error occurred while creating the user");
    console.log("creating user error", error);
    throw new Error("An error occurred while creating the user");
  }
};
