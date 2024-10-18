import { Alert } from "react-native";
import axios from "./axiosConfig";

export const createTask = async (taskData) => {
    try {
        const response = await axios({
        method: "POST",
        url: "http://localhost:8000/tasks/new",
        data: taskData,
        });
        // console.log('success',response.data);
        return response.data;
    } catch (error) {
        Alert.alert("Error", "An error occurred while creating the task");
        console.log('creating task error',error);
        throw new Error("An error occurred while creating the task");
    }
};
