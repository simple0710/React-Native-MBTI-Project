// First.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FlatList, View, Dimensions, SafeAreaView } from "react-native";
import { Button, Text, DefaultTheme } from "react-native-paper";
import {
  INTJ,
  INTP,
  ENTJ,
  ENTP,
  ISTJ,
  ISFJ,
  ESTJ,
  ESFJ,
  INFJ,
  INFP,
  ENFJ,
  ENFP,
  ISTP,
  ISFP,
  ESTP,
  ESFP,
} from "./graph/MBTIType";
import { BarChart } from "react-native-chart-kit";
import MatchGraph from "./graph/MatchGraph";
// css
// import styles from "./styles/result_css";
// const First = ({route}) => {
const First = ({ mbtiData }) => {
  // const mbtiData = route.params.mbtiData;
  // console.log(mbtiData);
  // console.log(mbtiData);
  // const mbtiData = mbtiData;
  const [viewFlag, setViewFlag] = useState([]);
  // 토글 기능 수행
  const handleViewItem = useCallback((index) => {
    let flagCopy = [...viewFlag];
    flagCopy[index] = !flagCopy[index];
    setViewFlag(flagCopy);
  });

  const MBTIResultList = useCallback((items, index) => {
    let mbtiTextType = ""; // type ex) xx형
    let mbtiTextName = ""; // name ex) 연예인, 모험가...
    let mbtiColor = "black"; // 색상
    let mbtiCharacteristics = [];
    // 분석가형
    if (items.labels[0] === "INTJ") {
      mbtiTextType = INTJ.type;
      mbtiTextName = INTJ.name;
      mbtiColor = INTJ.color;
      mbtiCharacteristics = INTJ.characteristic;
    } else if (items.labels[0] === "INTP") {
      mbtiTextType = INTP.type;
      mbtiTextName = INTP.name;
      mbtiColor = INTP.color;
      mbtiCharacteristics = INTP.characteristic;
    } else if (items.labels[0] === "ENTJ") {
      mbtiTextType = ENTJ.type;
      mbtiTextName = ENTJ.name;
      mbtiColor = ENTJ.color;
      mbtiCharacteristics = ENTJ.characteristic;
    } else if (items.labels[0] === "ENTP") {
      mbtiTextType = ENTP.type;
      mbtiTextName = ENTP.name;
      mbtiColor = ENTP.color;
      mbtiCharacteristics = ENTP.characteristic;
      // 관리자형
    } else if (items.labels[0] === "ISTJ") {
      mbtiTextType = ISTJ.type;
      mbtiTextName = ISTJ.name;
      mbtiColor = ISTJ.color;
      mbtiCharacteristics = ISTJ.characteristic;
    } else if (items.labels[0] === "ISFJ") {
      mbtiTextType = ISFJ.type;
      mbtiTextName = ISFJ.name;
      mbtiColor = ISFJ.color;
      mbtiCharacteristics = ISFJ.characteristic;
    } else if (items.labels[0] === "ESTJ") {
      mbtiTextType = ESTJ.type;
      mbtiTextName = ESTJ.name;
      mbtiColor = ESTJ.color;
      mbtiCharacteristics = ESTJ.characteristic;
    } else if (items.labels[0] === "ESFJ") {
      mbtiTextType = ESFJ.type;
      mbtiTextName = ESFJ.name;
      mbtiColor = ESFJ.color;
      mbtiCharacteristics = ESFJ.characteristic;
      // 외교관형
    } else if (items.labels[0] === "INFJ") {
      mbtiTextType = INFJ.type;
      mbtiTextName = INFJ.name;
      mbtiColor = INFJ.color;
      mbtiCharacteristics = INFJ.characteristic;
    } else if (items.labels[0] === "INFP") {
      mbtiTextType = INFP.type;
      mbtiTextName = INFP.name;
      mbtiColor = INFP.color;
      mbtiCharacteristics = INFP.characteristic;
    } else if (items.labels[0] === "ENFJ") {
      mbtiTextType = ENFJ.type;
      mbtiTextName = ENFJ.name;
      mbtiColor = ENFJ.color;
      mbtiCharacteristics = ENFJ.characteristic;
    } else if (items.labels[0] === "ENFP") {
      mbtiTextType = ENFP.type;
      mbtiTextName = ENFP.name;
      mbtiColor = ENFP.color;
      mbtiCharacteristics = ENFP.characteristic;
      // 탐험가형
    } else if (items.labels[0] === "ISTP") {
      mbtiTextType = ISTP.type;
      mbtiTextName = ISTP.name;
      mbtiColor = ISTP.color;
      mbtiCharacteristics = ISTP.characteristic;
    } else if (items.labels[0] === "ISFP") {
      mbtiTextType = ISFP.type;
      mbtiTextName = ISFP.name;
      mbtiColor = ISFP.color;
      mbtiCharacteristics = ISFP.characteristic;
    } else if (items.labels[0] === "ESTP") {
      mbtiTextType = ESTP.type;
      mbtiTextName = ESTP.name;
      mbtiColor = ESTP.color;
      mbtiCharacteristics = ESTP.characteristic;
    } else if (items.labels[0] === "ESFP") {
      mbtiTextType = ESFP.type;
      mbtiTextName = ESFP.name;
      mbtiColor = ESFP.color;
      mbtiCharacteristics = ESFP.characteristic;
    }

    return (
      <>
        <SafeAreaView
          style={{
            alignSelf: "center",
            marginBottom: 20,
            width: Dimensions.get("window").width - 50,
            backgroundColor: "white",
          }}
        >
          <Button
            onPress={() => {
              handleViewItem(index);
            }}
            style={{ alignSelf: "flex-start" }}
          >
            {viewFlag[index] ? (
              <Text key={index}>
                {"▼"} "{items.name}"님의 결과
              </Text>
            ) : (
              <Text key={index}>
                {"▶"} "{items.name}"님의 결과
              </Text>
            )}
          </Button>
          {viewFlag[index] && (
            <>
              <View
                style={
                  {
                    // borderBottomColor: "black",
                    // borderTopWidth: 0.5,
                    // borderBottomWidth: 1,
                    // borderStyle: "solid",
                  }
                }
              >
                <BarChart
                  data={items}
                  width={Dimensions.get("window").width - 50} // 그래프 사이 간격
                  height={220}
                  // style={styles.graph_container}
                  chartConfig={chartConfig}
                  fromZero={true} // 0부터 시작
                  showBarTops={false} // 더 잘 보이게 하는 바 삭제
                  showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
                  // withInnerLines={false} // 점선 삭제
                  // yLabelsOffset={"   "}
                  yAxisSuffix=" %"
                  // withHorizontalLabels={false} // y 라벨 숨기기
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>
                  <Text style={{ color: mbtiColor }}>{items.labels[0]} </Text>:{" "}
                  {mbtiTextType} - {mbtiTextName}
                </Text>
              </View>

              {/* 3개의 특징 나열 */}
              <View
                style={{
                  width: "90%",
                  // backgroundColor: "blue",
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    borderBottomColor: "black",
                    borderBottomWidth: 0.6,
                    borderStyle: "solid",
                    fontSize: 16,
                  }}
                >
                  특징
                </Text>
                <Text>1. {mbtiCharacteristics[0]}</Text>
                <Text>2. {mbtiCharacteristics[1]}</Text>
                <Text>3. {mbtiCharacteristics[2]}</Text>
              </View>
              {/* 궁합도 표 출력 */}
              <View
                style={{
                  width: "90%",
                  // backgroundColor: "blue",
                  alignSelf: "center",
                  // marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    borderBottomColor: "black",
                    borderBottomWidth: 0.6,
                    borderStyle: "solid",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  궁합표
                </Text>
                <MatchGraph
                  mbtiData={mbtiData}
                  myName={items.name}
                  myMbti={items.labels[0]}
                ></MatchGraph>
              </View>
            </>
          )}
        </SafeAreaView>
      </>
    );
  });

  // BarChart 설정
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 0, // 소수점 자릿수
    // color: (opacity = 1) => `rgba(175, 0, 0, ${opacity})`, // 막대 색상
    color: (opacity = 1) => `rgba(0, 189, 19, ${opacity})`, // 막대 색상

    // color: (opacity = 1) => `rgba(25, 150, 110, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.6, // 막대 너비
  };

  useEffect(() => {
    setViewFlag([]);
  }, []);
  return (
    <>
      <>
        <SafeAreaView
          sylte={{
            flex: 1,
          }}
        >
          <FlatList
            data={mbtiData}
            renderItem={({ item, index }) => MBTIResultList(item, index)}
            ListHeaderComponent={
              <>
                {/* <Text style={{ fontSize: 24, color: "black" }}>Result</Text> */}
              </>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
        {/* footer */}
      </>
    </>
  );
};

export default First;
