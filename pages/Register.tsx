import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { createUser } from "../services/createUser";

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/register-img.png")}
            style={styles.headerImg}
            alt="logo"
          />
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Create an account so you can create personal tasks
          </Text>
        </View>
        {/* <KeyboardAvoidingView keyboardVerticalOffset={50} behavior="padding" style={{ flex: 1 }}> */}
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior="padding"
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            // automaticallyAdjustKeyboardInsets={true}
          >
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Your name</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={form.name}
                  onChangeText={(name) => setForm({ ...form, name })}
                  style={styles.inputControl}
                  placeholder="John Doe"
                  placeholderTextColor="#6b7280"
                />
              </View>
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
            </View>
            <TouchableOpacity
              disabled={
                form.email === "" || form.password === "" || form.name === ""
              }
              onPress={async () => {
                const res = await createUser(form);
                console.log("res", res);
                if (res) {
                  navigation.navigate("UserPage");
                } else {
                  Alert.alert(
                    "Error",
                    `An error occurred while signing up. Reason:  ${res.data.message}`
                  );
                }
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={{ marginTop: "auto" }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.formFooter}>
            Already have an account?
            <Text style={{ textDecorationLine: "underline" }}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
  scrollView: {
    flex: 1,
    justifyContent: "center",
  },
});
