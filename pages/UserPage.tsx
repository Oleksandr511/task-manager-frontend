import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { getProfile } from "../services/getProfile";

export default function UserPage({ navigation }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data && data.name && data.email) {
        setProfile({ name: data.name, email: data.email });
      }
    };

    fetchProfile();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#b6cbe8" }}>
      <View style={styles.img_container}>
        <Image source={require("../assets/user-img.png")} />
      </View>
      <View style={styles.text_container}>
        <Text style={styles.geeting_text}>Hello, {profile?.name}!</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>
      <Button
        title="Go to Tasks"
        onPress={() => navigation.navigate("Tasks")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  img_container: {
    alignItems: "center",
    marginVertical: 20,
  },
  text_container: {
    alignItems: "center",
    marginBottom: 20,
  },
  geeting_text: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#1e3f70",
  },
  email: {
    color: "#1e3f70",
  },
});
