import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  SectionList,
  LayoutChangeEvent,
  Touchable,
  TouchableOpacity,
  Modal,
  Button,
  ViewToken,
  Image,
} from "react-native";
import { getTasks } from "../services/getTasks";
import Reanimated, { useSharedValue } from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useScrollToTop } from "@react-navigation/native";
import { deleteTask } from "../services/deleteTask";
import TaskModal from "./TaskModal";
import { Item } from "./TaskItem";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function Tasks({ navigation }) {
  interface Task {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    priority: string;
    status: string;
  }

  const [change, setChange] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  // useScrollToTop(topRef);
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      if (data) {
        setTasks(data);
      }
    };
    console.log(tasks);
    fetchTasks();
    console.log("here");
    setChange(false);
  }, [change]);

  const groupedTasks = [
    {
      title: "High",
      data: tasks.filter((task) => task.priority === "HIGH"),
      amount: tasks.filter((task) => task.priority === "HIGH").length,
    },
    {
      title: "Medium",
      data: tasks.filter((task) => task.priority === "MEDIUM"),
      amount: tasks.filter((task) => task.priority === "MEDIUM").length,
    },
    {
      title: "Low",
      data: tasks.filter((task) => task.priority === "LOW"),
      amount: tasks.filter((task) => task.priority === "LOW").length,
    },
  ];

  const SectionHeader = ({ title }: { title: string }) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    );
  };
  const sectionListRef = useRef<SectionList>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollToTop = () => {
    console.log("scroll to top", sectionListRef.current);
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
    });
  };
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#192f4f" }}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Welcome to your tasks</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateTask", { setChange })}
        >
          <Image
            source={require("../assets/create-task.png")}
            style={{ width: 35, height: 35, tintColor: "#abcdfc" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <SectionList
        contentContainerStyle={{ flexGrow: 1, marginHorizontal: 20 }}
        onScroll={(event) => {
          setScrollPosition(event.nativeEvent.contentOffset.y);
          console.log("scrollPosition", scrollPosition);
        }}
        sections={groupedTasks}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => (
          <Item
            data={item}
            id={item.id}
            tasks={tasks}
            setTasks={setTasks}
            change={change}
            setChange={setChange}
            viewableItems={viewableItems}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        ref={sectionListRef}
        keyExtractor={(item) => item.id}
        // style={styles.list}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
      <View style={scrollPosition > 30 ? styles.topBtn : styles.hideTopBtn}>
        <TouchableOpacity
          style={{ backgroundColor: "transparent" }}
          onPress={scrollToTop}
        >
          <Image
            source={require("../assets/arrow-up.png")}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={scrollPosition > 30 ? styles.topBtn : styles.hideTopBtn}>
        <Button title="top" onPress={scrollToTop} /> */}

      {/* </View> */}
      {/* {scrollPosition > 30 ? (
        <Button title="top" onPress={scrollToTop}  />
      ) : null} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    marginVertical: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
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
  topBtn: {
    // display: "flex",
    position: "absolute",
    bottom: 35,
    right: 20,
  },
  hideTopBtn: {
    display: "none",
  },
  arrow: {
    width: 40,
    height: 40,
    alignSelf: "center",
    // backgroundColor: 'red',
    borderRadius: 20,
  },
});
