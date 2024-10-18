import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// import login from "../services/index";
import { login } from "../services/login";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/login-img.png")}
            style={styles.headerImg}
            alt="logo"
          />
          <Text style={styles.title}>Sign In </Text>
          <Text style={styles.subtitle}>Get access to your tasks and more</Text>
        </View>

        {/* <ScrollView style={{ flex: 1 }}> */}
        {/* <View style={styles.form}> */}
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              // keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 20}
              style={{ flex: 1 }}
            >
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(email) => setForm({ ...form, email })}
                  style={styles.inputControl}
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  value={form.password}
                  secureTextEntry={true}
                  onChangeText={(password) => setForm({ ...form, password })}
                  style={styles.inputControl}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  disabled={form.email === "" || form.password === ""}
                  onPress={async () => {
                    // Alert.alert("Success", "You have successfully signed in");

                    console.log("hello");
                    try {
                      let resData = await login(form);

                      console.log("resData", resData);
                      if (resData) navigation.navigate("UserPage");
                    } catch (error) {
                      console.log("error new", error);
                      Alert.alert(
                        "Error",
                        "An error occurred while signing in"
                      );
                    }
                  }}
                >
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign In</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: "auto" }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.formFooter}>
            Don't have an account?
            <Text style={{ textDecorationLine: "underline" }}> Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
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
  },
  headerImg: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  input: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#222",
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  inputControl: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    height: 44,
  },
  btn: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#075eec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // marginTop: 44,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  formFooter: {
    textAlign: "center",
    letterSpacing: 0.15,
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },
});
