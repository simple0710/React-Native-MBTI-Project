// App.js
import { StyleSheet, Text, View, Button } from "react-native";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ResultScreen from "./ResultScreen";
import main from "./styles/main-s";

const Stack = createNativeStackNavigator();

function App() {
  // 파일 업로드 txt 정보
  return (
    <>
      <NavigationContainer style={main.container}>
        {/* <View >
          <Text>Logo</Text>
        </View> */}
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
      </NavigationContainer>
    </>
  );
}

export default App;
