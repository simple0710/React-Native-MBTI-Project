// App.js
import { StyleSheet, Text, View, Button } from "react-native";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ResultScreen from "./ResultScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <View>
          <Text>Logo</Text>
        </View>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <View>
          <Text>footer</Text>
        </View>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default App;
