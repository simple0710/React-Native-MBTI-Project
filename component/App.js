// // App.js
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // componenet
import HomeScreen from "./HomeScreen";
import ResultScreen from "./ResultScreen";
// import HelpScreen from "./HelpScreen";
// // css
import styles from "./styles/app_css";
import HelpScreen from "./HelpScreen";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <SafeAreaView style={styles.main_container}>
        <View style={styles.router}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Router">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Result"
                component={ResultScreen}
                // options={{ headerShown: false }}
                options={{
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="Help"
                component={HelpScreen}
                options={{
                  headerTitleAlign: "center",
                }}
                // options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        {/* <View style={styles.footer}>
          <Text style={styles.footer_text}>약관</Text>
          <Text style={styles.footer_text}>copyright</Text>
        </View> */}
      </SafeAreaView>
    </>
  );
}

export default App;
