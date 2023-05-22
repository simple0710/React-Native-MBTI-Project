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
    backcolor: [0, "red", "yellow", "pink", "green", "blue"],
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
              // justifyContent: "center",
              // alignItems: "center",
              // borderColor: "black",
              // borderWidth: 1,
              // borderStyle: "solid",
              margin: 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // width: "30%",
                justifyContent: "space-between",
                alignItems: "center",
                // marginBottom: 5,
                // backgroundColor: "pink",
              }}
            >
              <Text style={{ flex: 1 }}>{item.name}</Text>
              <View
                style={{
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
          borderColor: "black",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <FlatList
          data={mbtiData}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          style={{ width: "50%" }}
          ListHeaderComponent={<Text>Match</Text>}
          ListHeaderComponentStyle={{
            // flex: 1,
            alignItems: "center",
            // borderWidth: 1,
            // borderColor: "black",
            // borderStyle: "solid",
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
