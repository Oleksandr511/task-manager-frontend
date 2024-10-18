import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { updateTask } from "../services/updateTask";

export default function TaskModal({
  modalVisible,
  setModalVisible,
  data,
  change,
  setChange,
}) {
  const [taskData, setTaskData] = useState({
    title: data.title,
    content: data.content,
    priority: data.priority,
    status: data.status,
  });

  const priorityOptions = ["LOW", "MEDIUM", "HIGH"];
  const statusOptions = ["PENDING", "IN_PROGRESS", "DONE"];
  const currentPriorityIndex = useRef(priorityOptions.indexOf(data.priority));
  const currentStatusIndex = useRef(statusOptions.indexOf(data.status));
  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={{ fontSize: 24, paddingBottom: 20, color: "#20549b" }}>
            Change task
          </Text>
          <View style={styles.modalTask}>
            <TextInput
              placeholder="Title"
              value={taskData.title}
              onChangeText={(text) => setTaskData({ ...taskData, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Content"
              value={taskData.content}
              onChangeText={(text) =>
                setTaskData({ ...taskData, content: text })
              }
              style={styles.input}
            />
            <Text style={styles.text_option}>Priority:</Text>
            <Pressable
              style={styles.pressable}
              onPress={() => {
                console.log("index", currentPriorityIndex.current);
                {
                  currentPriorityIndex.current === 2
                    ? (currentPriorityIndex.current = 0)
                    : (currentPriorityIndex.current += 1);
                }
                setTaskData({
                  ...taskData,
                  priority: priorityOptions[currentPriorityIndex.current],
                });
              }}
            >
              {({ pressed }) => (
                <Text>{priorityOptions[currentPriorityIndex.current]}</Text>
              )}
            </Pressable>
            <Text style={styles.text_option}>Status:</Text>
            <Pressable
              style={styles.pressable}
              onPress={() => {
                console.log("index", currentStatusIndex.current);
                {
                  currentStatusIndex.current === 2
                    ? (currentStatusIndex.current = 0)
                    : (currentStatusIndex.current += 1);
                }
                setTaskData({
                  ...taskData,
                  status: statusOptions[currentStatusIndex.current],
                });
              }}
            >
              {({ pressed }) => (
                <Text>{statusOptions[currentStatusIndex.current]}</Text>
              )}
            </Pressable>
          </View>
          <Button
            title="Save"
            onPress={async () => {
              if (
                taskData.title !== data.title ||
                taskData.content !== data.content ||
                taskData.priority !== data.priority ||
                taskData.status !== data.status
              ) {
                let res = await updateTask({ taskId: data.id, taskData });
                setChange(!change);
                setModalVisible(false);
              } else {
                setModalVisible(false);
                console.log("No changes made");
              }
            }}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    // marginVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: "100%",
    color: "white",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 90,
    marginHorizontal: 30,
    backgroundColor: "#bed5f4",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.95,
  },
  modalTask: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    width: "70%",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  text_option: {
    paddingVertical: 10,
    fontSize: 18,
    color: "#20549b",
  },
});
