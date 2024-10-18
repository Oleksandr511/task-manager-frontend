import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/welcome-img.png")}
        style={styles.image}
      />
      <Text style={styles.title}>
        Introducing the task manager of your dreams
      </Text>
      <Text style={styles.subtitle}>Get started today</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.btn_login}
        >
          <Text style={styles.btnText_login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.btn_register}
        >
          <Text style={styles.btnText_register}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 50,
  },
  buttons: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn_login: {
    backgroundColor: "#3336ff",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnText_login: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn_register: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnText_register: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    color: "#3336ff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    textShadowColor: "#2280ff",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginHorizontal: 10,
  },
  subtitle: {
    color: "#3336ff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    textShadowColor: "#2280ff",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
});
