import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
const BottomMenu = ({ navigation }) => {
  const menuItems = ["메뉴1", "메뉴2", "메뉴3"];
  const menuMoves = ["First", "Second", "Third"];

  const onMenuItemPress = (index) => {
    // 메뉴 항목을 클릭했을 때의 동작을 정의합니다.
    navigation.navigate(menuMoves[index]);
  };
  return (
    <View
      style={{
        bottom: 0,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {menuItems.map((item, index) => (
        <Button
          key={index}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          // onPress={() => navigation.navigate(menuMoves[index])}
          onPress={() => {
            console.log(item, menuMoves[index]);
            // navigation.navigate(onMenuItemPress(index));
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item}</Text>
        </Button>
      ))}
    </View>
  );
};

export default BottomMenu;
