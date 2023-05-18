import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

function HelpScreen() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.accent }}>
      <Text style={{ color: theme.colors.primary }}>Hello, World!</Text>
    </View>
  );
}

export default HelpScreen;
