// import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "./axiosConfig";

export const getTasks = async () => {
  try {
    console.log("get tasks");
    // const accessToken = await AsyncStorage.getItem("accessToken");
    // const refreshToken = await AsyncStorage.getItem("refreshToken");
    // console.log("accessToken", accessToken);
    const response = await axios({
      method: "GET",
      url: "http://localhost:8000/tasks",
      // headers: {
      //   accessToken: accessToken,
      //   refreshToken: refreshToken,
      // },
    });
    console.log("tasks", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
