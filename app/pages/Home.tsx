import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


function HomeScreen() {
  const navigation = useNavigation();
  const openLibrary = () => {
    // @ts-ignore
    navigation.navigate("Settings");
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.button} onPress={openLibrary}>
        <Text style={styles.buttonText}>Open Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  buttonPress: {
    color: "red"
  }
});

export default HomeScreen;
