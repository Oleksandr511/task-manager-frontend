import { Alert } from "react-native";
import axios from "./axiosConfig";

export const updateTask = async ({ taskId, taskData }: { taskId: number }) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `http://localhost:8000/tasks/update/${taskId}`,
      data: taskData,
    });
    return response.data;
  } catch (error) {
    Alert.alert("Error", "An error occurred while updating the task");
    console.log("error", error);
  }
};
