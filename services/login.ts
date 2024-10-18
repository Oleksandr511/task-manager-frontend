import React from "react";
import { View, Text, Alert } from "react-native";
// import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "./axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const login = async (props: { email: string; password: string }) => {
  console.log("p", props);
  try {
    let res = await axios({
      method: "POST",
      url: "http://localhost:8000/auth/login",
      data: {
        email: props.email,
        password: props.password,
      },
    });
    console.log("data", res.data);
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
    await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
    return res.data;
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "An error occurred while signing in");
  }
};
