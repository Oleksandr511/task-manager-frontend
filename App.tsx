import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./pages/Register";
import { HomeScreen } from "./pages/Home";
import UserPage from "./pages/UserPage";
import Tasks from "./pages/Tasks";
import { CreateTask } from "./pages/CreateTask";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login page", headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register page", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home page", headerShown: false }}
        />
        <Stack.Screen
          name="UserPage"
          component={UserPage}
          options={{
            title: "Profile",
            headerShown: true,
            headerBackVisible: false,
            headerTintColor: "#e1e9f5",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerStyle: {
              backgroundColor: "#a6bad5",
            },
          }}
        />
        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{
            title: "Tasks",
            headerTintColor: "#abcdfc",
            headerShown: true,
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: "#0f213b",
            },
          }}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{
            title: "Create Task",
            headerTintColor: "#abcdfc",
            headerShown: true,
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: "#0f213b",
            },
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
