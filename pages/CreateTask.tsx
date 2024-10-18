import React, { FC, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { createTask } from "../services/createTask";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  CreateTask: { setChange: () => void };
};

type CreateTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateTask"
>;
type CreateTaskScreenRouteProp = RouteProp<RootStackParamList, "CreateTask">;

interface Props {
  navigation: CreateTaskScreenNavigationProp;
}

export const CreateTask: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<CreateTaskScreenRouteProp>();
  const { setChange } = route.params;
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    priority: "MEDIUM",
    status: "PENDING",
  });

  const priorityOptions = ["LOW", "MEDIUM", "HIGH"];
  const statusOptions = ["PENDING", "IN_PROGRESS", "DONE"];
  const currentPriorityIndex = useRef(priorityOptions.indexOf("MEDIUM"));
  const currentStatusIndex = useRef(statusOptions.indexOf("PENDING"));

  const handleTaskSubmit = () => {
    console.log("Task Data:", taskData);
    if (taskData.title && taskData.content) {
      createTask(taskData);
      navigation.goBack();
      setChange(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#192f4f" }}>
      <Text style={styles.title}>Create new task</Text>
      <View>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={taskData.title}
          onChangeText={(text) => setTaskData({ ...taskData, title: text })}
        />
        <TextInput
          placeholder="Content"
          style={styles.input}
          value={taskData.content}
          onChangeText={(text) => setTaskData({ ...taskData, content: text })}
        />
        <Text style={styles.text_option}>Choose Priority:</Text>
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            { backgroundColor: pressed ? "#e0e0e0" : "#dee5f1" },
          ]}
          onPress={() => {
            currentPriorityIndex.current =
              currentPriorityIndex.current === 2
                ? 0
                : currentPriorityIndex.current + 1;
            setTaskData({
              ...taskData,
              priority: priorityOptions[currentPriorityIndex.current],
            });
          }}
        >
          <Text>{priorityOptions[currentPriorityIndex.current]}</Text>
        </Pressable>

        <Text style={styles.text_option}>Choose Status:</Text>
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            { backgroundColor: pressed ? "#e0e0e0" : "#dee5f1" },
          ]}
          onPress={() => {
            currentStatusIndex.current =
              currentStatusIndex.current === 2
                ? 0
                : currentStatusIndex.current + 1;
            setTaskData({
              ...taskData,
              status: statusOptions[currentStatusIndex.current],
            });
          }}
        >
          <Text>{statusOptions[currentStatusIndex.current]}</Text>
        </Pressable>

        <Pressable style={styles.submitButton} onPress={handleTaskSubmit}>
          <Text style={styles.submitButtonText}>Submit Task</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#abcdfc",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#dee5f1",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginHorizontal: 25,
  },
  text_option: {
    paddingVertical: 10,
    fontSize: 18,
    color: "#abcdfc",
  },
  pressable: {
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginTop: 6,
    marginHorizontal: 55,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#20549b",
    paddingVertical: 22,
    marginHorizontal: 25,
    borderRadius: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
