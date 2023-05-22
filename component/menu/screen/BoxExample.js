import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const BoxExample = () => {
  const exampleBox = ["red", "yellow", "pink", "green", "blue"];
  const boxComponent = (index) => {
    return (
      <>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            // alignItem: "center",
            justifyContent: "center",
            // backgroundColor: "blue",
            // alignContent: "center",
            // justifyContent: "space-around",
          }}
        >
          <View
            style={{
              // flex: 1,
              height: 30,
              width: 30,
              backgroundColor: exampleBox[index],
            }}
          ></View>
          <Text
            style={{
              justifyContent: "flex-start",
            }}
          >
            {index + 1}
          </Text>
        </View>
      </>
    );
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          // backgroundColor: "red",
          // flexDirection: "row",
          // justifyContent: "center",
          // width: "30%",

          alignItems: "center",
        }}
      >
        {/* <Text>의미</Text> */}
        {boxComponent(0)}
        {boxComponent(1)}
        {boxComponent(2)}
        {boxComponent(3)}
        {boxComponent(4)}
      </View>
    </>
  );
};
export default BoxExample;
