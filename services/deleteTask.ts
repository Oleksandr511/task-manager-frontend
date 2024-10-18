// import axios from "axios";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "./axiosConfig";

export const deleteTask = async (id: string) => {
  try {
    console.log("delete task");
    // const accessToken = await AsyncStorage.getItem("accessToken");
    // const refreshToken = await AsyncStorage.getItem("refreshToken");
    const response = await axios({
      method: "DELETE",
      url: `http://localhost:8000/tasks/task/${id}`,
      //   headers: {
      //     accessToken: accessToken,
      //     refreshToken: refreshToken,
      //   },
    });
    // console.log("r", response.data);
    // console.log("headers", response.headers);
    // if (response.headers?.accessToken) {
    //   console.log("setting access token");
    //   await AsyncStorage.setItem("accessToken", response.headers?.accessToken);
    // }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
