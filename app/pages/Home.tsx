import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const openLibrary = () => {
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
