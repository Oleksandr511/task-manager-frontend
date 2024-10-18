import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewToken,
} from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { deleteTask } from "../services/deleteTask";
import TaskModal from "./TaskModal";
import Reanimated, { useSharedValue } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useState, useEffect } from "react";

type TaskData = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  priority: string;
  status: string;
};
export const Item = ({
  data,
  id,
  tasks,
  setTasks,
  change,
  setChange,
  viewableItems,
}: {
  data: TaskData;
  id: string;
  tasks: TaskData[];
  change: boolean;
  setChange: (change: boolean) => void;
  setTasks: (tasks: TaskData[]) => void;
  viewableItems: Animated.SharedValue<ViewToken[]>;
}) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  // Animated style for the item
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        // { translateY: translationY.value },
      ],
    };
  });

  const RightAction = () => {
    console.log("id", id);
    const handleDelete = async () => {
      try {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.log("Error deleting task", error);
      }
    };
    return (
      <TouchableOpacity onPress={handleDelete}>
        <View
          style={{
            backgroundColor: "#ff0000",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 100,
            borderRadius: 12,
            marginVertical: 20,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: 800 }}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleEdit = () => {
    console.log("edit");
    setModalVisible(true);
    // return (
    // <Modal
    //   visible={modalVisible}
    //   animationType="slide"
    //   onRequestClose={() => setModalVisible(false)}
    // >
    //   <View>
    //     <Text>Edit</Text>
    //   </View>
    // </Modal>
    // );
  };
  const LeftAction = () => {
    // console.log("left action");
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
      console.log("left action");
    }, [refresh]);
    return (
      <View>
        <TouchableOpacity onPress={handleEdit}>
          <View
            style={{
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              width: 60,
              height: 100,
              borderRadius: 12,
              marginVertical: 20,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "black", fontWeight: 800 }}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TaskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={data}
          change={change}
          setChange={setChange}
        />
      </View>
    );
  };
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === data.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);
  return (
    <GestureHandlerRootView>
      {/* <PanGestureHandler onGestureEvent={panGesture}> */}
      <Swipeable
        renderRightActions={RightAction}
        renderLeftActions={LeftAction}
      >
        <Reanimated.View style={[styles.item, animatedStyle, rStyle]}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.content}>{data.content}</Text>
          <Text style={styles.date}>{data.updatedAt}</Text>
          <Text style={styles.priority}>{data.priority}</Text>
          <Text
            style={
              data.status === "DONE"
                ? styles.status_done
                : data.status === "IN_PROGRESS"? styles.status_inProgress:
                styles.status_pending
            }
          >
            {data.status}
          </Text>
        </Reanimated.View>
      </Swipeable>
      {/* </PanGestureHandler> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    marginVertical: 25,
  },
  list: {
    marginHorizontal: 20,
    // justifyContent: "center",
  },
  listHeader: {
    // backgroundColor: "#abcdfc",
    // position:'absolute',
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
  },
  header_text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#abcdfc",
  },
  item: {
    backgroundColor: "#e3edfa",
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    height: 128,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f213b",
  },
  content: {
    fontSize: 16,
    color: "#0f213b",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#abcdfc",
  },
  line: {
    borderBottomColor: "#1a5bb0",
    opacity: 0.5,
    borderBottomWidth: 3,
    shadowColor: "#1a5bb0",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.5,
  },
  status_done: {
    color: "green",
  },
  status_inProgress: {
    color: "#de8a0f",
  },
  status_pending: {
    color: "red",
  }
});
