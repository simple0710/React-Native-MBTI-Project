import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const BoxExample = () => {
  // const exampleBox = ["#FFFFCC", "#FFFF99", "#FFFF66", "#FFFF33", "#FF4500"];
  // const exampleBox = ["#FFEE99", "#FFCC66", "#FF9933", "#FF6600", "#FF3333"];
  // const exampleBox = ["#BDFCC9", "#ABE6A1", "#CCCCCC", "#8C56FF", "#6B00FF"];
  // const exampleBox = ["#6B00FF", "#8C56FF", "#CCCCCC", "#ABE6A1", "#BDFCC9"]; // 좋은것 부터 내림차순 base
  const exampleBox = ["#95E1D3", "#EAFFD0", "#CCCCCC", "#FCE38A", "#F38181"]; // 좋은것 부터 내림차순
  const comment = [
    "우리 궁합 다시 생각해봐요 ",
    "최악은 아니지만 좋지도 않음 ",
    "안맞는 것 맞는 것 , 반반! ",
    "좋은 관계로 발전 가능 ",
    "우리 궁합은 천생연분 ",
  ];
  // const comment = ["test1", "test2", "test3", "test4", "test5"];
  const boxComponent = (index) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            // alignItem: "center",
            justifyContent: "center",
            // backgroundColor: "blue",
            alignItems: "center",
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
              // justifyContent: "flex-start",
              flex: 1,
              alignSelf: "center",
              marginLeft: 6,
              // fontSize: 6,
            }}
          >
            {comment[4 - index]}
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
          width: "100%",
          marginLeft: 15,
          // backgroundColor: "red",
          // flexDirection: "row",
          // justifyContent: "center",
          // width: "30%",
          // borderStyle: "solid",
          // borderColor: "black",
          // borderWidth: 1,
          // height: "100%",
          // justifyContent: "flex-end",
          alignItems: "center",
          justifyContent: "center",
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
