import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import BoxExample from "../BoxExample";

const MatchGraph = ({ mbtiData, myName, myMbti }) => {
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
      [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3],
      [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5],
      [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3],
      [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
      [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
      [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
      [1, 1, 1, 1, 2, 3, 5, 2, 3, 5, 3, 5, 4, 4, 4, 4],
    ],
    backcolor: [0, "#95E1D3", "#EAFFD0", "#CCCCCC", "#FCE38A", "#F38181"], // 좋은것 부터 내림차순
  };
  const renderMatch = ({ item }) => {
    // for (let i = 0; i < mbtiData.length; i++) {
    // }
    if (item.name !== myName) {
      return (
        <>
          <View
            style={{
              flex: 1,
              // width: "100%",
              // flexDirection: "row",
              // backgroundColor: "blue",
              // justifyContent: "space-around",
              // alignItems: "center",
              // borderTopWidth: 0.5,
              borderColor: "black",
              borderBottomWidth: 0.5,
              borderStyle: "solid",
              // marginTop: 2,
              // marginBottom: 2,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                // width: "30%",
                justifyContent: "center",
                // borderStyle: "solid",
                // borderColor: "black",
                // borderWidth: 1,
                alignItems: "center",
                marginBottom: 3,
                marginTop: 3,
                // backgroundColor: "pink",
              }}
            >
              <Text style={{ flex: 1, alignSelf: "center" }}>{item.name}</Text>
              <View
                style={{
                  // flex: 1,
                  justifyContent: "center",
                  // marginTop: 2,
                  // marginBottom: 2,
                  width: 30,
                  height: 30,
                  backgroundColor:
                    mbtiMatch.backcolor[
                      mbtiMatch.graph[mbtiMatch.labels[myMbti]][
                        mbtiMatch.labels[item.labels[0]]
                      ]
                    ],
                  // mbtiMatch.backcolor[mbtiMatch.graph[mbtiMatch.labels[mbtiMatch.labels[nowMbti]][mbtiMatch.labels[item.labels[0]]]]]
                }}
              ></View>
            </View>
            {/* <View style={{ flex: 1 }}></View> */}
          </View>
        </>
      );
    }
    // return <Text> h</Text>;
    // return <Text style={{ flex: 1 }}>h</Text>;
    // return <Text style={{ position: "absolute", top: 0 }}>.</Text>;
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          // justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "red",
          width: "80%",
          // alignContent: "center",
          // borderColor: "black",
          // borderWidth: 1,
          // borderStyle: "solid",
        }}
      >
        <FlatList
          data={mbtiData}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          style={{
            flex: 1,
            width: "50%",
            borderColor: "black",
            borderWidth: 0.8,
            borderStyle: "solid",
          }}
          ListHeaderComponent={<Text>Match</Text>}
          ListHeaderComponentStyle={{
            // flex: 1,
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
          // numColumns={1}
          // columnWrapperStyle={{
          //   flex: 1,
          //   // width: "100%",
          //   // backgroundColor: "blue",
          //   // position: "absolute",
          //   justifyContent: "space-between",
          // }}
        ></FlatList>
        <BoxExample></BoxExample>
      </View>
    </>
  );
};

export default MatchGraph;
