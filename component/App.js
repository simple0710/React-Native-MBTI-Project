// App.js
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// componenet
import HomeScreen from "./HomeScreen";
import ResultScreen from "./ResultScreen";
// css
import styles from "./styles/app_css";
function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <SafeAreaView style={styles.main_container}>
        <View style={styles.header}>
          <Text style={styles.logo_text}>KIUIT</Text>
        </View>
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
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>약관</Text>
          <Text style={styles.footer_text}>copyright</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default App;
