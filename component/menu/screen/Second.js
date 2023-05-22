import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  BackHandler,
} from "react-native";
import { Text, Button } from "react-native-paper";

const Second = ({ route }) => {
  // true인 경우
  const [clickFlag, setClickFlag] = useState(false);
  const [clickName, setClickName] = useState("");
  const mbtiData = route.params.mbtiData;

  // MBTI 라벨 인덱스화 -> 각각의 인덱스로 궁합도 조사 -> 색 지정
  const mbtiMatch = {
    labels: {
      INFP: 0,
      ENFP: 1,
      INFJ: 2,
      ENFJ: 3,
      INTJ: 4,
      ENTJ: 5,
      INTP: 6,
      ENTP: 7,
      ISFP: 8,
      ESFP: 9,
      ISTP: 10,
      ESTP: 11,
      ISFJ: 12,
      ESFJ: 13,
      ISTJ: 14,
      ESTJ: 15,
    },
    graph: [
      [4, 4, 4, 5, 4, 5, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1],
      [4, 4, 5, 4, 5, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1],
      [4, 5, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1],
      [5, 4, 4, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1],
      [4, 5, 4, 4, 4, 4, 4, 5, 3, 3, 3, 3, 2, 2, 2, 2],
      [5, 4, 4, 4, 4, 4, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4, 5, 4, 4, 3, 3, 3, 3, 2, 2, 2, 5],
      [4, 4, 5, 4, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2],
      [1, 1, 1, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5],
      [5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3],
      [5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5],
      [5, 5, 5, 5, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3],
      [5, 5, 5, 5, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
      [5, 5, 5, 5, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
      [5, 5, 5, 5, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
      [5, 5, 5, 5, 2, 3, 5, 2, 3, 5, 3, 5, 4, 4, 4, 4],
    ],
    backcolor: [0, "red", "yellow", "pink", "green", "blue"],
  };
  const renderMbtiMath = ({ item }) => {
    let nowName = "";
    let nowMbti = "";
    for (let i = 0; i < mbtiData.length; i++) {
      if (mbtiData[i].name === clickName) {
        nowName = mbtiData[i].name;
        nowMbti = mbtiData[i].labels[0];
        break;
      }
    }
    // console.log(mbtiMatch.backcolor[mbtiMatch.graph[mbtiMatch.labels[item.labels[0]]][8]])
    // console.log(mbtiMatch.backcolor[mbtiMatch.graph[mbtiMatch.labels[item.labels[0]]]["INFP"]])
    // console.log(mbtiMatch.backcolor[mbtiMatch.graph[mbtiMatch.labels[nowMbti]][mbtiMatch.labels[item.labels[0]]]])
    if (clickName != item.name) {
      return (
        <>
          <Text>{item.name}</Text>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor:
                mbtiMatch.backcolor[
                  mbtiMatch.graph[mbtiMatch.labels[nowMbti]][
                    mbtiMatch.labels[item.labels[0]]
                  ]
                ],
              // mbtiMatch.backcolor[mbtiMatch.graph[mbtiMatch.labels[mbtiMatch.labels[nowMbti]][mbtiMatch.labels[item.labels[0]]]]]
            }}
          ></View>
        </>
      );
    }
  };
  const backButtonHandler = () => {
    // return true;
    if (clickFlag) {
      setClickFlag(false);
      setClickName("");
      return true;
    }
    return false;
  };

  const renderItem = ({ item }) => {
    const hendlePress = () => {
      if (!clickName) {
        setClickFlag((state) => !state);
      }
      setClickName(item.name);
    };
    return (
      <>
        <TouchableOpacity
          style={{
            width: Dimensions.get("window").width / 3,
            minHeight: 75,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
            borderWidth: 1,
            borderStyle: "solid",
          }}
          onPress={hendlePress}
        >
          <Text>{item.name}</Text>
          <View></View>
        </TouchableOpacity>
      </>
    );
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, [clickFlag, backButtonHandler]);
  return (
    <>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <FlatList
          ListHeaderComponent={<Text style={{ flex: 1 }}>Match</Text>}
          data={mbtiData}
          renderItem={renderItem}
          // keyExtractor={(index) => index}
          numColumns={3}
        ></FlatList>
      </View>

      {clickFlag && (
        <>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: Dimensions.get("window").width / 3,
              height: "100%",
              backgroundColor: "white",
            }}
          >
            {/* 왼쪽 선택 가능 스크롤 */}
            <FlatList
              data={mbtiData}
              renderItem={renderItem}
              // keyExtractor={(index) => index}
              numColumns={1}
            ></FlatList>
            {/* 오른쪽 궁합판 */}
          </View>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: (Dimensions.get("window").width / 3) * 2,
              // height: Dimensions.get("window").height,
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Text style={{ justifyContent: "center", alignSelf: "center" }}>
              {clickName}
            </Text>
            <FlatList
              data={mbtiData}
              renderItem={renderMbtiMath}
              numColumns={1}
            ></FlatList>
          </View>
        </>
      )}
    </>
  );
};
export default Second;
